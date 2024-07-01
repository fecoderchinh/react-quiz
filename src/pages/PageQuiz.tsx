import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InlineForm, Question } from "../components";
import { QuestionAPIProps, SelectedProps } from "../components/interfaces";
import { REACT_RESULT } from "../rtk/constants";
import { listQuestions, updateQuestions } from "../rtk/dispatcher";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { selectQuestion } from "../rtk/reducer";
import { getAnswerIndex } from "../services";

const PageQuiz = memo(() => {
   const dispatch = useAppDispatch()
   const questionSelector = useAppSelector(selectQuestion)
   const navigate = useNavigate();

   const [answers, setAnswers] = useState<{ group: string; value: string }[]>([])

   const handleDataQuestions = useCallback(async (data: SelectedProps) => {

      const param: QuestionAPIProps = { category: data.category, mode: data.mode }
      dispatch(updateQuestions([]))
      sessionStorage.setItem('questions', '')
      setAnswers([])
      dispatch(listQuestions(param))

   }, [dispatch])

   const handleSelectedAnswers = useCallback((value: string) => {
      const checkIndex = getAnswerIndex(questionSelector.answers, value)
      const groupIndex = value.split('')[0]
      if (checkIndex === -1) {
         const question = questionSelector.questions.find(questionData => questionData.group === Number(groupIndex))
         if (question) {
            const updatedQuestions = questionSelector.questions.map(updateQuestion => {
               if (updateQuestion.group === Number(groupIndex)) {
                  return {
                     ...question,
                     is_selected: value
                  }
               } else {
                  return {
                     ...updateQuestion
                  }
               }
            })

            setAnswers(prev => {

               const prevIndex = prev.findIndex(answer => answer.group === groupIndex)
               if (prevIndex !== -1) {
                  prev.map(answer => {
                     if (answer.group === groupIndex) {
                        answer.value = value
                     }
                     return answer
                  })
                  return prev
               } else {
                  return [...prev, { group: groupIndex, value }]
               }

            })

            dispatch(updateQuestions(updatedQuestions))
            sessionStorage.setItem('questions', JSON.stringify(updatedQuestions))
         }
      }
   }, [dispatch, questionSelector.answers, questionSelector.questions])

   const handleSubmitResult = useCallback(() => {
      navigate(REACT_RESULT)
   }, [navigate])

   return (
      <>
         <h2>QUIZ MAKER</h2>
         <InlineForm onClick={handleDataQuestions} />
         {questionSelector?.questions.map((question, index) => (
            <Question
               key={`question-${question.group}${index}`}
               questionText={question.question}
               options={question.answers}
               name={`answers-${index}`}
               onChange={handleSelectedAnswers}
            />
         ))}
         {answers.length === 5 && <button className="submit-button" onClick={handleSubmitResult}>Submit</button>}
      </>
   )
})

export default PageQuiz
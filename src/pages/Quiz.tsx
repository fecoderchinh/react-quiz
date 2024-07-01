import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InlineForm, Question } from "../components";
import { QuestionAPIProps, SelectedProps } from "../components/interfaces";
import { listQuestions, updateQuestions } from "../rtk/dispatcher";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { selectQuestion } from "../rtk/reducer";
import { getAnswerIndex } from "../services";

const Quiz = memo(() => {
   const dispatch = useAppDispatch()
   const questionSelector = useAppSelector(selectQuestion)
   const navigate = useNavigate();

   const [answers, setAnswers] = useState<{ group: string; value: string }[]>([])

   const handleDataQuestions = useCallback(async (data: SelectedProps) => {

      const param: QuestionAPIProps = { category: data.category, mode: data.mode }
      dispatch(listQuestions(param))

   }, [dispatch])

   const handleSelectedAnswers = useCallback((value: string) => {
      const checkIndex = getAnswerIndex(questionSelector.answers, value)
      const groupIndex = value.split('')[0]
      if (checkIndex === -1) {
         const question = questionSelector.questions.find(q => q.group === Number(groupIndex))
         if (question) {
            const updatedQuestions = questionSelector.questions.map(q => {
               if (q.group === Number(groupIndex)) {
                  return {
                     ...question,
                     is_selected: value
                  }
               } else {
                  return {
                     ...q
                  }
               }
            })

            setAnswers(prev => {

               const prevIndex = prev.findIndex(ans => ans.group === groupIndex)
               if (prevIndex !== -1) {
                  prev.map(ans => {
                     if (ans.group === groupIndex) {
                        ans.value = value
                     }
                     return ans
                  })
                  return prev
               } else {
                  return [...prev, { group: groupIndex, value }]
               }

            })

            dispatch(updateQuestions(updatedQuestions))
         }
      }
   }, [dispatch, questionSelector.answers, questionSelector.questions])

   const handleSubmitResult = useCallback(() => {
      navigate('/result')
   }, [navigate])

   return (
      <>
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
         {answers.length === 5 && <button onClick={handleSubmitResult}>Submit</button>}
      </>
   )
})

export default Quiz
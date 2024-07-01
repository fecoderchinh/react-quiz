import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Results } from "../components";
import { REACT_BASE } from "../rtk/constants";
import { updateQuestions } from "../rtk/dispatcher";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { selectQuestion } from "../rtk/reducer";
import { countAnswers } from "../services";

const PageResults = memo(() => {
   const questionSelector = useAppSelector(selectQuestion)
   const navigate = useNavigate();
   const dispatch = useAppDispatch()

   const handleNewQuiz = useCallback(() => {
      sessionStorage.setItem('questions', '')
      dispatch(updateQuestions([]))
      navigate(REACT_BASE)
   }, [dispatch, navigate])

   const countResult = useMemo(() => {
      return countAnswers(questionSelector.questions)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const handleBottomColor = useCallback((count: number) => {
      switch (count) {
         case 0:
         case 1:
            return 'red'
         case 2:
         case 3:
            return 'yellow'
         case 4:
         case 5:
            return 'green'
      }
   }, [])
   return (
      <>
      <h2>RESULTS</h2>
         {
            questionSelector?.questions.map((question, index) => (
               <Results
                  key={`question-${question.group}${index}`}
                  questionText={question.question}
                  options={question.answers}
                  selected={question.is_selected}
               />
            ))
         }
         <div className={`result-count ${handleBottomColor(countResult)}`}>Your scored {countResult} of 5</div>
         <button className={`submit-button `} onClick={handleNewQuiz}>Create a new quiz</button>
      </>
   )
})

export default PageResults
import { memo, useCallback, useState } from "react";
import { InlineForm, Question } from "../components";
import { FilteredResponse, QuestionAPIProps, SelectedProps } from "../components/interfaces";
import { getQuestions } from "../services";

const Quiz = memo(() => {
   const [questions, setQuestions] = useState<FilteredResponse[]>([])

   const handleDataQuestions = useCallback(async (data: SelectedProps) => {
      const param: QuestionAPIProps = { category: data.category, mode: data.mode }

      const res = await getQuestions(param)

      if (res) {
         setQuestions(res)
      }

   }, [])

   const handleSelectedAnswers = useCallback((value: string) => {
      console.log(value);

   }, [])

   return (
      <>
         <InlineForm onClick={handleDataQuestions} />
         {questions?.map((question, index) => (
            <Question
               key={`${index}`}
               questionText={question.question}
               options={question.answers}
               name={`answers-${index}`}
               onChange={handleSelectedAnswers}
            />
         ))}
      </>
   )
})

export default Quiz
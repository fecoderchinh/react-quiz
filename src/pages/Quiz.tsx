import { memo, useCallback, useState } from "react";
import { InlineForm, Question } from "../components";
import { QuestionAPIProps, ResponseResult, SelectedProps } from "../components/interfaces";
import { getQuestions } from "../services";
import { decodeHtmlEntity } from "../utils";

const Quiz = memo(() => {
   const [questions, setQuestions] = useState<ResponseResult[]>()

   const handleDataQuestions = useCallback(async (data: SelectedProps) => {
      const param: QuestionAPIProps = { category: data.category, mode: data.mode }

      const res = await getQuestions(param)

      if (res?.response_code === 0 && res.results) {
         res.results.map(res => {
            res.question = decodeHtmlEntity(res.question)
            res.correct_answer = decodeHtmlEntity(res.correct_answer)
            res.incorrect_answers = res.incorrect_answers.map(ia => {
               return decodeHtmlEntity(ia)
            })
            return res
         })
         setQuestions(res.results)
      }

   }, [])

   return (
      <>
         <InlineForm onClick={handleDataQuestions} />
         {questions?.map((question, index) => (
            <Question
               key={index}
               questionText={question.question}
               options={[...question.incorrect_answers, question.correct_answer]}
               name={`answers-${index}`}
            />
         ))}
      </>
   )
})

export default Quiz
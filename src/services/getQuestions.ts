import { FilteredResponse, QuestionAPIProps, Response } from "../components/interfaces";
import { decodeHtmlEntity } from "../utils";

export const getQuestions = async ({ category, mode }: QuestionAPIProps) => {
   try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${mode}&type=multiple`);
      const data: Response = await response.json();

      const mappingResponse = data?.results?.map((res, index) => {
         return {
            question: decodeHtmlEntity(res.question),
            correct_answer: decodeHtmlEntity(res.correct_answer),
            answers: [
               {
                  index: `${index+1}0`,
                  is_corrected: true,
                  answer: res.correct_answer
               },
               ...res.incorrect_answers.map((ia, idx) => {
                  return {
                     index: `${index+1}${idx + 1}`,
                     is_corrected: false,
                     answer: ia
                  }
               })
            ]
         } as FilteredResponse
      })

      return mappingResponse

   } catch (error) {
      console.error('Error fetching options:', error);
   }
}
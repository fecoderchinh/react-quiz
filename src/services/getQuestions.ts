import { FilteredResponse, QuestionAPIProps, Response } from "../components/interfaces";
import { decodeHtmlEntity } from "../utils";

export const getQuestions = async ({ category, mode }: QuestionAPIProps) => {
   try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${mode}&type=multiple`);
      const data: Response = await response.json();

      const mappingResponse = data?.results?.map((res, index) => {
         return {
            group: index + 1,
            question: decodeHtmlEntity(res.question),
            correct_answer: decodeHtmlEntity(res.correct_answer),
            answers: [
               {
                  group: index + 1,
                  index: `${index + 1}0`,
                  is_corrected: true,
                  answer: res.correct_answer,
               },
               ...res.incorrect_answers.map((ia, idx) => {
                  return {
                     group: index + 1,
                     index: `${index + 1}${idx + 1}`,
                     is_corrected: false,
                     answer: ia,
                  }
               })
            ],
            is_selected: ''
         } as FilteredResponse
      })

      return mappingResponse

   } catch (error) {
      console.error('Error fetching options:', error);
   }
}

export const getQuestion = (questions: FilteredResponse[], value: string) => {
   const getGroupIndex = value.split('')[0]
   return questions.find(q => q.group === Number(getGroupIndex))
}
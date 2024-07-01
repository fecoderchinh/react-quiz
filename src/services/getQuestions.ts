import { FilteredResponse, QuestionAPIProps, Response, ResponseAnswers } from "../components/interfaces";
import { decodeHtmlEntity } from "../utils";

export const getQuestions = async ({ category, mode }: QuestionAPIProps) => {
   try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${mode}&type=multiple`).then(response => {
         if (!response.ok) {
            console.log(response.status === 429 ? 'Too many requests' : '')
         } else {
            return response
         }
      });
      const data: Response = await response?.json();

      const mappingResponse = data?.results?.map((res, index) => {
         const listAnswers = [
            {
               group: index + 1,
               index: `${index + 1}0`,
               is_corrected: true,
               answer: decodeHtmlEntity(String(res.correct_answer)),
            },
            ...res.incorrect_answers.map((ia, idx) => {
               return {
                  group: index + 1,
                  index: `${index + 1}${idx + 1}`,
                  is_corrected: false,
                  answer: decodeHtmlEntity(String(ia)),
               }
            })
         ]
         return {
            group: index + 1,
            question: decodeHtmlEntity(String(res.question)),
            correct_answer: decodeHtmlEntity(String(res.correct_answer)),
            answers: shuffleAnswers(listAnswers),
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

export const shuffleAnswers = (currentAnswers: ResponseAnswers[]) => {
   for (let i = currentAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentAnswers[i], currentAnswers[j]] = [currentAnswers[j], currentAnswers[i]];
   }
   return currentAnswers;
}


export const countAnswers = (questions: FilteredResponse[]) => {

   const count = questions.filter(q => {
      const correct = q.answers.find(a => a.is_corrected)
      return correct?.index === q.is_selected
   }).length

   return count
}
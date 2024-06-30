import { QuestionAPIProps, Response } from "../components/interfaces";

export const getQuestions = async ({ category, mode }: QuestionAPIProps) => {
   try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${mode}&type=multiple`);
      const data: Response = await response.json();

      return data

   } catch (error) {
      console.error('Error fetching options:', error);
   }
}
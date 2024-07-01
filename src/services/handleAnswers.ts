import { ResponseAnswers } from "../components/interfaces";

export const getAnswerIndex = (currentAnswers: ResponseAnswers[], value: string) => {
   const getFirstChar = value.split('')[0]
   return currentAnswers.findIndex(ans => ans.group === Number(getFirstChar))
}

export const getAnswer = (currentAnswers: ResponseAnswers[], value: string) => {
   const getFirstChar = value.split('')[0]
   return currentAnswers.find(ans => ans.group === Number(getFirstChar))
}

export const replaceAnswers = (currentAnswers: ResponseAnswers[], value: string) => {
   const getFirstChar = value.split('')[0]
   return currentAnswers.map(ans => {
      if (ans.group === Number(getFirstChar)) {
         ans.index = value
      }
      return {
         ...ans
      }
   })
}
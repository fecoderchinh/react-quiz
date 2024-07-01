import { Dispatch } from "@reduxjs/toolkit";
import { FilteredResponse, QuestionAPIProps, ResponseAnswers } from "../components/interfaces";
import { getQuestions } from "../services";
import { error, start, successAnswers, successQuestions } from "./reducer";

export const listQuestions = ({ category, mode }: QuestionAPIProps) => async (dispatch: Dispatch) => {
   dispatch(start())
   try {
      const data = await getQuestions({ category, mode })
      if (data) {
         sessionStorage.setItem('questions', JSON.stringify(data))
         dispatch(successQuestions(data))
      }
   } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      dispatch(error({ errorMessage }));
   }
}

export const updateQuestions = (questions: FilteredResponse[]) => async (dispatch: Dispatch) => {
   dispatch(start())
   try {
      dispatch(successQuestions(questions))
   } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      dispatch(error({ errorMessage }));
   }
}

export const selectAnswers = (answers: ResponseAnswers[]) => async (dispatch: Dispatch) => {
   dispatch(start())
   try {
      dispatch(successAnswers(answers))
   } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      dispatch(error({ errorMessage }));
   }
}
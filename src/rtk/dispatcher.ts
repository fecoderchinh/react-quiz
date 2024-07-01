import { Dispatch } from "@reduxjs/toolkit";
import { FilteredResponse, QuestionAPIProps, ResponseAnswers } from "../components/interfaces";
import { getQuestions } from "../services";
import { error, start, success } from "./reducer";

export const listQuestions = ({ category, mode }: QuestionAPIProps) => async (dispatch: Dispatch) => {
   dispatch(start())
   try {
      const data = await getQuestions({ category, mode })
      if (data) {
         dispatch(success({ questions: data }))
      }
   } catch (err) {
      dispatch(error({ error: err }))
   }
}

export const updateQuestions = (questions: FilteredResponse[]) => async (dispatch: Dispatch) => {
   dispatch(start())
   try {
      dispatch(success({ questions }))
   } catch (err) {
      dispatch(error({ error: err }))
   }
}

export const selectAnswers = (answers: ResponseAnswers[]) => async (dispatch: Dispatch) => {
   dispatch(start())
   try {
      dispatch(success({ answers }))
   } catch (err) {
      dispatch(error({ error: err }))
   }
}
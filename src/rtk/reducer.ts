import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import 'immer'
import { ErrorPayload, FilteredResponse, QuestionReducerInitProps, ResponseAnswers } from '../components/interfaces'
import { getQuestionStorage } from './sessionStorage'
import { RootState } from './store'

export const initialState: QuestionReducerInitProps = {
   questions: getQuestionStorage(),
   answers: []
}
export const quizQASlice = createSlice({
   name: 'question',
   initialState,
   reducers: {
      start: (state) => {
         return {
            ...state,
            isProcessingRequest: true,
         }
      },
      successQuestions: (state, action: PayloadAction<FilteredResponse[]>) => {
         return {
            ...state,
            questions: action.payload,
            isProcessingRequest: false,
         }
      },
      successAnswers: (state, action: PayloadAction<ResponseAnswers[]>) => {
         return {
            ...state,
            answers: action.payload,
            isProcessingRequest: false,
         }
      },
      error: (state, action: PayloadAction<ErrorPayload>) => {
         return {
            ...state,
            errors: action.payload,
            isProcessingRequest: false,
         }
      },
   },
})

export const { start, successQuestions, successAnswers, error } = quizQASlice.actions
export const selectQuestion = (state: RootState) => state.questions
export const questionReducer = quizQASlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import 'immer'
import { QuestionReducerInitProps } from '../components/interfaces'
import { RootState } from './store'

export const initialState: QuestionReducerInitProps = {
   questions: [],
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
      success: (state, action) => {
         return {
            ...state,
            ...action.payload,
            isProcessingRequest: false,
         }
      },
      error: (state, action) => {
         return {
            ...state,
            ...action.payload,
            isProcessingRequest: false,
         }
      },
   },
})

export const { start, success, error } = quizQASlice.actions
export const selectQuestion = (state: RootState) => state.questions
export const questionReducer = quizQASlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import { questionReducer } from './reducer'

export const store = configureStore({
   reducer: {
      questions: questionReducer,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat([]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
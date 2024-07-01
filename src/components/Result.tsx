import { FC, memo, useCallback } from "react";
import { ResponseAnswers, ResultProps } from "./interfaces";

const Result: FC<ResultProps> = memo(({ options, selected }) => {
   const setClassNames = useCallback((option: ResponseAnswers) => {
      if (selected === option.index) {
         if (option.is_corrected) {
            return 'correct'
         } else {
            return 'selected'
         }
      }
      if (option.is_corrected) {
         return 'correct'
      }
      if (!option.is_corrected && selected === option.index) {
         return 'incorrect'
      }
   }, [selected])

   return (
      <div className="label-result">
         {options.map((option) => (
            <div key={option.index}>
               <div className={`default-result ${setClassNames(option)}`}>{option.answer}</div>
            </div>
         ))}
      </div>
   )
})

export default Result
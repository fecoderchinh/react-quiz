import { ChangeEvent, FC, memo } from "react";
import { AnswerProps } from "./interfaces";

const Answer: FC<AnswerProps> = memo(({ onChange, options, selectedValue, name }) => {
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
   };

   return (
      <div>
         {options.map((option) => (
            <div key={option.index}>
               <input
                  type="radio"
                  id={option.index}
                  name={name}
                  value={option.index}
                  checked={selectedValue === option.index}
                  onChange={handleChange}
               />
               <label htmlFor={option.index}>{option.answer}</label>
            </div>
         ))}
      </div>
   );
})

export default Answer
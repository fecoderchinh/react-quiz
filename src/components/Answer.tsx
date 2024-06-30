import { ChangeEvent, FC, memo } from "react";
import { AnswerProps } from "./interfaces";

const Answer: FC<AnswerProps> = memo(({ onChange, options, selectedValue, name }) => {
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
   };

   return (
      <div>
         {options.map((option) => (
            <div key={option}>
               <input
                  type="radio"
                  id={option}
                  name={name}
                  value={option}
                  checked={selectedValue === option}
                  onChange={handleChange}
               />
               <label htmlFor={option}>{option}</label>
            </div>
         ))}
      </div>
   );
})

export default Answer
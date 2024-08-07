import { ChangeEvent, FC, memo, useState } from "react";
import { AnswerProps } from "./interfaces";

const Answer: FC<AnswerProps> = memo(({ onChange, options, selectedValue, name }) => {
   const [classes, setClasses] = useState<string>('')
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setClasses(value)
      onChange(value);
   };

   return (
      <div className="label">
         {options.map((option) => (
            <div key={option.index} className={classes === option.index ? 'active' : ''}>
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
import { FC, memo, useState } from "react";
import Answer from "./Answer";
import { QuestionProps } from "./interfaces";

const Question: FC<QuestionProps> = memo(({ questionText, options, name, onChange }) => {
   const [selectedValue, setSelectedValue] = useState<string>('');

   const handleAnswerChange = (value: string) => {
      setSelectedValue(value);
      onChange(value)
   };

   return (
      <div>
         <h2>{questionText}</h2>
         <Answer options={options} selectedValue={selectedValue} onChange={handleAnswerChange} name={name} />
      </div>
   );
})

export default Question
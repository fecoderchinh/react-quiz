import { ChangeEvent, FC, memo } from "react";
import { SelectProps } from "./interfaces";

const Select: FC<SelectProps> = memo(({ options, selected, onChange, id, defaultOption }) => {
   const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      onChange(selectedValue)
   };

   return (
      <select value={selected} onChange={handleChange} id={id}>
         <option value="" disabled>
            {defaultOption}
         </option>
         {options.map(option => (
            <option key={option.id} value={option.id}>
               {option.name}
            </option>
         ))}
      </select>
   );
})

export default Select
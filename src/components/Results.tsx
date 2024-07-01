import { FC, memo } from "react";
import { ResultListProps } from "./interfaces";
import Result from "./Result";

const Results: FC<ResultListProps> = memo(({ questionText, options, selected }) => {
   return (
      <div className="question">
         <h2>{questionText}</h2>
         <Result options={options} selected={selected} />
      </div>
   )
})

export default Results
export interface SelectOptions { name: string; id: string }

export interface SelectProps {
   options: SelectOptions[]
   selected: string
   onChange: (value: string) => void
}

export interface SelectedProps {
   category: string
   mode: string
}

export interface ResponseResult {
   category: string
   correct_answer: string
   difficulty: string
   incorrect_answers: string[]
   question: string
   type: string
}

export interface Response {
   response_code: number
   results: ResponseResult[]
}

export interface ResponseAnswers {
   index: string,
   is_corrected: boolean,
   answer: string
}

export interface FilteredResponse {
   category: string
   correct_answer: string
   difficulty: string
   incorrect_answers: string[]
   question: string
   type: string
   answers: ResponseAnswers[]
}

export interface InlineFormProps {
   onClick: (value: SelectedProps) => void
}

export interface QuestionProps {
   questionText: string;
   options: ResponseAnswers[];
   name: string;
   onChange: (value: string) => void
}

export interface QuestionAPIProps {
   category: string
   mode: string
}

export interface AnswerProps {
   options: ResponseAnswers[];
   selectedValue: string;
   onChange: (value: string) => void;
   name: string
}
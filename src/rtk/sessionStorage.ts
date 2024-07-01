export const questionStorage = sessionStorage.getItem('questions')

export const getQuestionStorage = () => {
   try {
      return questionStorage ? JSON.parse(questionStorage) : [];
   } catch (error) {
      return []
   }
}
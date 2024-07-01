import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import Select from "./Select";
import { InlineFormProps, SelectedProps, SelectOptions } from "./interfaces";

const InlineForm: FC<InlineFormProps> = memo(({ onClick }) => {

   const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [categories, setCategories] = useState<SelectOptions[]>([]);
   const [selectedMode, setSelectedMode] = useState<string>('');

   const modes = useMemo(() => {
      return [
         { id: 'easy', name: 'Easy' },
         { id: 'medium', name: 'Medium' },
         { id: 'hard', name: 'Hard' },
      ] as SelectOptions[]
   }, [])

   const handleSelectCategory = (value: string) => {
      setSelectedCategory(value)
   }

   const handleSelectMode = (value: string) => {
      setSelectedMode(value)
   }

   const handleCreate = useCallback(() => {
      if (selectedCategory && selectedMode) {
         const selected: SelectedProps = { category: selectedCategory, mode: selectedMode };
         onClick(selected);
      }
   }, [onClick, selectedCategory, selectedMode])

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await fetch('https://opentdb.com/api_category.php');
            const data = await response.json();
            setCategories(data.trivia_categories)

         } catch (error) {
            console.error('Error fetching options:', error);
         }
      };
      fetchCategories()
   }, [modes])

   return (
      <>
         <Select selected={selectedCategory} options={categories} onChange={handleSelectCategory} id='categorySelect' defaultOption='Select a category' />
         <Select selected={selectedMode} options={modes} onChange={handleSelectMode} id='difficultySelect' defaultOption='Select difficult' />
         <button id='createBtn' onClick={handleCreate}>Create</button>
      </>
   )
})

export default InlineForm
import { createSlice } from "@reduxjs/toolkit";

const CategorySlice=createSlice({
    name:'categorySlice',
    initialState:{
        categoryList:[],
        selectedCategory:null
    },
    reducers:{
        setCategoryList:(state,action)=>{
            state.categoryList=action.payload;
        },
        getSelectedCategory:(state,action)=>{
            state.selectedCategory=action.payload;
        },
        deleteCategory: (state,action)=>{
            state.categoryList=state.categoryList.filter(category=> category.id !==action.payload);
        }
    },
});

export const {setCategoryList,deleteCategory}=CategorySlice.actions;

export default CategorySlice.reducer;

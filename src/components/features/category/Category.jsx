import React, { useEffect } from 'react'
import { useGetCategoryQuery } from './categoryApi'
import CategoryLoader from '../../loaders/CategoryLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryList } from './CategorySlice';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const { data, isLoading, isError } = useGetCategoryQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categoryList = useSelector(state => state.CategorySlice.categoryList);
    console.log({ categoryList });

    useEffect(() => {
        if (data?.statusCode === 200) {
            dispatch(setCategoryList(data.response));
        }
    }, [data]);

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm" onClick={() => navigate('/addCategory')}>+ Add Category</button>
                </div>
                <ul>
                    {isLoading ? <CategoryLoader /> :
                        categoryList?.map((category, index) => (
                            <li key={index} className="flex justify-between items-center p-2 border-b">
                                <span>{category.name}</span>
                                <span className="text-gray-500 text-sm">{categoryList?.length} products</span>
                                <div className="flex gap-2">
                                    <button className="text-blue-500">✏️</button>
                                    <button className="text-red-500">🗑️</button>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    )
}

export default Category
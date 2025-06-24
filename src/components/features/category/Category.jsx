import React, { useEffect } from 'react'
import { useDeleteCategoryMutation, useGetCategoryQuery } from './categoryApi'
import CategoryLoader from '../../loaders/CategoryLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryList } from './CategorySlice';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";


const Category = () => {
    const { data, isLoading, isError } = useGetCategoryQuery();
    const [deleteCategory, { isDeleting, isDelError }] = useDeleteCategoryMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categoryList = useSelector(state => state.CategorySlice.categoryList);
    console.log({ categoryList });

    useEffect(() => {
        if (data?.statusCode === 200) {
            dispatch(setCategoryList(data.response));
        }
    }, [data]);

    const handleDelete = async (id) => {
        try {
            const response = await deleteCategory(id);
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm" onClick={() => navigate('/addCategory')}>+ Add Category</button>
                </div>
                <li className="flex justify-between items-center p-2 border-b text-center">
                    <span className='font-bold'>Name</span>
                    <span className=" text-sm font-bold" >Products</span>
                    <div className="flex gap-2 font-bold">
                        Actions
                    </div>
                </li>
                <ul>
                    {isLoading ? <CategoryLoader /> :
                        <>

                            {categoryList?.map((category, index) => (


                                <li key={index} className="flex justify-between items-center p-2 border-b text-center">
                                    <span className=''>{category.name}</span>
                                    <span className="text-gray-500  text-sm">{categoryList?.length} products</span>
                                    <div className="flex gap-2">
                                        <Link to={`/updateCategory/${category?.id}`} className="text-blue-500" ><FaRegEdit /></Link>
                                        <button className="text-red-500" onClick={() => handleDelete(category.id)}>
                                            <RiDeleteBin6Line /></button>
                                    </div>
                                </li >

                            ))}
                        </>}
                </ul>
            </div>
        </>
    )
}

export default Category
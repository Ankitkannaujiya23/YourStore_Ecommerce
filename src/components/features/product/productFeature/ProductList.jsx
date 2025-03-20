
import React, { useEffect } from 'react'

import ProductCard from './ProductCard'
import { useGetProductsQuery } from './productsApi';

const ProductList = ({ProductData}) => {
   
    const {data,isLoading, error}=useGetProductsQuery();

useEffect(()=>{

},[]);

    if(isLoading) return (<>
    <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
  <div className="flex animate-pulse space-x-4">
    <div className="size-10 rounded-full bg-gray-200"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 rounded bg-gray-200"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
        </div>
        <div className="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
</div></>)

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl  sm:px-6  lg:max-w-7xl lg:px-8">
                {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-3">
                    {data?.data?.map((product) => (
                        <ProductCard product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList
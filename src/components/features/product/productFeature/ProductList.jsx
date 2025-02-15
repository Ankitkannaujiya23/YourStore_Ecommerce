
import React from 'react'

import ProductCard from './ProductCard'

const ProductList = ({ProductData}) => {
   


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl  sm:px-6  lg:max-w-7xl lg:px-8">
                {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-3">
                    {ProductData.map((product) => (
                        <ProductCard product={product}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList
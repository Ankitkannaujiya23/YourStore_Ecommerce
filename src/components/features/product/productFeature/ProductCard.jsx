import React from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/outline'


const ProductCard = ({ product }) => {
    return (
        <div>
            <div key={product.id} className="group relative  border-solid border-2 border-gray-200 p-2 rounded shadow">
                <Link to={`/productDetails/${product.id}`}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-60 ">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover  object-center lg:h-full lg:w-full group-hover:scale-125  transform transition duration-500"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.title}
                                </a>
                            </h3>

                            <p className="mt-1 text-sm text-gray-500 inline"><StarIcon className='w-5 h-5 inline' />
                                <span className='align-bottom'> {product.rating}</span></p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                            <p className="text-sm font-medium text-gray-400"><del>${product.price}</del></p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard

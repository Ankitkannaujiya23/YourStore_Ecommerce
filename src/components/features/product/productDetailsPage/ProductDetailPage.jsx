import React, { useState } from 'react'
import { useGetProductByIdQuery } from '../productFeature/productsApi';
import { useParams } from 'react-router-dom';
import ProductLoader from '../../../loaders/ProductLoader';
import { useDispatch, useSelector } from 'react-redux';
import { addItemIntoCart } from '../../cart/CartSlice';

const ProductDetailPage = () => {

    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedSize, setSelectedSize] = useState('Standard');
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { data, isLoading, isError } = useGetProductByIdQuery(id);
    const product = data?.statusCode === 200 ? data.data[0] : {};
    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.CartSlice);
    console.log({ cartItem });

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(quantity + 1);
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        const selectedProduct = { ...product };
        selectedProduct.quantity = quantity;
        dispatch(addItemIntoCart(selectedProduct));
    }


    return (
        <>

            {isLoading ? <ProductLoader />
                :
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left: Product Images */}
                    <div>
                        <div className="relative w-full aspect-square  flex items-center justify-center text-4xl font-bold text-gray-500">
                            <img
                                src={product?.image[0]}
                                alt="Product"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex mt-4 gap-4">
                            {product?.image?.map((img, i) => (
                                <div key={i} className="w-24 h-24 bg-gray-200 text-center flex items-center justify-center text-gray-500">
                                    <img
                                        src={img}
                                        alt="Product"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold">{product?.name}</h1>
                        <p className="text-2xl text-gray-700 mt-2">₹{product?.price}</p>
                        <span className={`text-sm ${product?.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} font-semibold px-2 py-1 rounded inline-block mt-2`}>
                            {product?.stock > 0 ? "In" : "Out of"} Stock
                        </span>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            {product?.description}
                        </p>

                        {/* Color */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium mb-1">Color</h3>
                            <div className="flex gap-3">
                                {['black', 'gray', 'blue'].map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-300'
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="mt-4">
                            <h3 className="text-sm font-medium mb-1">Size</h3>
                            <div className="flex gap-3">
                                {['Standard', 'Large'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-1 border rounded ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-4">
                            <h3 className="text-sm font-medium mb-1">Quantity</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantity('dec')}
                                    className="px-2 py-1 border border-gray-400 rounded"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => handleQuantity('inc')}
                                    className="px-2 py-1 border border-gray-400 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-6">
                            <button onClick={handleAddToCart} className="w-full py-3 bg-indigo-100 text-indigo-700 font-semibold rounded hover:bg-indigo-200">
                                🛒 Add to Cart
                            </button>
                        </div>
                    </div>
                </div>}

        </>
    )
}

export default ProductDetailPage
import { CartContext } from '@/contexts/CartContext'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState({})
    const router = useRouter()

    const { key, handleWishlist } = useContext(CartContext)

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist')
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist))
        }
    }, [key])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            {Object.keys(wishlist).length === 0 &&
                <div className='w-full h-[60vh] flex flex-col items-center justify-center '>
                    <h4 className="text-gray-900 title-font text-2xl font-semibold mb-4">Your Wishlist is Empty!</h4>
                    <button className="flex text-white bg-indigo-500 text-sm border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded" onClick={() => router.push('/')}>Continue Shopping</button>
                </div>
            }
            <div className="container px-5 md:py-18 py-10 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                    {Object.keys(wishlist)?.map((item) => (
                        <div className="py-8 flex flex-wrap md:flex-nowrap md:gap-8" key={wishlist[item]?.id}>
                            <div className="w-full md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={wishlist[item]?.images[0]} />
                            </div>
                            <div className="md:flex-grow">
                                <div className='hidden md:flex items-center justify-between'>
                                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{wishlist[item]?.title} ( {wishlist[item]?.selectedSize} / {wishlist[item]?.selectedColor})</h2>
                                    <span className='leading-relaxed text-lg font-semibold text-gray-700'>${wishlist[item]?.price}</span>
                                </div>
                                <h2 className="md:hidden text-2xl font-medium text-gray-900 title-font mb-2">{wishlist[item]?.title}</h2>
                                <p className="leading-relaxed text-lg font-semibold text-gray-700 mb-2">Category: <span className='text-gray-500 font-normal'>{wishlist[item]?.category}</span></p>
                                <p className="md:hidden leading-relaxed text-lg font-semibold text-gray-700 mb-2">Price: <span className='text-gray-500 font-normal'>${wishlist[item]?.price}</span></p>
                                <button className="mt-4 me-5 text-red-600 hover:text-red-800 font-medium underline cursor-pointer">
                                    Add to Cart
                                </button>
                                <button className="mt-4 text-red-600 hover:text-red-800 font-medium underline cursor-pointer" onClick={() => handleWishlist({
                                    id: wishlist[item].id,
                                    title: wishlist[item].title,
                                    images: wishlist[item].images,
                                    selectedSize: wishlist[item].selectedSize,
                                    selectedColor: wishlist[item].selectedColor,
                                    price: wishlist[item].price
                                })}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Wishlist
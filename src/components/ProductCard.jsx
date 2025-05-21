import Link from 'next/link'
import React from 'react'

const ProductCard = ({ data }) => {    
    return (
        <Link href={`/product/${data?.id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm md:shadow-none">
            <div className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={data?.images[0]} />
            </div>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{data?.category?.charAt(0).toUpperCase() + data?.category?.slice(1)}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{data?.title}</h2>
                <p className="mt-1">${data?.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard
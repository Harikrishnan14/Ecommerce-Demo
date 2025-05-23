import { useRouter } from 'next/router'
import React from 'react'

const Custom404 = () => {
    const router = useRouter()
    return (
        <div className='flex flex-col items-center justify-center w-full h-[60vh]'>
            <div className='relative  w-full max-w-3xl'>
                <img src='gifs/Custom404.gif' alt="" className="object-contain object-center w-full h-full block" />
                <div className="absolute bottom-[-80] md:bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-2xl font-semibold text-gray-900 mb-4">
                        Oops, Looks like you are lost!
                    </p>
                    <button onClick={() => router.push('/')} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded">
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Custom404
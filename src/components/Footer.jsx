import React from 'react'

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font mb-5 md:mb-0">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Ecommerce</span>
                </a>
                <p className="text-sm text-gray-500 sm:ml-auto sm:pl-4 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025 Harikrishnan V B</p>
            </div>
        </footer>
    )
}

export default Footer
import React, { useContext, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PriceBreakdown from '@/components/modals/PriceBreakdown';
import { CartContext } from '@/contexts/CartContext';

const Cart = () => {
    const [open, setOpen] = useState(false)
    const [cart, setCart] = useState()

    const { key, removeFromCart } = useContext(CartContext)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        setCart(cart)
    }, [key])

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 md:py-15 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-3/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shopping Cart</h2>
                        <table className="min-w-full table-auto text-left text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4">Product</th>
                                    <th className="py-2 px-4">Quantity</th>
                                    <th className="py-2 px-4">Price</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6">
                                            Cart is empty
                                        </td>
                                    </tr>
                                ) : (
                                    cart?.map((item, index) => (
                                        <tr className="border-b" key={index}>
                                            <td className="py-6 px-4">{item?.title}</td>
                                            <td className="py-6 px-4 flex items-center">
                                                <button className="bg-gray-300 px-2 rounded-l hover:bg-gray-400">-</button>
                                                <span className="px-3">{item?.quantity}</span>
                                                <button className="bg-gray-300 px-2 rounded-r hover:bg-gray-400">+</button>
                                            </td>
                                            <td className="py-6 px-4">${(item?.quantity * item?.price).toFixed(2)}</td>
                                            <td className="py-6 px-4">
                                                <button className="text-red-500 hover:underline cursor-pointer" onClick={() => removeFromCart({
                                                    title: item?.title,
                                                    selectedColor: item?.selectedColor,
                                                    selectedSize: item?.selectedSize
                                                })}>
                                                    <DeleteForeverIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="hidden md:block lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 sticky top-20 self-start">
                        <div className="mt-10">
                            <h4 className='text-xl font-medium text-gray-900 title-font text-start'>Price Breakdown</h4>
                            <div className="mt-6 max-w-md ml-auto bg-gray-100 rounded-lg p-6 space-y-3 text-gray-800">
                                <div className="flex justify-between">
                                    <span>MRP</span>
                                    <span>$120.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">- $10.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$1.98</span>
                                </div>
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>$111.98</span>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                                    <div className="flex">
                                        <input type="text" id="promo" placeholder="Enter code" className="w-full border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none" />
                                        <button className="bg-indigo-500 text-white px-4 rounded-r hover:bg-indigo-600 text-sm">Apply</button>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-6 flex md:ml-auto md:mr-0 mx-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded">
                                Proceed to Buy
                            </button>
                        </div>
                    </div>
                    <div className="md:hidden mt-6 w-full ml-auto bg-gray-100 rounded-lg p-6 space-y-3 text-gray-800 sticky bottom-0">
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Total Price: $500</span>
                            <button className='text-sm text-gray-500' onClick={handleOpen}>Show Price breakdown</button>
                        </div>
                        <button className="mt-6 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded">
                            Proceed to Buy
                        </button>
                    </div>
                </div>
            </div>

            <PriceBreakdown open={open} handleClose={handleClose} />
        </section>
    )
}

export default Cart
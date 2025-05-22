import React, { useContext, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PriceBreakdown from '@/components/modals/PriceBreakdown';
import { CartContext } from '@/contexts/CartContext';

const Cart = () => {
    const [open, setOpen] = useState(false)
    const [cart, setCart] = useState()
    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);

    const { key, removeFromCart, handleQty } = useContext(CartContext)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const validPromoCodes = ["TEST1", "TEST2", "TEST3", "TEST4", "TEST5"];

    const totalPrice = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleApplyPromo = () => {
        if (validPromoCodes.includes(promoCode.toUpperCase())) {
            setDiscountPercent(10);
            alert("Promo code applied! 10% discount granted.");
        } else {
            setDiscountPercent(0);
            alert("Invalid promo code.");
        }
    };

    const discountAmount = (totalPrice * discountPercent) / 100;
    const tax = 1.98;
    const finalTotal = totalPrice - discountAmount + tax;

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
                                                <button className="bg-gray-300 px-2 rounded-l hover:bg-gray-400" onClick={() => handleQty({ title: item.title, selectedColor: item.selectedColor, selectedSize: item.selectedSize }, "dec")}>-</button>
                                                <span className="px-3">{item?.quantity}</span>
                                                <button className="bg-gray-300 px-2 rounded-r hover:bg-gray-400" onClick={() => handleQty({ title: item.title, selectedColor: item.selectedColor, selectedSize: item.selectedSize }, "inc")}>+</button>
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
                                    <span>${totalPrice?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-600">- ${discountAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>{cart?.length > 0 ? `$${finalTotal.toFixed(2)}` : `$0.00`}</span>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                                    <div className="flex">
                                        <input type="text" id="promo" placeholder="Enter code" className="w-full border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                                        <button disabled={cart?.length === 0} className="bg-indigo-500 text-white px-4 rounded-r hover:bg-indigo-600 text-sm disabled:cursor-not-allowed disabled:bg-indigo-300" onClick={handleApplyPromo}>Apply</button>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-6 flex md:ml-auto md:mr-0 mx-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded disabled:cursor-not-allowed disabled:bg-indigo-300" disabled={cart?.length === 0}>
                                Proceed to Buy
                            </button>
                        </div>
                    </div>
                    <div className="md:hidden mt-6 w-full ml-auto bg-gray-100 rounded-lg p-6 space-y-3 text-gray-800 sticky bottom-0">
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Total Price: {cart?.length > 0 ? `$${finalTotal.toFixed(2)}` : `$0.00`}</span>
                            <button className='text-sm text-gray-500' onClick={handleOpen}>Show Price breakdown</button>
                        </div>
                        <button className="mt-6 flex mx-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded disabled:cursor-not-allowed disabled:bg-indigo-300" disabled={cart?.length === 0}>
                            Proceed to Buy
                        </button>
                    </div>
                </div>
            </div>

            <PriceBreakdown
                open={open}
                handleClose={handleClose}
                totalPrice={totalPrice}
                discountAmount={discountAmount}
                tax={tax}
                cart={cart}
                finalTotal={finalTotal}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                handleApplyPromo={handleApplyPromo}
            />
        </section>
    )
}

export default Cart
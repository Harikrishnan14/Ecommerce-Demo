import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const PriceBreakdown = ({ open, handleClose, totalPrice, discountAmount, tax, cart, finalTotal, promoCode, setPromoCode, handleApplyPromo }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
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
            </Box>
        </Modal>
    )
}

export default PriceBreakdown
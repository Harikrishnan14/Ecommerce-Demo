import ProductCard from '@/components/ProductCard';
import { CartContext } from '@/contexts/CartContext';
import React, { useContext, useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const IndividualProduct = ({ product, similiarProducts }) => {

    const [selectedOpt, setSelectedOpt] = useState('SM')
    const [selectedColor, setSelectedColor] = useState('White')
    const [wishlistStatus, setWishlistStatus] = useState(false);

    const { addToCart, handleWishlist, key } = useContext(CartContext)

    const isInWishlist = (item) => {
        try {
            const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
            const wishlist = Array.isArray(storedWishlist) ? storedWishlist : [];

            return wishlist.some(wishlistItem =>
                wishlistItem.id === item.id &&
                wishlistItem.selectedColor === item.selectedColor &&
                wishlistItem.selectedSize === item.selectedSize
            );
        } catch (err) {
            return false;
        }
    };

    useEffect(() => {
        setWishlistStatus(isInWishlist({
            id: product.id,
            selectedColor,
            selectedSize: selectedOpt
        }));        
    }, [product.id, selectedColor, selectedOpt, key]);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-10 md:py-15 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="w-full lg:w-1/2 h-full">
                        <Carousel
                            arrows
                            autoPlaySpeed={3000}
                            infinite
                            keyBoardControl
                            pauseOnHover
                            showDots
                            swipeable
                            responsive={{
                                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                                tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
                                mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
                            }}
                        >
                            {product?.images?.map((img, index) => (
                                <img alt="ecommerce" className="w-full h-full object-cover rounded" src={img} key={index} />
                            ))}
                        </Carousel>
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.brand}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <svg key={index} fill={Math.round(product.rating) > index ? "currentColor" : "none"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                ))}
                                <span className="text-gray-600 ml-3">{product?.reviews?.length} Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed">{product?.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                <button className={`border-2 rounded-full w-6 h-6 focus:outline-none cursor-pointer ${selectedColor === "White" ? "border-red-600" : "border-gray-300"}`} onClick={() => setSelectedColor("White")}></button>
                                <button className={`border-2 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none cursor-pointer ${selectedColor === "Black" ? "border-red-600" : "border-gray-300"}`} onClick={() => setSelectedColor("Black")}></button>
                                <button className={`border-2 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none cursor-pointer ${selectedColor === "Blue" ? "border-red-600" : "border-gray-300"}`} onClick={() => setSelectedColor("Blue")}></button>
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 cursor-pointer" value={selectedOpt} onChange={(e) => setSelectedOpt(e.target.value)}>
                                        <option value="SM">SM</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                            <button
                                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                onClick={() => addToCart({
                                    title: product?.title,
                                    quantity: 1,
                                    selectedColor,
                                    selectedSize: selectedOpt,
                                    price: product?.price
                                })}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 cursor-pointer"
                                onClick={() => {
                                    handleWishlist({
                                        id: product.id,
                                        title: product.title,
                                        images: product.images,
                                        selectedColor,
                                        selectedSize: selectedOpt,
                                        price: product.price
                                    });
                                    // setWishlistStatus(true);
                                }}
                            >
                                {wishlistStatus ? (
                                    <svg fill="red" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.01 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 19.99 4 22 6.01 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                ) : (
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-5 py-10 md:py-15 mx-auto">
                <h3 className="text-gray-900 text-3xl title-font font-medium mb-6">Similiar Products</h3>
                {similiarProducts?.products?.length > 0 ? (
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 3,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {similiarProducts?.products?.map((prod) => (
                            <ProductCard data={prod} key={prod.id} />
                        ))}
                    </Carousel>
                ) : (
                    <div className="w-full text-center py-8 text-gray-500 font-medium">
                        No similiar products found!
                    </div>
                )}
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    const prodRes = await fetch(`https://dummyjson.com/products/${context.query.id}`)
    const product = await prodRes.json()
    const simProdRes = await fetch(`https://dummyjson.com/products/category/${product.category}?limit=8`)
    const similiarProducts = await simProdRes.json()
    return {
        props: {
            product: product,
            similiarProducts: similiarProducts
        }
    };
}


export default IndividualProduct
import ProductCard from '@/components/ProductCard'
import { Breadcrumbs, Skeleton } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const slug = ({ products: initialProducts }) => {
    const location = useParams()
    const [products, setProducts] = useState(initialProducts?.products || []);
    const [skip, setSkip] = useState(12);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreProducts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await fetch(`https://dummyjson.com/products/category/${location.slug}?limit=12&skip=${skip}`);
            const data = await res.json();

            if (data.products.length > 0) {
                setProducts((prev) => [...prev, ...data.products]);
                setSkip((prev) => prev + 12);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.scrollHeight
            ) {
                fetchMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [skip, loading, hasMore, location.slug]);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-14 mx-auto">
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "2rem" }}>
                    <Link href={"/"} className="text-gray-600">Home</Link>
                    <Link href={"/products"} className="text-gray-600">Products</Link>
                    <span className="text-gray-800 font-semibold">{location.slug.charAt(0).toUpperCase() + location.slug.slice(1)}</span>
                </Breadcrumbs>
                <div className="flex flex-wrap -m-4">
                    {products?.map((item) => (
                        <ProductCard data={item} key={item.id} />
                    ))}
                    {loading && Array.from({ length: 4 }).map((_, index) => (
                        <div className="lg:w-1/4 md:w-1/2 p-4" key={index}>
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={325} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(`https://dummyjson.com/products/category/${context.query.slug}?limit=12`)
    const products = await response.json()
    return {
        props: {
            products
        }
    };
}

export default slug
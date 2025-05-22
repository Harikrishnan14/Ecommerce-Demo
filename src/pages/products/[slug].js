import FilterModal from '@/components/modals/FilterModal'
import ProductCard from '@/components/ProductCard'
import { Breadcrumbs, FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Slug = ({ products: initialProducts }) => {
    const location = useParams()
    const [products, setProducts] = useState(initialProducts?.products || []);
    const [skip, setSkip] = useState(12);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        priceRanges: [],
        ratings: []
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const filteredProducts = products
        ?.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(item => {
            const { categories, brands, priceRanges, ratings } = filters;

            const categoryMatch = categories.length
                ? categories.includes(item.category)
                : true;

            const brandMatch = brands.length
                ? brands.includes(item.brand)
                : true;

            const priceMatch = priceRanges.length
                ? priceRanges.some(range => {
                    const parts = range.replace(/\$/g, '').split('-');

                    const min = parseFloat(parts[0].trim());
                    const max = parts[1]
                        ? parseFloat(parts[1].replace('+', '').trim())
                        : Infinity;

                    return item.price >= min && item.price <= max;
                })
                : true;

            const ratingMatch = ratings.length
                ? ratings.some(r => {
                    const minRating = Number(r[0]);
                    return item.rating >= minRating;
                })
                : true;

            return categoryMatch && brandMatch && priceMatch && ratingMatch;
        })
        .sort((a, b) => {
            if (sortBy === "lowToHigh") return a.price - b.price;
            if (sortBy === "newest") return new Date(b.meta.createdAt) - new Date(a.meta.createdAt);
            return 0;
        });

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
                <div className="flex flex-wrap items-center justify-center md:justify-between mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex items-center gap-4 h-10">
                        <FormControl sx={{ minWidth: 185 }} size="small">
                            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Sort By"
                                defaultValue="relevance"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="relevance">Relevance</MenuItem>
                                <MenuItem value="lowToHigh">Price (Low to High)</MenuItem>
                                <MenuItem value="newest">Newest</MenuItem>
                            </Select>
                        </FormControl>

                        <button
                            className="text-white bg-indigo-500 border-0 px-6 rounded hover:bg-indigo-600 cursor-pointer"
                            style={{ height: '40px' }}
                            onClick={handleOpen}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {filteredProducts?.length > 0 ? (
                        filteredProducts.map((item) => (
                            <ProductCard data={item} key={item.id} />
                        ))
                    ) : !loading ? (
                        <div className="w-full text-center py-8 text-gray-500 font-medium">
                            No products found.
                        </div>
                    ) : null}
                    {loading && Array.from({ length: 4 }).map((_, index) => (
                        <div className="lg:w-1/4 md:w-1/2 p-4" key={index}>
                            <Skeleton variant="rectangular" animation="wave" width="100%" height={325} />
                        </div>
                    ))}
                </div>

            </div>

            <FilterModal open={open} handleClose={handleClose} filters={filters} setFilters={setFilters} disableCat={true} />
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

export default Slug
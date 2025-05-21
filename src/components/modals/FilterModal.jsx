import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox, FormControlLabel, FormGroup, Stack, useMediaQuery, useTheme } from '@mui/material';

const FilterModal = ({ open, handleClose, filters, setFilters, disableCat }) => {
    const [categories, setCategories] = useState([])

    const brands = [
        "Essence",
        "Glamour Beauty",
        "Velvet Touch",
        "Chic Cosmetics",
        "Nail Couture",
        "Calvin Klein",
        "Chanel",
        "Dior",
        "Dolce & Gabbana",
        "Gucci"
    ]

    const priceRanges = ["$0 - $50",
        "$51 - $100",
        "$101 - $200",
        "$201 - $500",
        "$501+"
    ]

    const ratings = ["1 Star & Up",
        "2 Stars & Up",
        "3 Stars & Up",
        "4 Stars & Up",
        "5 Stars"
    ]

    const handleCheckboxChange = (type, value) => {
        setFilters(prev => {
            const isSelected = prev[type].includes(value);
            return {
                ...prev,
                [type]: isSelected
                    ? prev[type].filter(item => item !== value)
                    : [...prev[type], value]
            };
        });
    }

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                    Filter By
                </Typography>

                <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 2 : 10} sx={{ mb: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Category</Typography>
                        <Box sx={{ mt: 1, maxHeight: 120, overflowY: "auto" }}>
                            <FormGroup>
                                {categories?.map((category) => (
                                    <FormControlLabel
                                        key={category.slug}
                                        control={
                                            <Checkbox
                                                checked={filters.categories.includes(category.slug)}
                                                onChange={() => handleCheckboxChange("categories", category.slug)}
                                                disabled={disableCat}
                                            />
                                        }
                                        label={category?.name}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Brand</Typography>
                        <Box sx={{ mt: 1, maxHeight: 120, overflowY: "auto" }}>
                            <FormGroup>
                                {brands.map((brand) => (
                                    <FormControlLabel
                                        key={brand}
                                        control={
                                            <Checkbox
                                                checked={filters.brands.includes(brand)}
                                                onChange={() => handleCheckboxChange("brands", brand)}
                                            />
                                        }
                                        label={brand}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    </Box>
                </Stack>

                <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 2 : 10} sx={{ mb: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Price Range</Typography>
                        <Box sx={{ mt: 1, maxHeight: 120, overflowY: "auto" }}>
                            <FormGroup>
                                {priceRanges.map((range) => (
                                    <FormControlLabel
                                        key={range}
                                        control={
                                            <Checkbox
                                                checked={filters.priceRanges.includes(range)}
                                                onChange={() => handleCheckboxChange("priceRanges", range)}
                                            />
                                        }
                                        label={range}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Rating</Typography>
                        <Box sx={{ mt: 1, maxHeight: 120, overflowY: "auto" }}>
                            <FormGroup>
                                {ratings.map((rating) => (
                                    <FormControlLabel
                                        key={rating}
                                        control={
                                            <Checkbox
                                                checked={filters.ratings.includes(rating)}
                                                onChange={() => handleCheckboxChange("ratings", rating)}
                                            />
                                        }
                                        label={rating}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    </Box>
                </Stack>

                <button
                    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none cursor-pointer hover:bg-indigo-600 rounded w-full"
                    onClick={() => {
                        setFilters({ categories: [], brands: [], priceRanges: [], ratings: [] });
                        handleClose();
                    }}
                >
                    Clear Filters
                </button>
            </Box>
        </Modal>
    )
}

export default FilterModal;

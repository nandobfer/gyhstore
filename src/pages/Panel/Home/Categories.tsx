import React from "react"
import { Avatar, Box, Button } from "@mui/material"
import { useCategory } from "../../../hooks/useCategory"
import { Carousel } from "react-responsive-carousel"
import { getImageUrl } from "../../../tools/getImageUrl"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { CurrencyText } from "../../../components/CurrencyText"
import { useNavigate } from "react-router-dom"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const categories = useCategory()
    const navigate = useNavigate()
    const onProductClick = (product: Product) => {
        navigate(`/product/${product.id}`)
    }

    return (
        <Box sx={{ gap: "5vw" }}>
            {categories.list.map((category) => (
                <Box
                    key={category.id}
                    sx={{
                        paddingTop: "2vw",
                        gap: "2vw",
                        borderTopRightRadius: "5vw",
                        borderTop: "1px solid",
                        borderTopLeftRadius: "3vw"
                    }}>
                    <Box sx={{ fontWeight: "bold", marginLeft: "2vw" }}>{category.name}</Box>
                    <Carousel
                        showThumbs={false}
                        autoPlay
                        infiniteLoop
                        interval={5000}
                        transitionTime={1000}
                        showStatus={false}
                        //style={{borderRadius: "3vw"}}
                    >
                        {category.products.map((product) => (
                            <Box key={product.id} sx={{ position: "relative" }} onClick={() => onProductClick(product)}>
                                <Avatar
                                    variant="rounded"
                                    src={getImageUrl(product.cover)}
                                    style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "7vw"
                                    }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            width: "50vw",
                                            opacity: 0.75,
                                            borderRadius: "5vw",
                                            fontWeight: "bold"
                                        }}>
                                        {product.name}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            width: "max-content",
                                            opacity: 0.75,
                                            borderRadius: "5vw",
                                            fontWeight: "bold",
                                            alignSelf: "flex-end"
                                        }}>
                                        <CurrencyText value={product.price} />
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Carousel>
                </Box>
            ))}
        </Box>
    )
}

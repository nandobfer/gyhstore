import React from "react"
import { Avatar, Box, Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { Wildcard } from "../Wilcard"
import { useProduct } from "../../hooks/useProduct"
import { Logo } from "../../components/Logo"
import { Carousel } from "react-responsive-carousel"
import { getImageUrl } from "../../tools/getImageUrl"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { CurrencyText } from "../../components/CurrencyText"
import { useCategory } from "../../hooks/useCategory"
import { Similar } from "./Similar"
import { useSnackbar } from "burgos-snackbar"

interface ProductPageProps {}

export const ProductPage: React.FC<ProductPageProps> = ({}) => {
    const id_param = useParams().id
    const products = useProduct()
    const categories = useCategory()
    const { snackbar } = useSnackbar()

    if (!id_param || !Number(id_param)) {
        return <Wildcard />
    }

    const product_id = Number(id_param)
    const product = products.find(product_id)

    if (!product) return <Wildcard />

    const images = [getImageUrl(product.cover), ...product.images.map((image) => getImageUrl(image.url))]
    const border = { paddingBottom: "1vw", borderBottomLeftRadius: "5vw", borderBottomRightRadius: "5vw", borderBottom: "1px solid" }

    const onAddToCart = () => {
        snackbar({ severity: "info", text: "vou fazer ainda carai" })
    }

    return (
        <Box sx={{ padding: "5vw 0", alignItems: "center", gap: "5vw", height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
            <Box sx={{ padding: "0 5vw", alignItems: "center", gap: "5vw" }}>
                <Logo size="30vw" />
                <Box
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        padding: "0 5vw",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        ...border
                    }}>
                    {product.name}
                </Box>
                <Carousel
                    showThumbs={false}
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    transitionTime={1000}
                    showStatus={false}
                    //style={{borderRadius: "3vw"}}
                >
                    {images.map((url) => (
                        <Box key={url} sx={{ position: "relative" }}>
                            <Avatar
                                variant="rounded"
                                src={getImageUrl(url)}
                                style={{ width: "100%", height: "auto", aspectRatio: "1/1", borderRadius: "5vw" }}
                            />
                        </Box>
                    ))}
                </Carousel>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <CurrencyText value={product.price} style={{ fontWeight: "bold", fontSize: "1.5rem" }} />
                    <Button variant="outlined" color="success" onClick={onAddToCart}>
                        adicionar ao carrinho
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        padding: "5vw",
                        paddingTop: "5vw",
                        borderTopLeftRadius: "5vw",
                        borderTopRightRadius: "5vw",
                        borderTop: "1px solid",
                        borderBottom: "1px solid",
                        borderBottomLeftRadius: "5vw",
                        borderBottomRightRadius: "5vw"
                    }}>
                    <pre style={{ width: "100%", textAlign: "justify" }}>{product.description}</pre>
                </Box>
            </Box>

            <Box sx={{ gap: "3vw", alignItems: "center" }}>
                <Box
                    sx={{
                        textAlign: "center"
                    }}>
                    mesma categoria
                </Box>
                <Box sx={{ flexDirection: "row", width: "100vw", overflowX: "auto", paddingLeft: "5vw", paddingRight: "10vw", gap: "3vw" }}>
                    {categories.list
                        .filter((category) => product.categories.find((item) => item.id == category.id))
                        .map((category) => (
                            <Box
                                key={category.id}
                                sx={{
                                    flexDirection: "row",
                                    gap: "3vw"
                                }}>
                                {category.products.map((product) => (
                                    <Similar key={product.id} product={product} />
                                ))}
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    )
}

import React, { useEffect, useState } from "react"
import { Autocomplete, Box, Button } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { TextField } from "../../components/TextField"
import { ProductModal } from "./ProductModal"
import { Logo } from "../../components/Logo"
import { useProduct } from "../../hooks/useProduct"
import { ProductContainer } from "./ProductContainer"
import { Search } from "@mui/icons-material"

interface PanelProps {}

export const Panel: React.FC<PanelProps> = ({}) => {
    const { user } = useUser()
    // if (!user) return null
    const product = useProduct()

    const [currentProduct, setCurrentProduct] = useState<Product>()
    const [openProductModal, setOpenProductModal] = useState(false)
    const [filteredProductList, setFilteredProductList] = useState(product.list)

    const onNewProductClick = () => {
        setCurrentProduct(undefined)
        setOpenProductModal(true)
    }

    const onProductClick = (product: Product) => {
        setCurrentProduct(product)
        setOpenProductModal(true)
    }

    const closeModal = () => {
        setCurrentProduct(undefined)
        setOpenProductModal(false)
    }

    const onSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value
        setFilteredProductList(product.list.filter((item) => item.code.includes(value) || item.name.includes(value)))
        console.log(value)
    }

    useEffect(() => {
        setFilteredProductList(product.list)
    }, [product.list])

    return (
        <Box sx={{ padding: "10vw", paddingTop: "5vw", paddingBottom: "10vw", alignItems: "center" }}>
            <Logo size="25vw" />
            <Box sx={{ gap: "5vw", width: "100%" }}>
                <TextField fullWidth label="produto" variant="standard" onChange={onSearch} InputProps={{ endAdornment: <Search /> }} />
                <Button variant="outlined" sx={{ borderStyle: "dashed" }} onClick={onNewProductClick} fullWidth>
                    novo produto
                </Button>
                <Box sx={{ gap: "3vw", overflowY: "auto", maxHeight: "65vh" }}>
                    {filteredProductList
                        .sort((a, b) => a.id - b.id)
                        .map((product) => (
                            <ProductContainer key={product.id} product={product} onClick={() => onProductClick(product)} />
                        ))}
                </Box>
            </Box>

            <ProductModal isOpen={openProductModal} close={closeModal} current_product={currentProduct} />
        </Box>
    )
}

import React, { useState } from "react"
import { Autocomplete, Box, Button } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { TextField } from "../../components/TextField"
import { ProductModal } from "./ProductModal"
import { Logo } from "../../components/Logo"
import { ProductList } from "./ProductList"
import { useProduct } from "../../hooks/useProduct"
import { ProductContainer } from "./ProductContainer"

interface PanelProps {}

export const Panel: React.FC<PanelProps> = ({}) => {
    const { user } = useUser()
    // if (!user) return null
    const product = useProduct()

    const [currentProduct, setCurrentProduct] = useState<Product>()
    const [openProductModal, setOpenProductModal] = useState(false)

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

    return (
        <Box sx={{ padding: "10vw", paddingTop: "5vw", paddingBottom: 0, alignItems: "center" }}>
            <Logo size="25vw" />
            <Box sx={{ gap: "5vw", width: "100%" }}>
                <Autocomplete
                    disablePortal
                    options={product.list}
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    renderInput={(params) => <TextField {...params} label="Produto" />}
                    fullWidth
                />
                <Button variant="outlined" sx={{ borderStyle: "dashed" }} onClick={onNewProductClick} fullWidth>
                    novo produto
                </Button>
                <Box sx={{}}>
                    {product.list
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

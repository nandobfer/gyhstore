import React from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import { getImageUrl } from "../../tools/getImageUrl"

interface ProductContainerProps {
    product: Product
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
    return (
        <Box sx={{ width: "100%" }}>
            {/* <MenuItem sx={{ padding: "5vw", width: "100%", gap: "5vw" }}>
                <Box sx={{ gap: "3vw", overflowY: "auto", maxHeight: "65vh" }}>
                    {filteredProductList
                        .sort((a, b) => a.id - b.id)
                        .map((product) => (
                            <ProductContainer key={product.id} product={product} onClick={() => onProductClick(product)} />
                        ))}
                </Box>
            </MenuItem> */}
        </Box>
    )
}

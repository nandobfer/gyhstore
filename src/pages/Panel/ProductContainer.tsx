import React from 'react'
import { Avatar, Box, Chip, MenuItem } from "@mui/material"
import { BrokenImage } from "@mui/icons-material"
import { getImageUrl } from "../../tools/getImageUrl"
import { CurrencyText } from "../../components/CurrencyText"

interface ProductContainerProps {
    product: Product
    onClick: () => void
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product, onClick }) => {
    return (
        <Box
            sx={{
                flexDirection: "row",
                alignItems: "flex-start",
                maxWidth: "90vw",
                height: "30vw",
                overflow: "hidden"
            }}
            onClick={onClick}>
            <MenuItem
                sx={{
                    gap: "5vw",
                    padding: "0",
                    height: "100%",
                    width: "100%"
                }}>
                <Avatar variant="rounded" src={getImageUrl(product.cover)} sx={{ width: "30vw", height: "30vw" }}>
                    <BrokenImage />
                </Avatar>
                <Box sx={{ gap: "0vw", padding: "3vw 0", height: "100%", width: "40vw" }}>
                    <Box sx={{ flexDirection: "row", gap: "2vw", alignItems: "center", maxWidth: "90vw" }}>{product.name}</Box>
                    <Box sx={{ flexDirection: "row", gap: "1vw", flexWrap: "wrap" }}>
                        {product.categories.map((category) => (
                            <Chip
                                label={category.name}
                                key={category.id}
                                color="secondary"
                                sx={{ width: "max-content", fontSize: "0.7rem", padding: "1vw 2vw", height: "max-content" }}
                            />
                        ))}
                    </Box>

                    {/* <Box sx={{ fontSize: "0.8rem", whiteSpace: "break-spaces", width: "50vw", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {product.description.split("\n")[0]}
                </Box> */}
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: "auto", alignItems: "center" }}>
                        <CurrencyText value={product.price} style={{ fontWeight: "bold" }} />
                        <Box sx={{ fontSize: "0.6rem", color: "secondary.main" }}>{product.code}</Box>
                    </Box>
                </Box>
            </MenuItem>
        </Box>
    )
}
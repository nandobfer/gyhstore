import React from "react"
import { Avatar, Box, Button, MenuItem } from "@mui/material"
import { getImageUrl } from "../../tools/getImageUrl"
import { CurrencyText } from "../../components/CurrencyText"

interface SimilarProps {
    product: Product
}

export const Similar: React.FC<SimilarProps> = ({ product }) => {
    return (
        <MenuItem sx={{ position: "relative", width: "40vw" }}>
            <Avatar variant="rounded" src={getImageUrl(product.cover)} sx={{ width: "40vw", height: "100%", aspectRatio: "1/1" }} />
            <Box sx={{ position: "absolute", width: "100%", height: "100%", alignItems: "center", padding: "3vw", justifyContent: "space-between" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        maxWidth: "max-content",
                        maxHeight: "40%",
                        alignItems: "flex-start",
                        opacity: 0.75,
                        borderRadius: "5vw",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        overflow: "hidden",
                        whiteSpace: "break-spaces",
                        justifyContent: "flex-start"
                    }}>
                    {product.name}
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        opacity: 0.8,
                        borderRadius: "5vw",
                        fontWeight: "bold",
                        maxWidth: "max-content",
                        alignSelf: "flex-end",
                        fontSize: "0.7rem"
                    }}>
                    <CurrencyText value={product.price} />
                </Button>
            </Box>
        </MenuItem>
    )
}

import React from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import { BrokenImage } from "@mui/icons-material"
import { getImageUrl } from "../../tools/getImageUrl"

interface CategoryContainerProps {
    category: Category
    onClick: () => void
}

export const CategoryContainer: React.FC<CategoryContainerProps> = ({ category, onClick }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <MenuItem sx={{ gap: "5vw" }} onClick={onClick}>
                <Avatar src={getImageUrl(category.cover)}>
                    <BrokenImage />
                </Avatar>
                <Box>{category.name}</Box>
                <Box
                    sx={{
                        borderRadius: "100%",
                        bgcolor: "secondary.main",
                        minWidth: "5vw",
                        height: "5vw",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "0.8rem",
                        marginLeft: "auto",
                        fontWeight: "bold"
                    }}>
                    {category.products.length}
                </Box>
            </MenuItem>
        </Box>
    )
}

import React from "react"
import { Box } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useProduct } from "../../hooks/useProduct"
import { useCategory } from "../../hooks/useCategory"
import { useSnackbar } from "burgos-snackbar"
import { Wildcard } from "../Wilcard"
import { Logo } from "../../components/Logo"
import { ProductContainer } from "../Panel/ProductContainer"

interface CategoryPageProps {}

export const CategoryPage: React.FC<CategoryPageProps> = ({}) => {
    const id_param = useParams().id
    const products = useProduct()
    const categories = useCategory()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()

    if (!id_param || !Number(id_param)) {
        return <Wildcard />
    }

    const category_id = Number(id_param)
    const category = categories.find(category_id)

    if (!category) return <Wildcard />

    return (
        <Box sx={{ padding: "10vw 0", alignItems: "center", height: "100vh", overflowY: "auto", gap: "3vw" }}>
            <Logo size="30vw" />
            {category.products.map((product) => (
                <ProductContainer key={product.id} product={product} onClick={() => navigate(`/product/${product.id}`)} hide_categories />
            ))}
        </Box>
    )
}

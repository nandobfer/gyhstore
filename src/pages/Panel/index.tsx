import React, { useEffect, useState } from "react"
import { Autocomplete, Box, Button, Tab, Tabs } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { TextField } from "../../components/TextField"
import { ProductModal } from "./ProductModal"
import { Logo } from "../../components/Logo"
import { useProduct } from "../../hooks/useProduct"
import { ProductContainer } from "./ProductContainer"
import { Search } from "@mui/icons-material"
import { useCategory } from "../../hooks/useCategory"
import { CategoryModal } from "./CategoryModal"
import { CategoryContainer } from "./CategoryContainer"

interface PanelProps {}

export const Panel: React.FC<PanelProps> = ({}) => {
    const { user } = useUser()
    // if (!user) return null
    const product = useProduct()
    const category = useCategory()

    const [currentProduct, setCurrentProduct] = useState<Product>()
    const [openProductModal, setOpenProductModal] = useState(false)
    const [openCategoryModal, setOpenCategoryModal] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<Category>()
    const [filteredProductList, setFilteredProductList] = useState(product.list)
    const [filteredCategory, setFilteredCategory] = useState(category.list)
    const [currentTab, setCurrentTab] = useState(0)

    const onNewProductClick = () => {
        setCurrentProduct(undefined)
        setOpenProductModal(true)
    }

    const onProductClick = (product: Product) => {
        setCurrentProduct(product)
        setOpenProductModal(true)
    }
    const onNewCategoryClick = () => {
        setCurrentCategory(undefined)
        setOpenCategoryModal(true)
    }

    const onCategoryClick = (category: Category) => {
        setCurrentCategory(category)
        setOpenCategoryModal(true)
    }

    const closeCategoryModal = () => {
        setCurrentCategory(undefined)
        setOpenCategoryModal(false)
    }

    const closeProductModal = () => {
        setCurrentProduct(undefined)
        setOpenProductModal(false)
    }

    const onProductSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value
        setFilteredProductList(product.list.filter((item) => item.code.includes(value) || item.name.includes(value)))
        console.log(value)
    }

    const onCategorySearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value
        setFilteredCategory(category.list.filter((item) => item.name.includes(value)))
        console.log(value)
    }

    useEffect(() => {
        setFilteredProductList(product.list)
    }, [product.list])

    useEffect(() => {
        setFilteredCategory(category.list)
    }, [category.list])

    return (
        <Box sx={{ padding: "10vw", paddingTop: "5vw", paddingBottom: "10vw", alignItems: "center" }}>
            <Logo size="25vw" />
            {currentTab == 0 && (
                <Box sx={{ gap: "5vw", width: "100%" }}>
                    <TextField fullWidth label="produto" variant="standard" onChange={onProductSearch} InputProps={{ endAdornment: <Search /> }} />
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
            )}
            {currentTab == 1 && (
                <Box sx={{ gap: "5vw", width: "100%" }}>
                    <TextField fullWidth label="categoria" variant="standard" onChange={onCategorySearch} InputProps={{ endAdornment: <Search /> }} />
                    <Button variant="outlined" sx={{ borderStyle: "dashed" }} onClick={onNewCategoryClick} fullWidth>
                        nova categoria
                    </Button>
                    <Box sx={{ overflowY: "auto", maxHeight: "65vh" }}>
                        {filteredCategory
                            .sort((a, b) => a.id - b.id)
                            .map((category) => (
                                <CategoryContainer key={category.id} category={category} onClick={() => onCategoryClick(category)} />
                            ))}
                    </Box>
                </Box>
            )}

            <ProductModal isOpen={openProductModal} close={closeProductModal} current_product={currentProduct} />
            <CategoryModal isOpen={openCategoryModal} onClose={closeCategoryModal} current_category={currentCategory} />
            <Tabs
                variant="fullWidth"
                sx={{ width: "100%", position: "absolute", bottom: 0 }}
                value={currentTab}
                onChange={(_, value) => setCurrentTab(value)}>
                <Tab label="produtos" value={0} />
                <Tab label="categorias" value={1} />
            </Tabs>
        </Box>
    )
}

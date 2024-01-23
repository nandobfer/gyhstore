import React from "react"
import { Routes as ReacRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Panel } from "./pages/Panel"
import { ProductPage } from "./pages/Product"
import { Wildcard } from "./pages/Wilcard"
import { CategoryPage } from "./pages/Category"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <ReacRoutes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="*" element={<Wildcard />} />
        </ReacRoutes>
    )
}

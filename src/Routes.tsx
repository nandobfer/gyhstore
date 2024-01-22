import React from "react"
import { Routes as ReacRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Panel } from "./pages/Panel"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <ReacRoutes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="*" element={<Home />} />
        </ReacRoutes>
    )
}

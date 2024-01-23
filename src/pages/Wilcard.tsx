import React from "react"
import { Box, Button } from "@mui/material"
import { Logo } from "../components/Logo"
import { useNavigate } from "react-router-dom"

interface WildcardProps {}

export const Wildcard: React.FC<WildcardProps> = ({}) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ padding: "10vw", alignItems: "center", gap: "5vw", height: "100vh" }}>
            <Logo />
            <Box sx={{ fontSize: "3rem" }}>404</Box>
            <Box sx={{ fontSize: "1.5rem" }}>página não encontrada</Box>
            <Button variant="outlined" onClick={() => navigate("/")}>
                ir para o inicio
            </Button>
        </Box>
    )
}

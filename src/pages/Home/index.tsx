import React from "react"
import { Box } from "@mui/material"
import { Logo } from "../../components/Logo"
import { Categories } from "./Categories"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <Box sx={{ width: "100%", height: "100vh", padding: "10vw", alignItems: "center", overflowY: "auto", gap: "5vw" }}>
            <Logo />
            {/* <Categories /> */}
        </Box>
    )
}

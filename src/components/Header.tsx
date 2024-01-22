import React from "react"
import { Box, IconButton } from "@mui/material"
import { Menu, Person } from "@mui/icons-material"
import { useMenu } from "../hooks/useMenu"
import { useNavigate } from "react-router-dom"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const menu = useMenu()
    const navigate = useNavigate()


    return (
        <Box
            sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "5vw",
                paddingBottom: 0,
                position: "absolute",
                zIndex: 5,
                width: "100vw"
            }}>
            <IconButton color="primary" onClick={() => menu.drawer.toogle()}>
                <Menu fontSize="large" />
            </IconButton>

            <IconButton color="primary" onClick={() => navigate('/login')}>
                <Person fontSize="large" />
            </IconButton>
        </Box>
    )
}

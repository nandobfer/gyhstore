import React from 'react'
import { Avatar, Box, useMediaQuery } from "@mui/material"

interface LogoProps {
    size?: string
}

export const Logo: React.FC<LogoProps> = ({size}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")

    return (
        <Avatar src='/logo.webp' sx={{width: size || '100%', height: 'auto'}} variant='square'>
        </Avatar>
    )
}
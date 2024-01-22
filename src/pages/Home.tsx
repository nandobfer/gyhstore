import React from 'react'
import {Box} from '@mui/material'
import { Logo } from '../components/Logo'

interface HomeProps {
    
}

export const Home:React.FC<HomeProps> = ({  }) => {
    
    return (
        <Box sx={{width: '100%', height: '100%', padding: '10vw', alignItems: 'center'}}>
            <Logo />
        </Box>
    )
}
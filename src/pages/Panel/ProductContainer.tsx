import React from 'react'
import {Avatar, Box, MenuItem} from '@mui/material'
import { BrokenImage } from '@mui/icons-material'
import { url } from '../../backend'
import { getImageUrl } from '../../tools/getImageUrl'
import { CurrencyText } from '../../components/CurrencyText'

interface ProductContainerProps {
    product: Product
    onClick: () => void
}

export const ProductContainer:React.FC<ProductContainerProps> = ({ product, onClick }) => {
    
    return (
        <MenuItem sx={{flexDirection: 'row', padding: '0', gap: '5vw', alignItems: 'flex-start', maxWidth: '90vw', maxHeight: '30vw'}} onClick={onClick}>
            <Avatar variant='rounded' src={getImageUrl(product.images[0].url)} sx={{width: '30vw', height: 'auto'}}>
                <BrokenImage />
            </Avatar>
            <Box sx={{gap: '3vw', padding: '3vw 0'}}>
                <Box sx={{flexDirection: 'row', gap: '2vw', alignItems: 'center', maxWidth: '90vw'}}>{product.name}
                    <Box sx={{fontSize: '0.6rem', color: 'secondary.main', }}>{ product.code }</Box>
                </Box>

                <Box sx={{fontSize: '0.8rem',  whiteSpace: 'break-spaces', width: '50vw', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                    {product.description.split('\n')[0]}
                </Box>
                <CurrencyText value={product.price} />
            </Box>
        </MenuItem>
    )
}
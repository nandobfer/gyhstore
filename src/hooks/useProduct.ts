import { useContext } from 'react'
import ProductContext from '../contexts/productContext'

export const useProduct = () => {
    const productContext = useContext(ProductContext);

    return {...productContext}
}
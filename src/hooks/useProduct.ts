import { useContext } from 'react'
import ProductContext from '../contexts/productContext'

export const useProduct = () => {
    const productContext = useContext(ProductContext);

    const find = (id: number) => productContext.list.find((item) => item.id == id)

    return { ...productContext, find }
}
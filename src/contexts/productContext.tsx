import { createContext, useEffect, useState } from 'react';
import React from 'react';
import { useIo } from '../hooks/useIo';

interface ProductContextValue {
    list: Product[]
    update: (product: Product) => void
    remove: (product: Product) => void
}

interface ProductProviderProps {
    children: React.ReactNode
}

const ProductContext = createContext<ProductContextValue>({} as ProductContextValue);

export default ProductContext;

export const ProductProvider:React.FC<ProductProviderProps> = ({children}) => {
    const io = useIo()
    const [list, setList] = useState<Product[]>([])

    const update = (product: Product) => {
        setList(list => [...list.filter(item => item.id != product.id), product])
    }

    const remove = (product: Product) => {
        setList(list => list.filter(item => item.id != product.id))
    }

    useEffect(() => {
        console.log(list)

        io.on('gyh:product:update', (product: Product) => {
            update(product)
        })

        io.on('gyh:product:delete', (product:Product) => remove(product))

        return () => {
            io.off('gyh:product:update')
            io.off('gyh:product:delete')
        }
    }, [list])

    useEffect(() => {
        io.emit('gyh:product:list')
        io.on('gyh:product:list', (products: Product[]) => {
            setList(products)
        })

        return () => {
            io.off('gyh:product:list')
        }
    }, [])

    return (
         <ProductContext.Provider value={{ list, update, remove }}>
              {children}
         </ProductContext.Provider>
    )
}
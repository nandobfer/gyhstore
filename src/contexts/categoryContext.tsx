import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useProduct } from "../hooks/useProduct"

interface CategoryContextValue {
    list: Category[]
    setList: (value: Category[]) => void
    update: (category: Category) => void
    remove: (category: Category) => void
}

interface CategoryProviderProps {
    children: React.ReactNode
}

const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue)

export default CategoryContext

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const io = useIo()
    const products = useProduct()

    const [list, setList] = useState<Category[]>([])

    const update = (category: Category) => {
        setList((list) => [...list.filter((item) => item.id != category.id), category])
        const category_products = products.list.filter((product) => product.categories.find((item) => item.id == category.id))
        category_products.map((product) => {
            products.update({ ...product, categories: [...product.categories.filter((item) => item.id != category.id), category] })
        })
    }

    const remove = (category: Category) => {
        setList((list) => list.filter((item) => item.id != category.id))
    }

    useEffect(() => {
        console.log(list)

        io.on("gyh:category:update", (category: Category) => {
            update(category)
        })

        io.on("gyh:category:delete", (category: Category) => remove(category))

        return () => {
            io.off("gyh:category:update")
            io.off("gyh:category:delete")
        }
    }, [list])

    useEffect(() => {
        io.emit("gyh:category:list")

        io.on("gyh:category:list", (categories) => setList(categories))

        return () => {
            io.off("gyh:category:list")
        }
    }, [])

    return <CategoryContext.Provider value={{ list, setList, update, remove }}>{children}</CategoryContext.Provider>
}

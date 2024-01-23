import { useContext } from "react"
import CategoryContext from "../contexts/categoryContext"

export const useCategory = () => {
    const categoryContext = useContext(CategoryContext)

    const find = (id: number) => categoryContext.list.find((item) => item.id == id)

    return { ...categoryContext, find }
}

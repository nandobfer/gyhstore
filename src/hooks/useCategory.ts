import { useContext } from "react"
import CategoryContext from "../contexts/categoryContext"

export const useCategory = () => {
    const categoryContext = useContext(CategoryContext)

    return { ...categoryContext }
}

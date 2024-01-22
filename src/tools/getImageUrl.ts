import { url } from "../backend"

export const getImageUrl = (product_url: string) => {
    if (product_url.includes('http')) return product_url

    return `http${url}/static/${product_url}`
}
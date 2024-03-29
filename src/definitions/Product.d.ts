declare interface ProductForm {
    name: string
    description: string
    code: string
    price: string
    images: Image[]
    cover: Image
    urls: string[]
    categories: number[]
}

declare interface Product {
    id: number
    name: string
    description: string
    code: string
    price: number
    cover: string

    images: Image[]
    categories: Category[]
}

declare interface Image {
    id: number
    url: string
    product_id: number
}

declare interface ImageForm {
    file: File
    name: string
}
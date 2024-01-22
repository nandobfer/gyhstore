declare interface ProductForm {
    name: string
    description: string
    code: string
    price: string
    images: Image[]
    urls: string[]
}

declare interface Product {
    id: number
    name: string
    description: string
    code: string
    price: number
    images: Image[]
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
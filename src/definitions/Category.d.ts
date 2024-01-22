declare interface Category {
    id: number
    name: string
    cover: string
    products: Product[]
}

declare interface CategoryForm {
    name: string
    cover: Image
}

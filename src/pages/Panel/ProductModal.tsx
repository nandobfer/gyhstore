import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tab, Tabs } from "@mui/material"
import { useFormik } from "formik"
import { Form } from "../../components/Form"
import { TextField } from "../../components/TextField"
import { Avatar, Dropzone, ExtFile, FileInputButton, FileMosaic } from "@files-ui/react"
import { useIo } from "../../hooks/useIo"
import { useProduct } from "../../hooks/useProduct"
import { useSnackbar } from "burgos-snackbar"
import MaskedInput from "../../components/MaskedInput"
import masks from "../../tools/masks"
import { useCurrencyMask } from "burgos-masks"
import { useConfirmDialog } from "burgos-confirm"
import { getImageUrl } from "../../tools/getImageUrl"
import { colors } from "../../style/colors"
import { Close } from "@mui/icons-material"
import { InfoTab } from "./InfoTab"
import { GalleryTab } from "./GalleryTab"

interface ProductModalProps {
    isOpen: boolean
    close: () => void

    current_product?: Product
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, close, current_product }) => {
    const io = useIo()

    const { update: updateProduct, remove } = useProduct()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [loading, setLoading] = useState(false)
    const [currentTab, setCurrentTab] = useState(1)
    const [images, setImages] = useState<ExtFile[]>([])
    const [currentImages, setCurrentImages] = useState(current_product?.images || [])
    const [cover, setCover] = useState<File>()

    const formik = useFormik<ProductForm>({
        initialValues: current_product
            ? {
                  ...current_product,
                  price: current_product?.price.toString().replace(".", ","),
                  urls: [],
                  cover: { id: 0, product_id: 0, url: current_product.cover },
                  categories: current_product.categories.map((category) => category.id)
              }
            : {
                  name: "",
                  code: "",
                  price: "",
                  description: "",
                  cover: { id: 0, product_id: 0, url: "" },
                  images: [],
                  urls: [],
                  categories: []
              },
        onSubmit: (values) => {
            if (loading) return
            if (!values.cover.file && !current_product?.cover) {
                snackbar({ severity: "warning", text: "envie uma imagem de capa" })
                return
            }
            // if (!values.images.length) {
            //     snackbar({ severity: "warning", text: "envie pelo menos uma imagem" })
            //     return
            // }

            setLoading(true)

            const data = {
                ...values,
                price: Number(
                    values.price
                        .replace(".", "")
                        .replace(",", ".")
                        .replace(/[^0-9\.]/g, "")
                ),
                urls: values.images.filter((item) => item.url).map((item) => item.url),
                images: values.images.filter((item) => !item.url),

                id: 0
            }
            console.log(data)

            io.emit(current_product ? "gyh:product:update" : "gyh:product:create", data, current_product?.id)
        },
        enableReinitialize: true
    })

    const onClose = () => {
        close()
        setImages([])
        setCurrentImages([])
        setCover(undefined)
    }

    const onDelete = (product: Product) => {
        confirm({
            title: "deletar produto",
            content: "tem certeza que deseja deletar esse produto?",
            onConfirm: () => {
                io.emit("gyh:product:delete", product.id)
            }
        })
    }

    const onProductUpdate = (product: Product) => {
        onClose()
        updateProduct(product)
        formik.resetForm()
    }

    useEffect(() => {
        const images_data: ImageForm[] = images.map((image) => ({ file: image.file!, name: image.name! }))

        formik.setFieldValue("images", [...currentImages, ...images_data])
    }, [images])

    useEffect(() => {
        io.on("gyh:product:create", (product?: Product) => {
            if (product) {
                onProductUpdate(product)
                snackbar({ severity: "success", text: "produto adicionado" })
            } else {
                snackbar({ severity: "error", text: "erro ao adicionar produto" })
            }
            setLoading(false)
        })

        io.on("gyh:product:update:success", (product?: Product) => {
            if (product) {
                onProductUpdate(product)
                snackbar({ severity: "info", text: "produto atualizado" })
            } else {
                snackbar({ severity: "error", text: "erro ao adicionar produto" })
            }
            setLoading(false)
        })

        io.on("gyh:product:delete:success", (product: Product) => {
            onClose()
            remove(product)
        })

        return () => {
            io.off("gyh:product:create")
            io.off("gyh:product:update:success")
            io.off("gyh:product:delete:success")
        }
    }, [])

    useEffect(() => {
        if (current_product) setCurrentImages(current_product.images)
    }, [current_product])

    useEffect(() => {
        formik.setFieldValue("images", currentImages)
    }, [currentImages])

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{
                justifyContent: "center"
            }}
            PaperProps={{
                sx: {
                    minWidth: "90vw",
                    height: "70vh"
                }
            }}>
            <IconButton sx={{ position: "absolute", right: "3vw", top: "3vw" }} color="secondary" onClick={onClose}>
                <Close />
            </IconButton>
            <DialogTitle>{current_product ? "editar produto" : "novo produto"}</DialogTitle>
            <DialogContent sx={{ maxWidth: "90vw" }}>
                <Form onSubmit={formik.handleSubmit} sx={{ gap: "5vw", height: "100%" }}>
                    <Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)} variant="fullWidth">
                        <Tab label="informações" value={1} />
                        <Tab label="galeria" value={2} />
                    </Tabs>

                    {currentTab === 1 && <InfoTab formik={formik} />}
                    {currentTab === 2 && (
                        <GalleryTab
                            formik={formik}
                            currentImages={currentImages}
                            images={images}
                            setCurrentImages={setCurrentImages}
                            setImages={setImages}
                            current_product={current_product}
                            cover={cover}
                            setCover={setCover}
                        />
                    )}

                    <Box sx={{ flexDirection: "row", gap: "5vw", marginTop: "auto" }}>
                        {current_product && (
                            <Button variant="outlined" color="secondary" fullWidth onClick={() => onDelete(current_product)}>
                                excluir
                            </Button>
                        )}
                        <Button variant="outlined" type="submit" fullWidth>
                            {loading ? <CircularProgress size="1.5rem" color="primary" /> : current_product ? "salvar" : "criar"}
                        </Button>
                    </Box>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { Form } from "../../components/Form"
import { useFormik } from "formik"
import { TextField } from "../../components/TextField"
import { Avatar } from "@files-ui/react"
import { getImageUrl } from "../../tools/getImageUrl"
import { useIo } from "../../hooks/useIo"
import { useCategory } from "../../hooks/useCategory"
import { useSnackbar } from "burgos-snackbar"
import { Close } from "@mui/icons-material"
import { useConfirmDialog } from "burgos-confirm"

interface CategoryModalProps {
    isOpen: boolean
    onClose: () => void
    current_category?: Category
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, current_category }) => {
    const io = useIo()
    const categories = useCategory()

    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [cover, setCover] = useState<File>()
    const [loading, setLoading] = useState(false)

    const formik = useFormik<CategoryForm>({
        initialValues: current_category
            ? { name: current_category.name, cover: { id: 0, product_id: 0, url: current_category.cover } }
            : {
                  cover: { id: 0, product_id: 0, url: "" },
                  name: ""
              },
        onSubmit(values, formikHelpers) {
            if (loading) return

            setLoading(true)
            console.log(values)
            io.emit(current_category ? "gyh:category:update" : "gyh:category:new", values, current_category?.id)
        },
        enableReinitialize: true
    })

    const onCoverChange = (image: File) => {
        setCover(image)
        formik.setFieldValue("cover", { file: image, name: image.name })
    }

    const close = () => {
        onClose()
        setLoading(false)
        setCover(undefined)
        formik.resetForm()
    }

    const onDelete = () => {
        confirm({
            title: "deletar categoria",
            content: "tem certeza que deseja deletar a categoria?",
            onConfirm: () => {
                io.emit("gyh:category:delete", current_category?.id)
            }
        })
    }

    useEffect(() => {
        io.on("gyh:category:new:success", (category) => {
            categories.update(category)
            snackbar({ severity: "success", text: "categoria criada com sucesso" })
            close()
        })

        io.on("gyh:category:update:success", (category) => {
            categories.update(category)
            snackbar({ severity: "info", text: "categoria atualizada" })
            close()
        })

        io.on("gyh:category:delete:success", (category) => {
            categories.remove(category)
            snackbar({ severity: "warning", text: "categoria deletada" })
            close()
        })

        io.on("gyh:category:new:error", (error) => {
            snackbar({ severity: "error", text: "erro ao criar categoria" })
            setLoading(false)
        })

        io.on("gyh:category:delete:error", (error) => {
            snackbar({ severity: "error", text: "erro ao deletar categoria" })
            setLoading(false)
        })

        io.on("gyh:category:update:error", (error) => {
            snackbar({ severity: "error", text: "erro ao atualizar categoria" })
            setLoading(false)
        })

        return () => {
            io.off("gyh:category:new:success")
            io.off("gyh:category:new:error")
            io.off("gyh:category:delete:success")
            io.off("gyh:category:delete:error")
            io.off("gyh:category:update:success")
            io.off("gyh:category:update:error")
        }
    }, [])

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={
                {
                    // justifyContent: "center"
                }
            }
            PaperProps={{
                sx: {
                    // minWidth: "90vw",
                    minHeight: "45vh"
                }
            }}>
            <IconButton sx={{ position: "absolute", right: "3vw", top: "3vw" }} color="secondary" onClick={close}>
                <Close />
            </IconButton>
            <DialogTitle sx={{ paddingBottom: 0 }}>{current_category ? "editar categoria" : "nova categoria"}</DialogTitle>
            <Form onSubmit={formik.handleSubmit} sx={{ gap: "5vw" }}>
                <DialogContent sx={{ paddingTop: 0 }}>
                    <Box sx={{ width: "100%", alignItems: "center", gap: "5vw" }}>
                        <TextField label="nome" value={formik.values.name} name="name" onChange={formik.handleChange} required fullWidth />
                        <Avatar
                            src={cover || (current_category && getImageUrl(current_category?.cover || ""))}
                            style={{ width: "25vh", height: "25vh" }}
                            changeLabel="trocar capa"
                            emptyLabel="imagem de capa"
                            onChange={onCoverChange}
                        />
                        <Box sx={{ width: "100%", flexDirection: "row", gap: "5vw" }}>
                            {current_category && (
                                <Button variant="outlined" color="secondary" onClick={onDelete}>
                                    deletar
                                </Button>
                            )}
                            <Button variant="outlined" type="submit" fullWidth>
                                {loading ? <CircularProgress size="1.5rem" color="primary" /> : current_category ? "salvar" : "criar"}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Form>
        </Dialog>
    )
}

import React, { useState } from "react"
import { Box } from "@mui/material"
import { Avatar, ExtFile, FileInputButton, FileMosaic } from "@files-ui/react"
import { getImageUrl } from "../../tools/getImageUrl"
import { colors } from "../../style/colors"
import { FormikErrors } from "formik"

interface GalleryTabProps {
    formik: {
        values: ProductForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ProductForm>>
    }
    currentImages: Image[]
    setCurrentImages: React.Dispatch<React.SetStateAction<Image[]>>
    images: ExtFile[]
    setImages: React.Dispatch<React.SetStateAction<ExtFile[]>>

    cover?: File
    setCover: React.Dispatch<React.SetStateAction<File | undefined>>

    current_product?: Product
}

export const GalleryTab: React.FC<GalleryTabProps> = ({
    formik,
    currentImages,
    setCurrentImages,
    images,
    setImages,
    current_product,
    cover,
    setCover
}) => {
    const deleteImage = (file: ExtFile) => {
        setImages((list) => list.filter((item) => item.id != file.id))
    }

    const onCoverChange = (image: File) => {
        setCover(image)
        formik.setFieldValue("cover", { file: image, name: image.name })
    }

    return (
        <>
            <Box
                sx={{
                    flexDirection: "row",
                    gap: "5vw",
                    padding: "5vw",
                    borderRadius: "2vw",
                    width: "100%",
                    height: "40vh",
                    overflowY: "auto",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                    outlineStyle: "dashed",
                    outlineWidth: "0.5vw",
                    flexWrap: "wrap"
                }}>
                <Avatar
                    src={cover || (current_product && getImageUrl(current_product?.cover || ""))}
                    style={{ width: "30vw", height: "30vw" }}
                    changeLabel="trocar capa"
                    emptyLabel="imagem de capa"
                    onChange={onCoverChange}
                />
                {currentImages?.map((file) => (
                    <Avatar
                        key={file.url}
                        src={getImageUrl(file.url)}
                        style={{ width: "30vw", height: "30vw" }}
                        changeLabel="deletar imagem"
                        onClick={(event) => {
                            event.preventDefault()
                            setCurrentImages(currentImages.filter((item) => item.id != file.id))
                        }}
                    />
                ))}
                {images.map((file) => (
                    <FileMosaic
                        key={file.id}
                        {...file}
                        preview
                        valid={undefined}
                        onDelete={() => deleteImage(file)}
                        // info={true}
                        darkMode
                        style={{ width: "30vw", height: "30vw" }}
                    />
                ))}
            </Box>
            <FileInputButton
                onChange={(files) => setImages((images) => [...images, ...files])}
                value={images}
                behaviour="replace"
                label="enviar imagens"
                accept="image/*"
                color={colors.secondary}
                style={{ width: "100%", padding: "2vw", color: colors.primary, textTransform: "none" }}
            />
        </>
    )
}

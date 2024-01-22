import React from "react"
import { Box } from "@mui/material"
import { Avatar, ExtFile, FileInputButton, FileMosaic } from "@files-ui/react"
import { getImageUrl } from "../../tools/getImageUrl"
import { colors } from "../../style/colors"

interface GalleryTabProps {
    formik: { values: ProductForm; handleChange: (e: React.ChangeEvent<any>) => void }
    currentImages: Image[]
    setCurrentImages: React.Dispatch<React.SetStateAction<Image[]>>
    images: ExtFile[]
    setImages: React.Dispatch<React.SetStateAction<ExtFile[]>>
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ formik, currentImages, setCurrentImages, images, setImages }) => {
    const deleteImage = (file: ExtFile) => {
        setImages((list) => list.filter((item) => item.id != file.id))
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
                    maxHeight: "50vw",
                    minHeight: "50vw",
                    overflowY: "auto",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                    outlineStyle: "dashed",
                    outlineWidth: "0.5vw",
                    flexWrap: "wrap"
                }}>
                {currentImages?.map((file) => (
                    <Avatar
                        key={file.url}
                        src={getImageUrl(file.url)}
                        style={{ width: "30vw", height: "30vw" }}
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
                label="enviar imagem"
                accept="image/*"
                color={colors.secondary}
                style={{ width: "100%", padding: "2vw", color: colors.primary, textTransform: "none" }}
            />
        </>
    )
}

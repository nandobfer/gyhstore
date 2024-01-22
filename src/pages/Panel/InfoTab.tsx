import React, { useState } from "react"
import { Box, Checkbox, Grid, IconButton, MenuItem } from "@mui/material"
import { TextField } from "../../components/TextField"
import MaskedInput from "../../components/MaskedInput"
import { useCurrencyMask } from "burgos-masks"
import { useCategory } from "../../hooks/useCategory"
import { Add } from "@mui/icons-material"
import { CategoryModal } from "./CategoryModal"

interface InfoTabProps {
    formik: { values: ProductForm; handleChange: (e: React.ChangeEvent<any>) => void }
}

export const InfoTab: React.FC<InfoTabProps> = ({ formik }) => {
    const currency_mask = useCurrencyMask()
    const category = useCategory()

    const [categoryModal, setCategoryModal] = useState(false)

    return (
        <>
            <TextField label="nome" value={formik.values.name} name="name" onChange={formik.handleChange} required />
            <Grid container columns={2} spacing={2}>
                <Grid item xs={1}>
                    <TextField label="código" value={formik.values.code} name="code" onChange={formik.handleChange} required />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        label="preço"
                        value={formik.values.price}
                        name="price"
                        onChange={formik.handleChange}
                        required
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: currency_mask, inputMode: "numeric" }
                        }}
                    />
                </Grid>
            </Grid>

            <TextField
                label="descrição"
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                required
                multiline
                minRows={5}
            />

            <TextField
                select
                SelectProps={{
                    renderValue: (selected: number[]) =>
                        category.list
                            .filter((item) => selected.includes(item.id))
                            .map((item) => item.name)
                            .join(", "),
                    multiple: true,
                    MenuProps: { MenuListProps: { sx: { width: "100%" } } }
                }}
                name="categories"
                value={formik.values.categories}
                onChange={formik.handleChange}
                label="categorias"
                InputProps={{
                    endAdornment: (
                        <IconButton color="primary" onClick={() => setCategoryModal(true)}>
                            <Add />
                        </IconButton>
                    )
                }}>
                {category.list.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        <Checkbox checked={formik.values.categories.includes(category.id)} />
                        {category.name}
                    </MenuItem>
                ))}
            </TextField>
            <CategoryModal isOpen={categoryModal} onClose={() => setCategoryModal(false)} />
        </>
    )
}

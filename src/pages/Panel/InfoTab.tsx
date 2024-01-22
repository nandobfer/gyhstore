import React from "react"
import { Box, Grid } from "@mui/material"
import { TextField } from "../../components/TextField"
import MaskedInput from "../../components/MaskedInput"
import { useCurrencyMask } from "burgos-masks"

interface InfoTabProps {
    formik: { values: ProductForm; handleChange: (e: React.ChangeEvent<any>) => void }
}

export const InfoTab: React.FC<InfoTabProps> = ({ formik }) => {
    const currency_mask = useCurrencyMask()

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
        </>
    )
}

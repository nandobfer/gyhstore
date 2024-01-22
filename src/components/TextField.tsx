import React from "react"
import { TextFieldProps, TextField as MuiTextField } from "@mui/material"

export const TextField: React.FC<TextFieldProps> = (props) => {
    return (
        <MuiTextField
            {...props}
            variant={props.variant || "standard"}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "secondary.main"
                    }
                },
                "& .MuiInput-underline:before": {
                    borderBottomColor: "secondary.main"
                },

                // "& .MuiIconButton-root": {
                //     color: 'secondary.main'
                // },
                ...props.sx
            }}
            inputProps={{
                autoComplete: "new-password",
                ...props.inputProps
            }}
        />
    )
}

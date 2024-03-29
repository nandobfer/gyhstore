import React from "react"
import { Box, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "burgos-snackbar"
import { ConfirmDialogProvider } from "burgos-confirm"
import { IoProvider } from "./contexts/ioContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { BrowserRouter } from "react-router-dom"
import { MenuProvider } from "./contexts/menuContext"
import { UserProvider } from "./contexts/userContext"
import { ProductProvider } from "./contexts/productContext"
import { CategoryProvider } from "./contexts/categoryContext"

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const mui_theme = useMuiTheme()

    return (
        <BrowserRouter>
            <ThemeProvider theme={mui_theme}>
                <SnackbarProvider>
                    <ConfirmDialogProvider>
                        <IoProvider>
                            <UserProvider>
                                <ProductProvider>
                                    <CategoryProvider>
                                        <MenuProvider>{children}</MenuProvider>
                                    </CategoryProvider>
                                </ProductProvider>
                            </UserProvider>
                        </IoProvider>
                    </ConfirmDialogProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

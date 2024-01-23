import { Snackbar } from "burgos-snackbar"
import { Providers } from "./Providers"
import { ConfirmDialog } from "burgos-confirm"
import { Box, Paper } from "@mui/material"
import { Routes } from "./Routes"
import { MenuDrawer } from "./components/MenuDrawer"
import { Header } from "./components/Header"

const App: React.FC = () => {
    return (
        <Providers>
            <Paper sx={{ width: "100vw", height: "--webkit", flexDirection: "column", borderRadius: 0 }}>
                <Header />
                <Routes />
            </Paper>
            <Snackbar />
            <ConfirmDialog />
            <MenuDrawer />
        </Providers>
    )
}

export default App

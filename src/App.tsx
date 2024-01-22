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
            <Paper sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
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

import React from "react"
import { Avatar, Box, Drawer, MenuItem, SwipeableDrawer, SxProps } from "@mui/material"
import { useMenu } from "../../hooks/useMenu"
import { MenuButton } from "./MenuButton"
import { useMediaQuery } from "@mui/material"
import { backdropStyle } from "../../style/backdrop"
import { Logo } from "../Logo"
import { useUser } from "../../hooks/useUser"

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({}) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    const { drawer } = useMenu()
    const {user} = useUser()

    return (
        <Drawer
            // onOpen={() => drawer.toogle()}y
            anchor={"left"}
            keepMounted
            open={drawer.open}
            onClose={drawer.close}
            PaperProps={{ sx: { width: isMobile ? "80vw" : "22vw", backgroundColor: "background.paper", paddingTop: isMobile ? "6vw" : "" } }}
            ModalProps={{ BackdropProps: { sx: backdropStyle }, keepMounted: true }}
        >
            <Box
                sx={{ padding: isMobile ? "6vw" : "2vw", flexDirection: "column", gap: "1vw", width: "100%", alignItems: "center" }}
                color={"text.secondary"}
            >
                <Logo />
            </Box>
            <Box sx={{ flexDirection: "column", height: "80%" }}>
                {drawer.menus.map((menu) => (
                    <MenuButton
                        sx={{ fontSize: isMobile ? "4vw" : "1vw", display: menu.admin ? (user ? "" : "none") : ""  }}
                        menu={menu}
                        key={menu.id}
                    />
                ))}
            </Box>
        </Drawer>
    )
}

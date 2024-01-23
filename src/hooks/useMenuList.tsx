import HomeIcon from "@mui/icons-material/Home"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SettingsIcon from "@mui/icons-material/Settings"
import Groups3Icon from "@mui/icons-material/Groups3"
import BusinessIcon from "@mui/icons-material/Business"
import CategoryIcon from "@mui/icons-material/Category"
import BarChartIcon from "@mui/icons-material/BarChart"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { useNavigate } from "react-router-dom"
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated"
import NewReleasesIcon from "@mui/icons-material/NewReleases"
import { Avatar, Badge, BadgeProps, styled } from "@mui/material"
import ApiIcon from "@mui/icons-material/Api"
import PaletteIcon from "@mui/icons-material/Palette"
import { Login } from "@mui/icons-material"
import { useUser } from "./useUser"
import { useCategory } from "./useCategory"
import { getImageUrl } from "../tools/getImageUrl"
import { useMemo } from "react"

export const useMenuList = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const categories = useCategory()

    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: "0.2vw",
            top: "0.2vw",
            padding: "0 4px",
            minWidth: 0,
            width: "1.1vw",
            height: "1.1vw",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.75vw"
        }
    }))

    const menus: Menu[] = useMemo(
        () => [
            {
                id: 1,
                name: "início",
                path: "/",
                icon: <HomeIcon />,
                onClick: () => navigate("/")
            },
            {
                id: 2,
                name: "painel",
                path: "/panel",
                icon: <AdminPanelSettingsIcon />,
                onClick: () => navigate("/panel"),
                admin: true
            },
            {
                id: 9,
                name: "categorias",
                path: "/aaa",
                icon: <CategoryIcon />,
                onClick: () => {},
                submenus: categories.list?.map((category) => ({
                    id: category.id,
                    name: category.name,
                    onClick: () => navigate(`/category/${category.id}`),
                    path: `/category/${category.id}`,
                    icon: <Avatar src={getImageUrl(category.cover)} sx={{ width: "7vw", height: "100%", aspectRatio: "1/1", marginRight: "2vw" }} />
                }))
            }
        ],
        [categories.list]
    )

    return menus
}

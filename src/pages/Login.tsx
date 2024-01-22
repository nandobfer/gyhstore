import React, { useEffect, useState } from "react"
import { Box, Button, CircularProgress, IconButton } from "@mui/material"
import { Logo } from "../components/Logo"
import { useFormik } from "formik"
import { LoginForm } from "../definitions/LoginForm"
import { Form } from "../components/Form"
import { TextField } from "../components/TextField"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const io = useIo()
    const navigate = useNavigate()

    const { snackbar } = useSnackbar()
    const { setUser } = useUser()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik<LoginForm>({
        initialValues: {
            login: "",
            password: ""
        },
        onSubmit: (values) => {
            console.log(values)
            io.emit("gyh:login", values)
        }
    })

    useEffect(() => {
        io.on("gyh:login", (user: User | null) => {
            if (!user) {
                snackbar({ severity: "error", text: "usuário ou senha inválidos" })
                return
            }

            setUser(user)
            navigate('/panel')

        })
        return () => {
            io.off("gyh:login")
        }
    })

    return (
        <Box sx={{ width: "100%", height: "100%", padding: "10vw", alignItems: "center", gap: "5vw" }}>
            <Logo />
            <Form onSubmit={formik.handleSubmit} sx={{ width: "100%", gap: "5vw" }}>
                <TextField label="usuário" value={formik.values.login} name="login" onChange={formik.handleChange} autoComplete="off" required />
                <TextField
                    label="senha"
                    value={formik.values.password}
                    name="password"
                    onChange={formik.handleChange}
                    autoComplete="off"
                    required
                    InputProps={{
                        endAdornment: (
                            <IconButton color="secondary" onClick={() => setShowPassword((show) => !show)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        )
                    }}
                    type={showPassword ? "text" : "password"}
                />
                <Button variant="outlined" type="submit">
                    {loading ? <CircularProgress size="1.5rem" color="primary" /> : "entrar"}
                </Button>
            </Form>
        </Box>
    )
}

import { useContext } from 'react'
import UserContext from '../contexts/userContext'

export const useUser = () => {
    const userContext = useContext(UserContext);
    const {user, setUser} = userContext

    return {user, setUser}
}
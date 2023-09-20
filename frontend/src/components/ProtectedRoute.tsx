import React, { ReactNode, useEffect, useState } from 'react'
import authService from '../services/authService'
import { Navigate } from 'react-router-dom'

type Props = {
    children: ReactNode
}


const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = sessionStorage.getItem('token') || ''

            if (!token) {
                authService.logout()
            } else {
                try {
                    const isValid = await authService.isTokenValid(token)

                    if (!isValid) {
                        authService.logout()
                    }
                } catch (err) {
                    console.error(err)
                }
            }

            setLoading(false)
        }

        checkTokenValidity()

    }, [])


    if (loading) {
        return <div>Verificando autenticidade do token...</div>
    }

    return (
        <>
            {sessionStorage.getItem('token') ? (
                children
            ) : (
                <Navigate to="/login" />
            )}
        </>
    )
}

export default ProtectedRoute
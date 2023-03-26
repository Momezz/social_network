import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Header } from './Header'//Por validar
import { Sidebar } from './Sidebar'

export const PrivateLayout = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>
  } else {
    return (
      <>
        {/*LAYOUT */}
        <Header />
        {/*Contenido pricipal */}
        <section className="layout__content">
          {auth._id ?
            <Outlet />
            :
            <Navigate to="/login" />
          }
        </section>
        <Sidebar />
      </>
    )
  }
}


import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'//Por validar
import { Sidebar } from './Sidebar'

export const PrivateLayout = () => {
  return (
    <>
      {/*LAYOUT */}
      <Header />

      {/*Contenido pricipal */}
      <section className="layout__content">
        <Outlet />
      </section>
      <Sidebar />
    </>
    )
}


import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'//Por validar

export const PublicLayout = () => {
  return (
    <>
      {/*LAYOUT */}
      <Header />

      {/*Contenido pricipal */}
      <section className="layout__content">
        <Outlet />
      </section>
    </>
    )
}


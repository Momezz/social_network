import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Header } from './Header';//Por validar

export const PublicLayout = () => {
  const { auth } = useAuth();
  return (
    <>
      {/*LAYOUT */}
      <Header />

      {/*Contenido pricipal */}
      <section className="layout__content">
        {!auth._id ?
          <Outlet />
          :
          <Navigate to="/social" />
      }
      </section>
    </>
    )
}


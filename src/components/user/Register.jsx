import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../helpers/GetProfile';

export const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(2, 'El nombre es muy corto')
      .max(35, 'El nombre es muy largo')
      .required('Este campo es obligatorio'),
    surname: Yup
      .string()
      .min(2, 'El apellido es muy corto')
      .max(35, 'El apellido es muy largo')
      .required('Este campo es obligatorio'),
    nick: Yup
      .string()
      .min(1, 'El nick es muy corto')
      .max(25, 'El nick es muy largo')
      .required('Este campo es obligatorio'),
    email: Yup
      .string()
      .email('email invalido')
      .required(),
    password: Yup
      .string()
      .required('La contraseña es requrida')
      .min(8, 'Ingresa al menos 8 caracteres')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one capital letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      nick: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      try {
        saveUser(values);
        navigate('/login');
      } catch (error) {
        console.log('cat')
        throw new Error(error);
      }
    },
  });
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Register</h1>
      </header>
      <div className="content__posts">
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={formik.handleChange} />
            <div className="error">{formik.errors.name && formik.touched.name ? formik.errors.name : ''}</div>
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={formik.handleChange} />
            <div className="error">{formik.errors.surname && formik.touched.surname ? formik.errors.surname : ''}</div>
          </div>
          <div
            className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={formik.handleChange} />
            <div className="error">{formik.errors.nick && formik.touched.nick ? formik.errors.nick : ''}</div>
          </div>
          <div
            className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" onChange={formik.handleChange} />
            <div className="error">{formik.errors.email && formik.touched.email ? formik.errors.email : ''}</div>
          </div>
          <div
            className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={formik.handleChange} />
            <div className="error">{formik.errors.password && formik.touched.password ? formik.errors.password : ''}</div>
          </div>
          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  )
}


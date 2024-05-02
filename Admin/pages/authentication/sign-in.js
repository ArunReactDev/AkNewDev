// import node module libraries
import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";

// import authlayout to override default layout
import AuthLayout from "layouts/AuthLayout";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { userService } from 'service/user.service';

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginResMessage, setloginResMessage] = useState('');
  const [alertType, setalertType] = useState('success');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email Id is required')
      .email('Invalid Email Address')
    ,
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum 8 characters required.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.')
  });

  const formOptions = { resolver: yupResolver(validationSchema), mode: "onChange" };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function handleHideShow() {
    setShowPassword(password => !password)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function onSubmit({ email, password }) {
    let type = 'adm';
    return userService.login({ email, password , type })
      .then((res) => {
        if (res.status) {
          setalertType('success')
          setloginResMessage(res.message);
          setOpen(true);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          setalertType('error');
          setOpen(true);
          setloginResMessage(res.message);
        }
      })
      .catch((err) => {
        setalertType('error');
        setloginResMessage('Something Went Wrong');
        setOpen(true);
      });
  }


  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md clsx-login-container">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/deb58642934da2e57a2b90bb4f2f6960f741abd7589e73b25d1faca5f9199b4a?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                  className="mb-3"
                  alt=""
                />
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 position-relative">
                <label className="form-label" htmlFor="form2Example11">Email Id</label>
                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className="col-12 mt-3 position-relative">
                <label className="form-label">Password</label>
                <input type={showPassword ? "text" : "password"} name="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.password?.message}</div>
                {errors.password ? '' : <> {
                  showPassword ?
                    <span className={errors.password ? 'password-eye-icon-span-error' : "password-eye-icon-span"}><i onClick={handleHideShow} className="fa fa-eye-slash" aria-hidden="true" /></span>
                    :
                    <span className={errors.password ? 'password-eye-icon-span-error' : "password-eye-icon-span"}><i onClick={handleHideShow} className="fa fa-eye" aria-hidden="true" /></span>
                } </>}
              </div>

              <div className="col-12 mt-3">
                <button className="btn btn-primary btn-block login-btn w-100" disabled={formState.isSubmitting || !formState.isDirty || !formState.isValid}  >
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Login
                </button>
              </div>

            </form>
          </Card.Body>
        </Card>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertType}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {loginResMessage}
          </Alert>
        </Snackbar>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;

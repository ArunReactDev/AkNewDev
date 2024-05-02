import { Footer } from 'components/Footer'
import Header from 'components/Header'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { userService } from 'service/user.service';

function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loginResMessage , setloginResMessage] = useState('');
    const [alertType , setalertType] = useState('success');

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email Id is required')
            .email('Invalid Email Address')
        ,
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Minimum 8 characters required.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.')
        ,
        mobile_number: Yup.string()
            .required('Mobile Number is required')
            .matches(/^[6-9]\d{9}$/, 'Invalid Mobile Number')
        ,
        name: Yup.string()
            .required('Name is required')
        ,
        pan_no: Yup.string()
        .required('Pan Number is required')
        .min(10, 'Invalid Pan Number')
    });

    const formOptions = { resolver: yupResolver(validationSchema), mode: "onChange" };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, watch } = useForm(formOptions);
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

    function onSubmit({ email, password , mobile_number , name , pan_no }) {
        return userService.register({ email, password , mobile_number , name , pan_no })
        .then((res) => {
            if (res.status) {
                setalertType('success')
                setloginResMessage(res.message);               
                setOpen(true);
                setTimeout(() => {
                    router.push("/login");
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
        <>
            <Header />
            <div className='container-md'>
                <div className='clsx-login-container'>
                    <h1 className='clsx-login-title'>Fintrix</h1>
                    <p className='clsx-login-helpertext'>We'll sign you in, or create an account if you don't have one yet.</p>
                    <div className='col-sm-8 col-md-8 col-lg-5'>
                        <div id="customBtn" class="customGPlusSignIn">
                            <span class="icon"></span>
                            <span class="buttonText">Signup with Google</span>
                        </div>
                        <p className='clsx-login-ortext'>or</p>
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12 position-relative">
                                <label className="form-label" htmlFor="form2Example11">Name</label>
                                <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.name?.message}</div>
                            </div>

                            <div className="col-12 mt-3 position-relative">
                                <label className="form-label" htmlFor="form2Example11">Pan Number</label>
                                <input name="pan_no" type="text" {...register('pan_no')} className={`form-control ${errors.pan_no ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.pan_no?.message}</div>
                            </div>

                            <div className="col-12 mt-3 position-relative">
                                <label className="form-label" htmlFor="form2Example11">Email Id</label>
                                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>

                            <div className="col-12 mt-3 position-relative">
                                <label className="form-label" htmlFor="form2Example11">Mobile Number</label>
                                <input name="mobile_number" type="text" {...register('mobile_number')} className={`form-control ${errors.mobile_number ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.mobile_number?.message}</div>
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
                                    Register
                                </button>
                            </div>

                            <div className="col-12 mt-3">
                                <p onClick={() => router.push('/login')} className="small forgot-text mb-0">Already a User?</p>
                            </div>

                        </form>
                    </div>
                </div>
                <Snackbar anchorOrigin={{ vertical : 'top', horizontal : 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={alertType}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {loginResMessage}
                    </Alert>
                </Snackbar>
            </div>
            <Footer />
        </>
    )
}

export default Register
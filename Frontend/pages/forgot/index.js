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

function Forgot() {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loginResMessage , setloginResMessage] = useState('');
    const [alertType , setalertType] = useState('success');

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email Id is required')
            .email('Invalid Email Address')
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

    function onSubmit({ email }) {
        return userService.forgotPassword({ email })
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
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12 position-relative">
                                <label className="form-label" htmlFor="form2Example11">Email Id</label>
                                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                          
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary btn-block login-btn w-100" disabled={formState.isSubmitting || !formState.isDirty || !formState.isValid}  >
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Forgot Password
                                </button>
                            </div>

                            <div className="col-12 mt-3">
                                <p onClick={() => router.push('/login')} className="small forgot-text mb-0">Back to Login</p>
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

export default Forgot
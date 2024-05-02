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

function Reset() {

    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const router = useRouter();
  
    const [open, setOpen] = useState(false);
    const [loginResMessage , setloginResMessage] = useState('');
    const [alertType , setalertType] = useState('success');

    const validationSchema = Yup.object().shape({
        newpassword: Yup.string()
            .required('Password is required')
            .min(8, 'Minimum 8 characters required.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.')
        ,
        confirm_newpassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
    });

    const formOptions = { resolver: yupResolver(validationSchema), mode: "onChange" };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, watch } = useForm(formOptions);
    const { errors } = formState;

    function handleHideShowNew() {
        setShowPasswordNew(password => !password)
    }

    function handleHideShowConfirm() {
        setShowPasswordConfirm(password => !password)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    function onSubmit({ newpassword, confirm_newpassword }) {
           return userService.resetPassword({newpassword , confirm_newpassword , token : router.query.slug })
             .then((res) => {
                 if (res.status) {
                     setalertType('success')
                     setloginResMessage(res.message);               
                     setOpen(true);
                     setTimeout(() => {
                         router.push("/");
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
                                <label className="form-label" htmlFor="form2Example11">New Password</label>
                                <input type={showPasswordNew ? "text" : "password"} name="newpassword" {...register('newpassword')} className={`form-control ${errors.newpassword ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.newpassword?.message}</div>
                                {errors.newpassword ? '' : <> {
                                    showPasswordNew ?
                                        <span className={errors.newpassword ? 'password-eye-icon-span-error' : "password-eye-icon-span"}><i onClick={handleHideShowNew} className="fa fa-eye-slash" aria-hidden="true" /></span>
                                        :
                                        <span className={errors.newpassword ? 'password-eye-icon-span-error' : "password-eye-icon-span"}><i onClick={handleHideShowNew} className="fa fa-eye" aria-hidden="true" /></span>
                                } </>}
                            </div>

                            <div className="col-12 mt-3 position-relative">
                                <label className="form-label">Confirm Password</label>
                                <input type={showPasswordConfirm ? "text" : "password"} name="confirm_newpassword" {...register('confirm_newpassword')} className={`form-control ${errors.confirm_newpassword ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.confirm_newpassword?.message}</div>
                                {errors.confirm_newpassword ? '' : <> {
                                    showPasswordConfirm ?
                                        <span className={errors.confirm_newpassword ? 'password-eye-icon-span-error' : "password-eye-icon-span"}><i onClick={handleHideShowConfirm} className="fa fa-eye-slash" aria-hidden="true" /></span>
                                        :
                                        <span className={errors.confirm_newpassword ? 'password-eye-icon-span-error' : "password-eye-icon-span"}><i onClick={handleHideShowConfirm} className="fa fa-eye" aria-hidden="true" /></span>
                                } </>}
                            </div>

                            <div className="col-12 mt-3">
                                <button className="btn btn-primary btn-block login-btn w-100" disabled={formState.isSubmitting || !formState.isDirty || !formState.isValid}  >
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Reset Password
                                </button>
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

export default Reset
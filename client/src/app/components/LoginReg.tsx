'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/LoginReg.module.css';
import { useResponsive } from '../contexts/ResponsiveContext';
import { Alert, Button, CircularProgress, Collapse, FormHelperText, InputAdornment, Snackbar, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from "react-google-recaptcha";
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    firstName: string;
    lastName: string;
    email: string;
    customerId: string;
    isAdmin?: boolean;
}
interface ErrorState {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    recaptcha?: string;
}
const LoginReg: React.FC = () => {
    const router = useRouter()

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const [isActive, setIsActive] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { width } = useResponsive();
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [regError, setRegError] = useState<ErrorState | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');



    const onRecaptchaChange = (value: React.SetStateAction<string | null>) => {
        setRecaptchaValue(value);
    };


    useEffect(() => {
        console.log(width); if (width && width < 768 && containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [width]);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLDivElement>) => event.preventDefault();

    const toggleActive = () => {
        setIsActive(!isActive);
        clearAll();
    }
    const clearAll = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setError(null);
        setRegError(null);
        setLoading(false);
        setShowPassword(false);
        setProgress(0)
        setSuccessMessage('')
        setRecaptchaValue(null)
        setFocus(false)

    }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true); // Set loading state
        try {
            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            const data = await response.json();

            if (response.ok) {
                //sessionStorage.clear()
                //localStorage.removeItem('isGuest')
                //const accessToken = data.accessToken;

                //localStorage.setItem('token', accessToken);
                //// Decode the token, store additional data as needed
                //const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
                //// Store user details based on storage preference
                //localStorage.setItem('userFirstName', decodedToken.firstName);
                //localStorage.setItem('userLastName', decodedToken.lastName);
                //localStorage.setItem('customerId', decodedToken.customerId);
                //localStorage.setItem('userEmail', decodedToken.email);

                setSuccessMessage('Login successful! Welcome back.');

                setTimeout(() => {
                    router.push('/'); // Redirects to the homepage or another desired path
                    clearAll()
                }, 2000);

            } else {
                setError(data.message || 'Failed to login');
            }
            setLoading(false);
            //router.push('/')
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!recaptchaValue) {
                alert('Please solve the reCAPTCHA');
                return;
            }
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, recaptchaValue }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("data: ", data)
                setRegError(data.errors);
                setLoading(false);
                return;
            }
            setSuccessMessage('You have successfully created an account!');
            setTimeout(() => {
                router.push('/'); // Redirects to the homepage or another desired path
                clearAll()
            }, 2000);

        } catch (error: any) {
            console.log(error)
            setRegError(error);
            setLoading(false);
        }
    }


    const [focus, setFocus] = useState(false);
    const [progress, setProgress] = useState(0);

    const validatePassword = (password: string) => {
        let progress = 0;
        if (password.length >= 8) progress += 1 / 3;
        if (/\d/.test(password)) progress += 1 / 3;
        if (/[a-zA-Z]/.test(password)) progress += 1 / 3;
        return progress;
    };

    const handlePasswordChange = (event: { target: { value: string; }; }) => {
        const { value } = event.target;
        setPassword(value);
        setProgress(validatePassword(value));
    };


    return (
        <div ref={containerRef} className={`${styles.container} ${isActive ? styles.active : ''}`} id="container" >
            <Snackbar
                open={!!successMessage}
                autoHideDuration={40000}
                onClose={() => setSuccessMessage('')}

            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', backgroundColor: 'var(--color-primary-semi-transparent)', }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>

            <div className={`${styles.formContainer} ${styles.signUp}`}>
                <form onSubmit={handleRegister}>
                    <h1 className={styles.header}>Create Account</h1>
                    {/*<div className={styles.socialIcons}>
                        <div>
                            <a href="#" className={styles.icon}>

                                <Icon name='Google' height={30} width={30} className='fa-brands fa-google-plus-g' />
                            </a>
                        </div>
                        <div>
                            <a href="#" className={styles.icon}>
                                <Icon name='Facebook' width={30} height={30} className='fill-blue-600' />
                            </a>
                        </div>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>*/}
                    {/*SIGN UP FORM*/}
                    <div className='flex  justify-between items-center w-full gap-2'>
                        <TextField margin='dense' variant='filled' sx={{ width: '50%' }} size='small' type="text" label="First Name" color='secondary'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            error={!!regError}
                            autoComplete='given-name'
                        />
                        <TextField margin='dense' variant='filled' sx={{ width: '50%' }} size='small' type="text" label="Last Name" color='secondary'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            error={!!regError}
                            autoComplete='family-name'
                        />
                    </div>

                    <TextField margin='dense' variant='filled' fullWidth size='small' type="email" label="Email" color='secondary'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!regError}
                        autoComplete='email'

                    />
                    <div className='w-full'>
                        <TextField
                            margin='dense'
                            size='small'
                            variant="filled"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='new-password'
                            label="Password"
                            fullWidth
                            value={password}
                            focused={
                                false
                            }
                            onChange={handlePasswordChange}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(true)}
                            error={!!regError}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        <InputAdornment position="end">
                                            <div
                                                className={styles.iconVisibility}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff color='primary' /> : <Visibility color='secondary' />}
                                            </div>
                                        </InputAdornment>
                                        {progress === 1 ? (
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon fill="#43A047" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"></polygon></svg>
                                        ) : null}
                                        <div
                                            style={{
                                                height: '2.25px',
                                                width: `${progress * 100}%`,
                                                backgroundColor: progress === 1 ? '#3ACF8D' : 'red',
                                                transition: 'width 0.3s ease',
                                                position: 'absolute',
                                                bottom: 0,
                                            }}
                                        />
                                    </>
                                ),
                            }}
                        />
                        <Collapse in={focus && progress !== 1 || !!regError} unmountOnExit>
                            {focus && progress !== 1 ? (
                                <div className='h-[70px] text-xs text-red-600'>
                                    Password must be at least 8 characters long, and contain at least one number and one letter.
                                </div>
                            ) : (
                                <div className='h-[70px] text-xs text-red-600'>
                                    {regError?.email ?? regError?.firstName ?? regError?.lastName ?? ''}
                                </div>
                            )}
                        </Collapse>

                    </div>

                    <ReCAPTCHA
                        id='recaptcha'
                        sitekey={siteKey!}
                        onChange={onRecaptchaChange}

                    />

                    <Button disabled={loading} type='submit' >
                        {loading ?
                            <CircularProgress color='warning' size={20} /> :
                            "     Sign Up"
                        }
                    </Button>
                </form>
            </div>
            <div className={`${styles.formContainer} ${styles.signIn}`}>
                <form onSubmit={handleLogin}>
                    <h1 className={styles.header}>Sign In</h1>
                    {/*<div className={styles.socialIcons}>
                        <a href="#" className={styles.icon}>
                            <Icon name='Google' height={30} width={30} />
                        </a>
                        <a href="#" className={styles.icon}>
                            <Icon name='Facebook' width={30} height={30} className='fill-blue-600' />

                        </a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>*/}
                    {/* LOGIN FORM */}
                    <TextField margin='dense' variant='filled' fullWidth size='small' type="email" label="Email" color='secondary'
                        value={email}
                        autoComplete='email'
                        onChange={(e) => setEmail(e.target.value)}
                        error={Boolean(error)}

                    />

                    <TextField margin='dense' variant='filled' fullWidth size='small' label="Password" color='secondary'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(error)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <div
                                        className={styles.iconVisibility}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff color='primary' /> : <Visibility color='secondary' />}
                                    </div>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Collapse in={!!error} unmountOnExit sx={{ width: '100%' }}  >
                        <div className='text-xs text-red-600 w-full text-start'>
                            {error}
                        </div>
                    </Collapse>

                    <a href="#" className='text-primary hover:text-secondary-variant transition duration-300'>Forget Your Password?</a>
                    <Button type='submit' disabled={loading} >
                        {loading ?
                            <CircularProgress color='warning' size={20} /> :
                            "Sign In"
                        }
                    </Button>
                </form>
            </div>
            <div className={styles.toggleContainer}>
                <div className={styles.toggle}>
                    <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                        <h1>Already have an Account?</h1>
                        <p>Login to use all of site features</p>
                        <button className={styles.hidden} id="login" onClick={toggleActive}>Sign In</button>
                    </div>
                    <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                        <h1>Dont have an account?</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className={`${styles.hidden}`} id="register" onClick={toggleActive}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className='scroll-down-div h-2'  ></div>
        </div>
    );
}

export default LoginReg;

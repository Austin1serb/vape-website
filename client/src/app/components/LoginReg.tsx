'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/LoginReg.module.css';
import Icon from './Icon';
import  {useResponsive}  from '../contexts/ResponsiveContext';

const LoginReg: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const toggleActive = () => setIsActive(!isActive);
    const containerRef = useRef<HTMLDivElement>(null);
    const {  width } = useResponsive();

    useEffect(() => {
        console.log(width)
        // Scroll the referenced element into view after the component mounts
        if(width && width<768 && containerRef.current)
     {
            containerRef.current.scrollIntoView({
                behavior: 'smooth', // Optional: for smooth scrolling
                block: 'start', // Optional: aligns the element at the top of the viewport
            });
        }
    }, [width]);



    return (
        <div ref={containerRef} className={`${styles.container} ${isActive ? styles.active : ''}`} id="container" >
            <div className={`${styles.formContainer} ${styles.signUp}`}>
                <form>
                    <h1 className={styles.header}>Create Account</h1>
                    <div className={styles.socialIcons}>
                        <div>
                        <a href="#" className={styles.icon}>

                            <Icon name='Google' height={30} width={30} className='fa-brands fa-google-plus-g' />
                        </a>
                        </div>
                        <div>
                        <a href="#" className={styles.icon}>
                            <Icon name='Facebook' width={30} height={30} className='fill-blue-600'/>
                        </a>
                        </div>
                        {/*<a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>*/}
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className={`${styles.formContainer} ${styles.signIn}`}>
                <form >
                    <h1 className={styles.header}>Sign In</h1>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.icon}>
                            <Icon name='Google' height={30} width={30} />
                        </a>
                        <a href="#" className={styles.icon}>
                            <Icon name='Facebook' width={30} height={30} className='fill-blue-600' />

                        </a>
                        {/*<a href="#" className={styles.icon}><i className="fa-brands fa-github"></i></a>
                        <a href="#" className={styles.icon}><i className="fa-brands fa-linkedin-in"></i></a>*/}
                    </div>
                    <span>or use your Email</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <a href="#" className='text-primary hover:text-secondary-variant transition duration-300'>Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div  className={styles.toggleContainer}>
                <div className={styles.toggle}>
                    <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                        <h1>Already have an Account?</h1>
                        <p>Login to use all of site features</p>
                        <button className={styles.hidden} id="login" onClick={toggleActive}>Sign In</button>
                    </div>
                    <div   className={`${styles.togglePanel} ${styles.toggleRight}`}>
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

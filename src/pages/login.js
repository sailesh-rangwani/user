import React, { useState } from 'react'
import styles from '../styles/register.module.css'

const Login = () => {

            const [email, setEmail] = useState('');
            const [pass, setPass] = useState('');
            const [error, setError] = useState('');
            const [success, setSuccess] = useState('');
          
            const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                const res = await fetch('http://localhost:3000/api/logincheck', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, pass }),
                });
                if (res.ok) {
                  console.log("Successfull Login");
                  setSuccess("Login Successfull");
                } else {
                  setError('Invalid email or password');
                }
              } catch (error) {
                setError('Something went wrong. Please try again later.');
              }
            }

            const handleChange = (e) => {
                if (e.target.name == 'email') {
                  setEmail(e.target.value)
                }
                else if (e.target.name == 'pass') {
                  setPass(e.target.value)
                }
            }

    return (

        <main className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.container}>
                <div className={styles.title}>Login</div>
                <div className={styles.items}>
                    <label>Email : </label>
                    <input type='email' onChange={handleChange} value={email} name='email'/>
                </div>
                <div className={styles.items}>
                    <label>Password : </label>
                    <input type='password' onChange={handleChange} value={pass} name='pass'/>
                </div>
                <div className={styles.items}>
                    <button>Submit</button>
                </div>
                <div className={styles.submitted}>{success}</div>
                <div className={styles.error}>{error}</div>
            </form>
        </main>
    )
}

export default Login
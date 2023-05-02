import React, { useState } from 'react'
import styles from '../styles/register.module.css'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [alert, setAlert] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { name, email, pass };
        fetch('http://localhost:3000/api/postuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.text())
            .then(data => {
                setAlert("Form Submitted!");
                setName('')
                setEmail('')
                setPass('')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'pass') {
            setPass(e.target.value)
        }
    }

    return (
        <main className={styles.main}>
            <form className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.title}>Register</div>
                <div className={styles.items}>
                    <label>Name : </label>
                    <input type='name' value={name} onChange={handleChange} id="name" name='name' />
                </div>
                <div className={styles.items}>
                    <label>Email : </label>
                    <input type='email' value={email} onChange={handleChange} id="email" name='email' />
                </div>
                <div className={styles.items}>
                    <label>Password : </label>
                    <input type='password' value={pass} onChange={handleChange} id="pass" name='pass' />
                </div>
                <div className={styles.items}>
                    <button>Submit</button>
                </div>
                <div className={styles.submitted}>{alert}</div>
            </form>
        </main>
    )
}

export default Register
import React, { useState } from 'react';
import styles from './SignUp.module.css';
import axios from 'axios';
function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')   

    const handleSubmit = (e) => {
		e.preventDefault();
		if (email !== "" && username !== "" && password !== "" && confirmPassword !== "") {
			axios.post('https://localhost:7149/api/Users/Register', {
				userName: username,
				email: email,
				userPassword: password
			}, {
				headers: { 'Content-Type': 'application/json' }
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.error('There has been a problem with your axios operation:', error);
			});
		} else {
			console.log("All fields are required!");
		}
	};
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <h1 className={styles.title}>Sign up:</h1>
                <input className={styles.inputs} name="Username" placeholder='Username' value={username} onChange = {(e) => setUsername(e.target.value)} />
                <input className={styles.inputs} name="Email" placeholder='E-mail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.inputs} name="Password" placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className={styles.inputs} name="ConfirmPassword" placeholder='Confirm password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" className={styles.button}>Sign up</button>
            </div>
        </form>
    )
}

export default SignUp
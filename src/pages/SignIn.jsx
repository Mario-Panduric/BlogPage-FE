import React, { useState } from 'react';
import styles from './SingIn.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignIn(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const navigate = useNavigate();

    const handleSubmit = (e) => {
		e.preventDefault();
		if (username !== "" && password !== "") {
			axios.post('https://localhost:7149/api/Users/Login', {
				userName: username,
				userPassword: password
			}, {
				headers: { 'Content-Type': 'application/json' }
			})
			.then(response => {
				if(response.status === 200){
					localStorage.setItem('username', username)
					const userId = response.data.id
					console.log(userId)
					localStorage.setItem('id', userId)				
					navigate('/home')
				}
			})
			.catch(error => {
				console.error('There has been a problem with your axios operation:', error);
			});
		} else {
			console.log("All fields are required!");
		}
	};
    return(
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <h1 className={styles.title}>Sign in:</h1>
                <input className={styles.inputs} name="Username" placeholder='Username' value={username} onChange = {(e) => setUsername(e.target.value)} />
                <input className={styles.inputs} name="Password" placeholder='Password' type="password" value={password} onChange = {(e) => setPassword(e.target.value)} />
                <a href='/signup' className={styles.link}>Not registered?</a>
                <button type="submit" variant="contained" className={styles.button}>Sign in</button>
            </div>
        </form>
    )
}

export default SignIn
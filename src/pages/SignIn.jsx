import React, { useState } from 'react';
import styles from './SignIn.module.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext';
import decodeJWT from '../helpers/DecodeJWT'

function SignIn(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const navigate = useNavigate();
	const { loginUser } = UserContext.useUser();

    const handleSubmit = (e) => {
		e.preventDefault();
		if (username !== "" && password !== "") {
			fetch('https://localhost:7149/api/Users/Login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					userName: username,
					userPassword: password
				})
			})
			.then(response => {
				if (response.ok) {		
					navigate('/home');	
					return response.json();
				} else {
					throw new Error('Network response was not ok');
				}
			})
			.then(userData => {
				let user = decodeJWT(userData);
				console.log(user)		
                loginUser(user);
            })
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
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
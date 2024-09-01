import React, {useEffect, useState} from "react";
import axios from "axios";
import {GLOBAL_URL} from "../App";

function Login(props) {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(undefined);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(undefined);
    const [formIsValid, setFormIsValid] = useState(false);
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                enteredUsername.trim().length > 5 && enteredPassword.trim().length > 5
            );
        }, 100);

        return () => {
            if (loginError) {
                setLoginError(false);
            }
            clearTimeout(identifier)
        };

    }, [enteredUsername, enteredPassword, loginError]);

    const handleUsernameChange = (event) => {
        setEnteredUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setEnteredPassword(event.target.value);
    };

    const handleValidateUsername = () => {
        const validateUsername = enteredUsername.trim();
        setUsernameIsValid(validateUsername.length > 5 && validateUsername.match(/^[a-zA-Z\d]{6,}$/));
    };

    const handleValidatePassword = () => {
        const validatePassword = enteredPassword.trim();
        setPasswordIsValid(validatePassword.length > 5 && validatePassword.match(/^[a-zA-Z\d]{6,}$/));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: enteredUsername.trim(),
            password: enteredPassword.trim()
        }

        axios.post(`${GLOBAL_URL}/login`, {user}, {withCredentials: true}).then(response => {
            if (response.data.user) {
                setLoginError(false);
                props.onLogin(response);
            } else {
                setLoginError(true);
            }
        }).catch(error => console.log('api errors:', error))
    };

    return (
        <section>
            {loginError &&
                <div className="alert">
                    <span className="alert alert-danger">Incorrect Credentials, Try Again</span>
                </div>
            }
            <form onSubmit={handleSubmit} className={"login-form"}>
                <div className={`${usernameIsValid === false && "invalid "} login-input`}>
                    <input type="text" id="username"
                           value={enteredUsername}
                           onChange={handleUsernameChange}
                           onBlur={handleValidateUsername}
                           className={'form-control'}
                           placeholder="Username"
                           required
                    />
                </div>
                <div className={`${passwordIsValid === false && "invalid "} login-input`}>
                    <input type="password" id="password"
                           value={enteredPassword}
                           onChange={handlePasswordChange}
                           onBlur={handleValidatePassword}
                           className={"form-control"}
                           placeholder="Password"
                           required
                    />
                </div>
                <div>
                    <button type="submit" className={"btn btn-primary"} disabled={!formIsValid}>Login</button>
                </div>
            </form>
        </section>
    );
}

export default Login;
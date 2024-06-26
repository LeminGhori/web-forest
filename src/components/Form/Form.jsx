import React, { useState } from "react";
import "./form.css";
import axios from 'axios'; // Import Axios
function Form({ setIsLogin }) {
    const [formType, setFormType] = useState(false);
    const [isOtp, setIsOtp] = useState(false);
    const [loginToken, setLoginToken] = useState(false);
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });

    const [signUp, setSignUp] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState('');

    const handleSignInInput = (e) => {
        const { name, value } = e.target;
        setSignIn((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignUpInput = (e) => {
        const { name, value } = e.target;
        setSignUp((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your sign-in API endpoint
            await axios.post('http://localhost:7000/api/user/login', signIn).then((res) => {
                setLoginToken(res.data.token);
                setIsOtp(true);
            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            // Handle errors (e.g., display error message)
            console.error('Error signing in:', error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your sign-up API endpoint
            await axios.post('http://localhost:7000/api/user/signup', {
                // Pass any necessary data for sign-up (e.g., username, email, password)
                // Replace 'your_sign_up_api_endpoint' with your actual API endpoint
                // Replace 'username', 'email', and 'password' with your actual form data
                username: signUp?.username,
                email: signUp?.email,
                password: signUp?.password
            }).then((res) => {
                setFormType(false);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            // Handle errors (e.g., display error message)
            console.error('Error signing up:', error);
        }
    };
    const handleCheckOtp = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your sign-up API endpoint
            await axios.post('http://localhost:7000/api/user/verifyotp', {
                token: loginToken,
                otp: otp
            }).then((res) => {
                setIsLogin(true);
                debugger;
                localStorage.setItem('token', res.data.createToken);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            // Handle errors (e.g., display error message)
            console.error('Error signing up:', error);
        }
    };
    return (
        <div
            id="container"
            className={`${formType === false ? "sign-in" : "sign-up"} container-1`}
        >
            <div className="row">
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <form onSubmit={handleSignUp}>
                                <div className="input-group">
                                    <i className="bx bxs-user"></i>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={signUp.username}
                                        onChange={handleSignUpInput}
                                    />
                                </div>
                                <div className="input-group">
                                    <i className="bx bx-mail-send"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={signUp.email}
                                        onChange={handleSignUpInput}
                                    />
                                </div>
                                <div className="input-group">
                                    <i className="bx bxs-lock-alt"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={signUp.password}
                                        onChange={handleSignUpInput}
                                    />
                                </div>
                                <div className="input-group">
                                    <i className="bx bxs-lock-alt"></i>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={signUp.confirmPassword}
                                        onChange={handleSignUpInput}
                                    />
                                </div>
                                <button type="submit">Sign up</button>
                            </form>
                            <p>
                                <span>Already have an account?</span>
                                <b
                                    onClick={() => {
                                        setFormType(false);
                                        setSignIn((prevState) => ({ ...prevState, username: "" }));
                                    }}
                                    className="pointer"
                                >
                                    Sign in here
                                </b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-in">
                            {
                                isOtp ?
                                    <form onSubmit={handleCheckOtp}>
                                        <div className="input-group">
                                            <i className="bx bxs-lock-alt"></i>
                                            <input
                                                type="otp"
                                                name="otp"
                                                placeholder="OTP"
                                                value={otp}
                                                onChange={(e) => { setOtp(e.target.value) }}
                                            />
                                        </div>
                                        <button type="submit">Verify OTP</button>
                                    </form>
                                    :
                                    <form onSubmit={handleSignIn}>
                                        <div className="input-group">
                                            <i className="bx bxs-user"></i>
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="email"
                                                value={signIn.email}
                                                onChange={handleSignInInput}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <i className="bx bxs-lock-alt"></i>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={signIn.password}
                                                onChange={handleSignInInput}
                                            />
                                        </div>
                                        <button type="submit">Sign in</button>
                                    </form>
                            }

                            <p>
                                <b>Forgot password?</b>
                            </p>
                            <p>
                                <span>Don't have an account?</span>
                                <b
                                    onClick={() => {
                                        setFormType(true);
                                        setSignUp((prevState) => ({ ...prevState, username: "" }));
                                    }}
                                    className="pointer"
                                >
                                    Sign up here
                                </b>
                            </p>
                        </div>
                    </div>
                    <div className="form-wrapper"></div>
                </div>
            </div>
            <div className="row content-row">
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;

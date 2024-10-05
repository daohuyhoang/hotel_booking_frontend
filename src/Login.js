import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSignin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                usernameOrEmail,
                password,
            });

            if (response.status === 200) {
                const { roles, accessToken } = response.data;
                console.log('User roles:', roles);
                console.log(accessToken);

                if (saveCredentials) {
                    localStorage.setItem('authToken', accessToken);
                    console.log(accessToken);
                }

                if (roles.includes('ROLE_ADMIN')) {
                    window.location.href = '/admin/dashboard';
                } else if (roles.includes('ROLE_USER')) {
                    window.location.href = '/';
                } else {
                    setErrorMessage('Không có quyền truy cập!');
                }
            }
        } catch (error) {
            setErrorMessage('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!');
            console.error('Đăng nhập lỗi:', error);
        }
    };


    return (
        <div className="auth-wrapper">
            <div className="auth-content text-center">
                <img src="/images/logo.png" alt="" className="img-fluid mb-4" />
                <div className="card borderless">
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="card-body">
                                <h4 className="mb-3 f-w-400">Sign In</h4>
                                <hr />
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="usernameOrEmail"
                                        placeholder="Username or email"
                                        value={usernameOrEmail}
                                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="Password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="custom-control custom-checkbox text-left mb-4 mt-2">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                        checked={saveCredentials}
                                        onChange={(e) => setSaveCredentials(e.target.checked)}
                                    />
                                    <label className="custom-control-label" htmlFor="customCheck1">
                                        Save credentials.
                                    </label>
                                </div>
                                <button className="btn btn-block btn-primary mb-4" onClick={handleSignin}>
                                    Sign in
                                </button>
                                <hr />
                                <p className="mb-2 text-muted">
                                    Forgot password? <a href="auth-reset-password.html" className="f-w-400">Reset</a>
                                </p>
                                <p className="mb-0 text-muted">
                                    Don’t have an account? <a href="auth-signup.html" className="f-w-400">Sign up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useState, useEffect } from "react";
import { useSignUpMutation } from "../../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, loadUserFromStorage } from "../../../Redux/authSlice";
import { Link, useNavigate } from "react-router";
import './register.css'
import toast from "react-hot-toast";

const Login = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpUser, { isLoading, isError, error }] = useSignUpMutation();
    const { isLogin } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    useEffect(() => {
        dispatch(loadUserFromStorage());
    }, [dispatch]);

    const handelSignup = async () => {
        try {
            const setUserData = await signUpUser({ email, password, displayName }).unwrap();

            dispatch(setUser({
                user: {
                    id: setUserData.user.id,
                    email: setUserData.user.email,
                    displayName: setUserData.user.user_metadata?.display_name || ''
                },
                session: setUserData.session
            }));
            toast.success('successfuly')
        } catch (error) {
            return
        }
    };

    return (
        <>
            <div className="auth-container">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img alt="Your Company" src="logo.jpg" className="auth-logo" />
                    <h2 className="auth-title">Create account</h2>
                </div>

                <div className="auth-box">
                    {isError && <p className="auth-error">{error?.data?.message || error?.error || "Something went wrong"}</p>}

                    <div>
                        <label htmlFor="name" className="auth-label">Your Name</label>
                        <input id="name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="auth-input" />
                    </div>

                    <div>
                        <label htmlFor="email" className="auth-label">Email address</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="auth-label">Password</label>
                            <a href="#" className="auth-forgot">Forgot password?</a>
                        </div>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" />
                    </div>

                    <button onClick={handelSignup} className="auth-button">
                        {isLoading ? 'loading' : 'Sign Up'}
                    </button>

                    <p className="auth-footer">
                        Have Account? <Link to="/login" className="auth-link">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Redux/authSlice";
import './login.css';
import { Link, useNavigate } from "react-router";
import { supabase } from "../../../supabasae/createclient";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const { isLogin } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    });

    const handelLogin = async () => {
        try {
            const result = await login({ email, password }).unwrap();
            const { data: profile } = await supabase
                .from("profiles")
                .select("email , role")
                .eq('id', result?.user?.id)
                .single();

            dispatch(setUser({
                user: result.user,
                session: result.session,
                displayName: result.user.user_metadata?.display_name || "",
                profile
            }));

            toast.success('Login successfully');
        } catch (err) {
            return;
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-header">
                <img alt="Your Company" src="logo.jpg" className="login-logo" />
                <h2 className="login-title">Sign in to your account</h2>
            </div>

            <div className="login-form">
                {isError && (
                    <p className="login-error">
                        {error?.data?.message || error?.error || "Something went wrong"}
                    </p>
                )}
                <div>
                    <label htmlFor="email" className="login-label">Email address</label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />
                    </div>
                </div>

                <div>
                    <div className="login-password-header">
                        <label htmlFor="password" className="login-label">Password</label>
                        <div className="login-forgot">
                            <a href="#" className="login-forgot-link">Forgot password?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>
                </div>

                <div>
                    <button onClick={handelLogin} className="login-button">
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </div>

                <p className="login-footer">
                    Don't have an account?{' '}
                    <Link to="/signup" className="login-link">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import { useState, useEffect } from "react";
import { useSignUpMutation } from "../../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, loadUserFromStorage } from "../../../Redux/authSlice";
import { Link, useNavigate } from "react-router";

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
        } catch (error) {
            return
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="logo.jpg"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Create account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-6">
                    {isError && (
                        <p className="text-red-500 text-center mt-4">
                            {error?.data?.message || error?.error || "Something went wrong"}
                        </p>)}

                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-500">
                            Your Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline outline-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-500">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline outline-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-500">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </a>
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
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base  outline outline-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handelSignup}
                            className=" flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            {isLoading ? 'loading' : 'Sign Up'}
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Have Account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

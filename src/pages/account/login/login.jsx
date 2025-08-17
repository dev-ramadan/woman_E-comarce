import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Redux/authSlice";
import './login.css'
import { Link, useNavigate } from "react-router";
import { supabase } from "../../../supabasae/createclient";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const { isLogin } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    })

    const handelLogin = async () => {
        try {
            const result = await login({ email, password }).unwrap();
            const {data : profile} = await supabase
            .from("profiles")
            .select("email , role")
            .eq('id' , result?.user?.id)
            .single()
            dispatch(setUser({
                user: result.user,
                session: result.session,
                displayName: result.user.user_metadata?.display_name || "",
                profile
            }));
        } catch (err) {
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
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-6">
                    {isError && (
                        <p className="text-red-500 text-center mt-4 bg-red-300 p-3 rounded-lg">
                            {error?.data?.message || error?.error || "Something went wrong"}
                        </p>)}
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
                            onClick={handelLogin}
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            {isLoading ? 'loading' : 'Login'}
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Dont Have Account?{' '}
                        <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

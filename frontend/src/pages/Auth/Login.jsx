import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err?.data || err.error || "Login failed");
    }
  };

  return (
    <section className="page flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Demo admin: admin@shophub.com / admin123
        </p>

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-zinc-300">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="field"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-zinc-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button disabled={isLoading} type="submit" className="btn-primary w-full">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          {isLoading && <Loader />}
        </form>

        <p className="mt-4 text-sm text-zinc-300">
          New customer?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-pink-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

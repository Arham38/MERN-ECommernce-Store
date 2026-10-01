import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully registered");
    } catch (err) {
      toast.error(err?.data?.message || err?.data || err.error || "Register failed");
    }
  };

  return (
    <section className="page flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold">Create an account</h1>

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-zinc-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="field"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="text-sm text-zinc-300">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="field"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button disabled={isLoading} type="submit" className="btn-primary w-full">
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>

        <p className="mt-4 text-sm text-zinc-300">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-pink-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

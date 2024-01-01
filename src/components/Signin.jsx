import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setuserInfo } from "../redux-toolkit/cartSlice";

const Signin = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
    }
    if (!password) {
      setErrPassword("Enter your password");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setuserInfo({
              id: user.uid,
              username: user.displayName,
              email: user.email,
            })
          );
          console.log(user);
          // ...
          setLoading(false);
          setSuccessMsg("Logged in Successfully! Welcome Back");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setUserEmailErr("Invalid Email");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setUserPassError("Wrong password! try again");
          }
        });
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
      <Navbar />
      {successMsg ? (
        <div className="mt-[150px]">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="text-base font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
          >
            {successMsg}
          </motion.p>
        </div>
      ) : (
        <section className="bg-gray-50 mt-[100px]">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Your email
                    </label>
                    <input
                      value={email}
                      onChange={handleEmail}
                      type="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Enter your email"
                    />
                    {errEmail && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                        ! {errEmail}{" "}
                      </p>
                    )}
                    {userEmailErr && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                        ! {userEmailErr}{" "}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Password
                    </label>
                    <input
                      onChange={handlePassword}
                      type="password"
                      placeholder="Enter your password"
                      className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg  block w-full p-2.5"
                    />
                    {errPassword && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                        ! {errPassword}
                      </p>
                    )}
                    {userPassErr && (
                      <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                        ! {userPassErr}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-black ">Remember me</label>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  {loading && (
                    <div className="mt-5">
                      <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="#f97316"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  )}
                  <p className="text-sm font-light text-black">
                    Don’t have an account yet ?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Signin;

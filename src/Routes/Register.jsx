import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleRegistration = (e) => {
    if (!name) {
      setErrName("Enter your name");
    }
    if (!email) {
      setErrEmail("Enter your email");
      setFirebaseErr("");
    }
    if (!password) {
      setErrPassword("Enter your password");
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
    }
    e.preventDefault();
    if (name && email && password && password.length >= 6) {
      setLoading(true);
      console.log(name, email, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
          });
          // Signed up
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          setSuccessMsg("Account Created Successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, Try another one");
          }
          // ..
        });
      setName("");
      setEmail("");
      setPassword("");
      setFirebaseErr("");
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-10 mt-[100px]">
        <h1 className="mb-8 font-extrabold text-4xl">Create your account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form>
            <div>
              <label className="block font-semibold">Name</label>
              <input
                className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                type="text"
                onChange={handleName}
                value={name}
                required="required"
              />
              {errName && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                  ! {errName}{" "}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Email</label>
              <input
                className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                type="email"
                onChange={handleEmail}
                value={email}
                required="required"
              />
              {errEmail && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                  ! {errEmail}{" "}
                </p>
              )}
              {firebaseErr && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                  ! {firebaseErr}{" "}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Password</label>
              <input
                className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                type="password"
                onChange={handlePassword}
                value={password}
                required="required"
              />
              {errPassword && (
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2">
                  ! {errPassword}{" "}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-8">
              <div>
                <button
                  type="submit"
                  onClick={handleRegistration}
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 md:py-4 md:text-lg md:px-10"
                >
                  Register
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
                {successMsg && (
                  <div className="mt-5">
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 2.5 }}
                      className="text-base font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                    >
                      {successMsg}
                    </motion.p>
                  </div>
                )}
              </div>
              <Link to="/signin" className="font-semibold">
                Already registered?
              </Link>
            </div>
          </form>

          <aside className="">
            <div className="bg-gray-100 p-8 rounded">
              <h2 className="font-bold text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside">
                <li>
                  All users must provide a valid email address and password to
                  create an account.
                </li>
                <li>
                  Users must not use offensive, vulgar, or otherwise
                  inappropriate language in their username or profile
                  information
                </li>
                <li>
                  Users must not create multiple accounts for the same person.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Register;

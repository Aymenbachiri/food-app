import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiFillTag } from "react-icons/ai";
import { BsFillSaveFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import cart from "../assets/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";
import { UserSignOut } from "../redux-toolkit/cartSlice";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const cartItems = useSelector((state) => state.cart.products);
  const UserInfo = useSelector((state) => state.cart.userInfo);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(UserSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" w-full rounded-xl bg-orange-500 flex justify-between items-center fixed top-0 z-20 p-4">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <Link to="/" className="text-xl md:text-2xl lg:text-4xl px-2">
          Aymen <span className="font-bold">Eats</span>
        </Link>
      </div>
      <div className="flex items-center">
        {UserInfo && (
          <div className="cursor-pointer px-2 p-2 mr-2 rounded-3xl bg-black/70 flex justify-center items-center relative">
            <button
              onClick={handleLogout}
              className="md:text-xl font-bold text-white md:mr-2"
            >
              Log out
            </button>
            <IoIosLogOut size={30} style={{ color: "white" }} />
          </div>
        )}
        {UserInfo ? (
          <p className="mr-4 relative cursor-pointer bg-black/70 text-white font-bold text-xl flex items-center py-2 px-3 rounded-full">
            {UserInfo.username}{" "}
          </p>
        ) : (
          <Link
            to="/signin"
            className="mr-4 relative cursor-pointer bg-gray-200 text-black font-bold text-xl flex items-center py-2 md:px-3 rounded-full"
          >
            Sign in
          </Link>
        )}
        {/* Cart button */}
        <Link
          to="/cart"
          className="relative cursor-pointer bg-gray-200 text-black font-bold text-xl flex items-center py-2 md:px-3 rounded-full"
        >
          Cart
          <img
            style={{ width: "30px", marginRight: "5px" }}
            src={cart}
            alt="cart"
          />
          <div className="absolute w-4 h-4 rounded-full z-10 right-[10px] top-[-3px] flex items-center justify-center text-[10px] bg-black text-white">
            {cartItems.length}{" "}
          </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Aymen <span className="font-bold">Eats</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex">
              <TbTruckDelivery size={25} className="mr-4" /> Orders
            </li>
            <li className="text-xl py-4 flex">
              <MdFavorite size={25} className="mr-4" /> Favorites
            </li>
            <li className="text-xl py-4 flex">
              <FaWallet size={25} className="mr-4" /> Wallet
            </li>
            <li className="text-xl py-4 flex">
              <MdHelp size={25} className="mr-4" /> Help
            </li>
            <li className="text-xl py-4 flex">
              <AiFillTag size={25} className="mr-4" /> Promotions
            </li>
            <li className="text-xl py-4 flex">
              <BsFillSaveFill size={25} className="mr-4" /> Best Ones
            </li>
            <li className="text-xl py-4 flex">
              <FaUserFriends size={25} className="mr-4" /> Invite Friends
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

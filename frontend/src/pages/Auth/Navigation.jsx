import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      setMobileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? "text-pink-400" : "text-zinc-200 hover:text-white"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkClass} onClick={() => setMobileOpen(false)}>
        <AiOutlineHome size={18} />
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={linkClass}
        onClick={() => setMobileOpen(false)}
      >
        <AiOutlineShopping size={18} />
        Shop
      </NavLink>
      <NavLink
        to="/cart"
        className={linkClass}
        onClick={() => setMobileOpen(false)}
      >
        <AiOutlineShoppingCart size={18} />
        Cart
        {cartCount > 0 && (
          <span className="ml-1 rounded-full bg-pink-500 px-1.5 text-xs">
            {cartCount}
          </span>
        )}
      </NavLink>
      <NavLink
        to="/favorite"
        className={linkClass}
        onClick={() => setMobileOpen(false)}
      >
        <FaHeart size={16} />
        Favorites
        <FavoritesCount />
      </NavLink>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0b0d]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          <span className="text-pink-500">Shop</span>Hub
        </Link>

        <nav className="hidden items-center gap-1 md:flex">{navLinks}</nav>

        <div className="flex items-center gap-3">
          {userInfo ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white"
              >
                {userInfo.username}
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1c] py-1 text-sm shadow-xl">
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-white/5"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 hover:bg-white/5"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-white/5"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Categories
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 hover:bg-white/5"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 hover:bg-white/5"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Users
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-white/5"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left text-pink-400 hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
              >
                <AiOutlineLogin /> Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                <AiOutlineUserAdd className="mr-1" /> Register
              </Link>
            </div>
          )}

          <button
            className="rounded-lg p-2 text-white md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0b0b0d] px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">{navLinks}</nav>
          {!userInfo && (
            <div className="mt-3 flex gap-3">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navigation;

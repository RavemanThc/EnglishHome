"use client";

import { useAuth } from "@/context/AuthContext";

import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={`${css.header} `}>
      <div className={css.headerbox}>
        <Link href="/" className={css.Logobox}>
          <Image
            src="/Logo.svg"
            alt="English Home Logo"
            width={28}
            height={28}
            className={css.Logoimage}
          />
          LearnLingo
        </Link>
        <nav className={css.headerNavigation}>
          <Link href="/">Home</Link>
          <Link href="/teachers">Teachers</Link>
        </nav>
        {user ? (
          <>
            <span className={css.Username}>{user.displayName}</span>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className={css.headerAuthBox}>
              <button type="button" className={css.loginButton}>
                <svg width="20" height="20" className={css.loginIcon}>
                  <use href="/icons.svg#icon-login" />
                </svg>
                Login
              </button>
              <button type="button" className={css.registerButton}>
                Registration
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

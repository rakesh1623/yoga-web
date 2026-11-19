import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FiMoon, FiSun } from 'react-icons/fi';
// import Image from 'next/image';

const Navbar = ({ user, logout, cart, theme = 'light', onToggleTheme }) => {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 md:flex-nowrap md:px-6">
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo3.png" className="mr-3 h-10 md:h-14" alt="Aum Yoga" />
          <span className="text-xl font-bold md:text-2xl">Aum Yoga</span>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-gray-300 text-2xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose aria-hidden="true" /> : <AiOutlineMenu aria-hidden="true" />}
        </button>

        <div
          id="main-navigation"
          className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col gap-3 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:pt-0`}
        >
          <nav className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2" aria-label="Main navigation">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Classes', '/events'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded px-3 py-2 font-semibold hover:bg-[var(--color-canvas)] hover:text-[var(--color-primary)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-t border-[var(--color-border)] pt-3 md:border-0 md:pt-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--color-canvas)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              {theme === 'dark' ? <FiSun className="text-xl" aria-hidden="true" /> : <FiMoon className="text-xl" aria-hidden="true" />}
            </button>
            {!user?.value && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center rounded bg-gray-100 px-4 py-2 font-semibold hover:bg-gray-200"
              >
                LOGIN
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="ml-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}

            {user?.value && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-expanded={dropdown}
                  onClick={() => setDropdown(!dropdown)}
                  onBlur={(event) => {
                    if (!event.currentTarget.parentElement.contains(event.relatedTarget)) setDropdown(false);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <img src="/images/user.png" className="h-6" alt="" />
                </button>
                {dropdown && (
                  <ul className="absolute right-0 top-12 z-50 w-36 rounded bg-emerald-700 px-3 py-2 text-left text-white shadow-lg">
                    <li><Link href="/myAccount" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-black">My Account</Link></li>
                    <li><Link href="/orders" onClick={() => setMenuOpen(false)} className="block py-1 hover:text-black">Orders</Link></li>
                    <li><button type="button" onClick={logout} className="py-1 hover:text-black">Logout</button></li>
                  </ul>
                )}
              </div>
            )}

            {user?.value && (
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                aria-label={`Cart, ${Object.keys(cart || {}).length} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded hover:bg-gray-100"
              >
                <AiOutlineShoppingCart className="text-2xl" aria-hidden="true" />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-xs text-white">
                  {Object.keys(cart || {}).length}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar



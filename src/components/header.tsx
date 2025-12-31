"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Sun, Moon, User, ShoppingBag } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { clearData } from '@/lib/features/orderSlice'
import { RootState } from '@/lib/store'
import Image from 'next/image'
import logo from '../../public/logo-02.png'
import {Button} from './ui/button'
import { logOutUser } from '@/lib/features/userSlice'

const NavData = [
  { id: 1, title: "Home", path: "/", live: true },
  { id: 2, title: "How it works", path: "/how-it-works", live: true },
  { id: 3, title: "Pricing", path: "/pricing", live: true },
  { id: 4, title: "About us", path: "about-us", live: true },
  { id: 5, title: "Blog", path: "/blog", live: true },
  { id: 6, title: "FAQ", path: "/faq", live: true },
  { id: 7, title: "Contact Us", path: "/contact", live: true },
  { id: 8, title: "Admin Dashboard", path: "/admin/dashboard", live: true, protected: true },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  const { isLogin, user } = useSelector((state: any) => state.user)

  // Auto-close menu when route changes
  useEffect(() => {
    closeMenu()
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    if (user?._id) {
      dispatch(logOutUser(user._id) as any)
      dispatch(clearData())
      router.push('/')
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Handle theme toggle on mobile - prevent menu toggle
  const handleMobileThemeToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop event from bubbling to parent
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-background/80 backdrop-blur-md shadow-lg'
      : 'bg-background'
      }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <Image
              src={logo}
              alt='Launder Remedy Logo'
              width={120}
              height={40}
              className="object-contain w-28 h-auto sm:w-32 md:w-36 dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NavData
              .filter(item => {
                if (item.protected) {
                  return isLogin && (user?.type === 'admin' || user?.type === 'subadmin');
                }
                return true;
              })
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`text-sm font-medium transition-colors relative group ${pathname === item.path
                    ? 'text-primary'
                    : 'text-neutral-600 hover:text-primary'
                    }`}
                  onClick={closeMenu}
                >
                  {item.title}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === item.path ? 'w-full' : ''
                    }`} />
                </Link>
              ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button> 

            {/* User Actions */}
            {isLogin ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={closeMenu}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Log In
                </Button>
              </Link>
            )}

            {/* Place Order Button */}
            <Link href="/place-order" onClick={closeMenu}>
              <Button className="bg-primary hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all text-white">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Place Order
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileThemeToggle}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {NavData
                .filter(item => {
                  if (item.protected) {
                    return isLogin && (user?.type === 'admin' || user?.type === 'subadmin');
                  }
                  return true;
                })
                .map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`text-sm font-medium py-2 px-4 rounded-lg transition-colors ${pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                      }`}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                ))}

              <div className="pt-4 border-t border-neutral-200 flex flex-col space-y-3">
                {isLogin ? (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                      className="w-full"
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                )}

                <Link href="#" onClick={closeMenu}>
                {/* <Link href="/place-order" onClick={closeMenu}> */}
                  <Button className="w-full bg-primary hover:bg-primary-700 text-white">
                    Place Order
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
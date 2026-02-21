"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Sun, Moon, User, ShoppingBag, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { clearData } from '@/lib/features/orderSlice'
import { RootState } from '@/lib/store'
import Image from 'next/image'
import logo from '../../public/logo-02.png'
import {Button} from './ui/button'
import { logOutUser, logout } from '@/lib/features/userSlice'
import { getCookie, clearCookie } from '@/utils/helpers'

const NavData = [
  { id: 1, title: "Home", path: "/", live: true },
  { id: 2, title: "How it works", path: "/how-it-works", live: true },
  { id: 3, title: "Pricing", path: "/pricing", live: true },
  { id: 4, title: "About us", path: "about-us", live: true },
  { id: 5, title: "Blog", path: "/blog", live: true },
  { id: 6, title: "FAQ", path: "/faq", live: true },
  { id: 7, title: "Contact Us", path: "/contact", live: true },
  { id: 9, title: "Service Areas", path: "/service-areas", live: true },
  { id: 8, title: "Admin Dashboard", path: "/admin/dashboard", live: true, protected: true },
]

const Categories = [
  { id: 'laundry-services', title: 'Laundry Services', path: '/category/laundry-services' },
  { id: 'shirts-and-tops', title: 'Shirts & Tops Care', path: '/category/shirts-and-tops' },
  { id: 'elegant-suits', title: 'Elegant Suits Care', path: '/category/elegant-suits' },
  { id: 'dresses-and-skirts', title: 'Dresses & Skirts Care', path: '/category/dresses-and-skirts' },
  { id: 'trousers', title: 'Trousers Care', path: '/category/trousers' },
  { id: 'outdoor-clothing', title: 'Outdoor Clothing', path: '/category/outdoor-clothing' },
  { id: 'home-textiles', title: 'Home Textile Services', path: '/category/home-textiles' },
  { id: 'ironing', title: 'Ironing Services', path: '/category/ironing' },
  { id: 'alterations', title: 'Alterations', path: '/category/alterations' },
  { id: 'shoe-repair', title: 'Shoe Repair', path: '/category/shoe-repair' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const categoriesRef = useRef<HTMLDivElement>(null)

  const { isLogin, user } = useSelector((state: any) => state.user)

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // If persisted state says logged-in but no auth cookies remain, force local logout to avoid showing Log Out.
  useEffect(() => {
    const token = getCookie('user_token')
    if (!token && isLogin) {
      dispatch(logout())
      dispatch(clearData())
      clearCookie('refresh_token')
      clearCookie('user')
    }
  }, [dispatch, isLogin])

  // Listen for auth-logout event from API client
  useEffect(() => {
    const handleAuthLogout = () => {
      dispatch(logout())
      dispatch(clearData())
    }

    window.addEventListener('auth-logout', handleAuthLogout)
    return () => window.removeEventListener('auth-logout', handleAuthLogout)
  }, [dispatch])

  // Auto-close menu when route changes
  useEffect(() => {
    closeMenu()
    setIsCategoriesOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
            
            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className={`text-sm font-medium transition-colors relative group flex items-center gap-1 ${
                  pathname.startsWith('/category')
                    ? 'text-primary'
                    : 'text-neutral-600 hover:text-primary'
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${
                  pathname.startsWith('/category') ? 'w-full' : ''
                }`} />
              </button>
              
              {/* Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 py-2 z-50 animate-slide-down">
                  {Categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.path}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
              suppressHydrationWarning
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button> 

            {/* User Actions */}
            {isLogin ? (
              <>
                <Link href="/dashboard" onClick={closeMenu}>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
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
              
              {/* Mobile Categories Section */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between text-sm font-medium py-2 px-4 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-primary transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoriesOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {Categories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.path}
                        className="block text-sm py-2 px-4 rounded-lg text-neutral-500 hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={closeMenu}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-200 flex flex-col space-y-3">
                {isLogin ? (
                  <>
                    <Link href="/dashboard" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full flex items-center justify-center gap-2">
                        <User className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
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

                <Link href="/place-order" onClick={closeMenu}>
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
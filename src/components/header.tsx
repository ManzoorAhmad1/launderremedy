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
  { id: 4, title: "About us", path: "/about-us", live: true },
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
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const categoriesRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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
    setIsMobileCategoriesOpen(false)
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

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
    e.stopPropagation()
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* ── Fixed Header Bar ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg dark:bg-background/95'
          : 'bg-background dark:bg-background'
      }`}>
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo - responsive sizing */}
            <Link href="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
              <Image
                src={logo}
                alt='Launder Remedy Logo'
                width={120}
                height={40}
                className="object-contain w-20 h-auto sm:w-24 md:w-28 lg:w-32 dark:brightness-0 dark:invert transition-all"
                priority
              />
            </Link>

            {/* Desktop Navigation (hidden on mobile) */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {NavData
                .filter(item => {
                  if (item.protected) {
                    return mounted && isLogin && (user?.type === 'admin' || user?.type === 'subadmin');
                  }
                  return true;
                })
                .map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`text-xs xl:text-sm font-medium transition-colors relative group whitespace-nowrap ${
                      pathname === item.path
                        ? 'text-primary'
                        : 'text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.title}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${
                      pathname === item.path ? 'w-full' : ''
                    }`} />
                  </Link>
                ))}

              {/* Desktop Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={`text-xs xl:text-sm font-medium transition-colors relative group flex items-center gap-1 whitespace-nowrap ${
                    pathname.startsWith('/category') 
                      ? 'text-primary' 
                      : 'text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary'
                  }`}
                >
                  Services
                  <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform ${
                    isCategoriesOpen ? 'rotate-180' : ''
                  }`} />
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${
                    pathname.startsWith('/category') ? 'w-full' : ''
                  }`} />
                </button>
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 xl:w-64 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 max-h-[80vh] overflow-y-auto">
                    {Categories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.path}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="block px-4 py-2 text-xs xl:text-sm text-neutral-700 dark:text-neutral-300 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full w-8 h-8 xl:w-9 xl:h-9"
                suppressHydrationWarning
              >
                {mounted ? (
                  theme === 'dark' ? <Sun className="h-4 w-4 xl:h-5 xl:w-5" /> : <Moon className="h-4 w-4 xl:h-5 xl:w-5" />
                ) : (
                  <Sun className="h-4 w-4 xl:h-5 xl:w-5" />
                )}
              </Button>

              {isLogin ? (
                <>
                  <Link href="/dashboard" onClick={closeMenu}>
                    <Button variant="ghost" className="flex items-center gap-1 xl:gap-2 text-xs xl:text-sm px-2 xl:px-3">
                      <User className="h-3 w-3 xl:h-4 xl:w-4" />
                      <span className="hidden xl:inline">Dashboard</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout} 
                    className="border-primary text-primary hover:bg-primary/10 text-xs xl:text-sm px-2 xl:px-3"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={closeMenu}>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 text-xs xl:text-sm px-2 xl:px-3">
                    Log In
                  </Button>
                </Link>
              )}

              <Link href="/place-order" onClick={closeMenu}>
                <Button className="bg-primary hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all text-white text-xs xl:text-sm px-2 xl:px-4">
                  <ShoppingBag className="mr-1 xl:mr-2 h-3 w-3 xl:h-4 xl:w-4" />
                  <span className="hidden xl:inline">Place Order</span>
                  <span className="xl:hidden">Order</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Actions - Optimized for small screens */}
            <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleMobileThemeToggle} 
                className="rounded-full w-8 h-8 sm:w-9 sm:h-9"
              >
                {mounted ? (
                  theme === 'dark' ? 
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : 
                    <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
              
              {/* Mobile Place Order Icon */}
              <Link href="/place-order" onClick={closeMenu} className="sm:hidden">
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                  <ShoppingBag className="h-4 w-4" />
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu} 
                className="rounded-full w-8 h-8 sm:w-9 sm:h-9"
              >
                {isMenuOpen ? 
                  <X className="h-4 w-4 sm:h-5 sm:w-5" /> : 
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                }
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu Overlay ── */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 z-[9999] lg:hidden flex flex-col bg-background dark:bg-background transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto translate-y-0' 
            : 'opacity-0 pointer-events-none translate-y-4'
        }`}
        style={{ top: '56px' }} // Adjust based on header height
      >
        {/* Scrollable nav content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="flex flex-col px-3 sm:px-4 py-3 sm:py-4 space-y-0.5 sm:space-y-1">
            {NavData
              .filter(item => {
                if (item.protected) {
                  return mounted && isLogin && (user?.type === 'admin' || user?.type === 'subadmin');
                }
                return true;
              })
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={closeMenu}
                  className={`block w-full text-sm sm:text-base font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl transition-colors ${
                    pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary'
                  }`}
                >
                  {item.title}
                </Link>
              ))}

            {/* Mobile Categories Section */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 mt-2">
              <button
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="w-full flex items-center justify-between text-sm sm:text-base font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary transition-colors"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                  isMobileCategoriesOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Categories dropdown with smooth animation */}
              <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isMobileCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="mt-1 space-y-0.5 pl-3 sm:pl-4 pr-2">
                  {Categories.map((category) => (
                    <Link
                      key={category.id}
                      href={category.path}
                      onClick={closeMenu}
                      className="block w-full text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom actions - Mobile Only */}
        <div className="shrink-0 px-3 sm:px-4 py-3 sm:py-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2 sm:gap-3 bg-background dark:bg-background">
          {isLogin ? (
            <>
              <Link href="/dashboard" onClick={closeMenu}>
                <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-2.5">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                onClick={() => { 
                  handleLogout(); 
                  closeMenu(); 
                }} 
                className="w-full text-sm sm:text-base py-2 sm:py-2.5"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={closeMenu} className="w-full">
              <Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-2.5">
                Log In
              </Button>
            </Link>
          )}
          
          {/* Place Order button (visible in menu for all mobile screens) */}
          <Link href="/place-order" onClick={closeMenu} className="w-full">
            <Button className="w-full bg-primary hover:bg-primary-700 text-white text-sm sm:text-base py-2 sm:py-2.5">
              <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Place Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[56px] sm:h-[64px] md:h-[72px] lg:h-[80px]" />
    </>
  )
}
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RotatingModel from '@/components/RotatingModel';

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src="/logo.png" alt="GymFlow Logo" width={40} height={40} />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link href="/classes" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Classes</Link>
                  <Link href="/trainers" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Trainers</Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="default" className="ml-4">Login</Button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link href="/classes" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Classes</Link>
              <Link href="/trainers" className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Trainers</Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="default" className="ml-auto">Login</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
      <section className="relative bg-opacity-5 bg-gray-50 dark:bg-gray-800 overflow-hidden bg-floating-cogs ">
      <div className="backdrop-blur">
      <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-opacity-5 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-10 sm:pt-16 lg:pt-14 lg:pb-20 sm:px-6 lg:px-6"
              >
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Transform your body</span>{' '}
                    <span className="block text-blue-600 xl:inline">with GymFlow</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Join our state-of-the-art gym and experience personalized training sessions, expert guidance, and a supportive community.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Button size="lg" className="w-full">Get started</Button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Button variant="outline" size="lg" className="w-full">Learn more</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
              <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <RotatingModel />
              </div> 
          </div>  
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to get fit
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
                GymFlow offers a comprehensive suite of features to help you achieve your fitness goals.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    name: 'Expert Trainers',
                    description: 'Our certified trainers provide personalized guidance to help you reach your goals.',
                  },
                  {
                    name: 'Flexible Scheduling',
                    description: 'Book classes that fit your schedule with our easy-to-use online booking system.',
                  },
                  {
                    name: 'State-of-the-art Equipment',
                    description: 'Access to top-of-the-line fitness equipment for all your workout needs.',
                  },
                  {
                    name: 'Community Support',
                    description: 'Join a supportive community of like-minded individuals on their fitness journey.',
                  },
                ].map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        {/* Icon placeholder */}
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-600 dark:text-gray-300">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  Login to Your Account
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                  Access your personalized dashboard, book classes, and manage your fitness journey.
                </p>
                <div className="mt-8">
                  <form className="space-y-6">
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1" />
                    </div>
                    <div>
                      <Button type="submit" className="w-full">Sign in</Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 md:mt-0">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  New to GymFlow?
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                  Join our community today and start your fitness journey with expert guidance and support.
                </p>
                <div className="mt-8">
                  <Button variant="outline" size="lg" className="w-full">
                    Create an account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Add social media icons here */}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-500 dark:text-gray-400">
              &copy; 2024 GymFlow, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
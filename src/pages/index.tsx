import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RotatingModel from '@/components/RotatingModel';
import router from 'next/router';
import NavBar from '@/components/NavBar';
import { login } from './api/auth';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      // Assuming the response contains success and redirects accordingly
      router.push('/dashboard'); // Redirect to dashboard
    } catch {
      setError('Invalid credentials, please try again.'); // Set error message based on response
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
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
                    <span className="block text-blue-600 xl:inline">with GymXYZ</span>
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
                GymXYZ offers a comprehensive suite of features to help you achieve your fitness goals.
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

        <section id="login" className="py-12 bg-gray-50 dark:bg-gray-800">
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
                  <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        className="mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-12 right-3 pr-0 flex items-center text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 md:mt-0">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  New to GymXYZ?
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                  Join our community today and start your fitness journey with expert guidance and support.
                </p>
                <div className="mt-8">
                  <Button size="lg" className="w-full" onClick={() => router.push('/register')}>
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
              &copy; 2024 GymXYZ, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
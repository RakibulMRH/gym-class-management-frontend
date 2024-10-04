import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import RotatingModel from '@/components/RotatingModel';
import NavBar from '@/components/NavBar'; 
import Footer from '@/components/Footer';
import router from 'next/router';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-floating-cogs">
        <div className="backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Transform your body</span>{' '}
                  <span className="block text-blue-600 xl:inline">with GymXYZ</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join our state-of-the-art gym and experience personalized training sessions, expert guidance, and a supportive community.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button size="lg" className="w-full" onClick={() => router.push('/register')}>Get started</Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button variant="outline" size="lg" className="w-full">Learn more</Button>
                  </div>
                </div>
              </motion.div>
              <div className="mt-10 lg:mt-0 relative h-64 sm:h-72 md:h-96 lg:h-full">
                <RotatingModel />
              </div>
            </div>
          </div>
        </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-800">
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

        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Ready to start your fitness journey?
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
                Join GymXYZ today and transform your body with our expert trainers and state-of-the-art facilities.
              </p>
              <div className="mt-8">
                <Button size="lg" className="px-8" onClick={() => router.push('/register')}>
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
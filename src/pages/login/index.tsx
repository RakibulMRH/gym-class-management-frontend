import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  userId: number;
  role: string;
  email: string;
  name: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.role === 'ADMIN') {
        router.push('/admin/dashboard'); // Redirect to admin dashboard
        
      } 

      if (decoded.role === 'TRAINER') {
        router.push('/trainer/dashboard'); // Redirect to TRAINEER dashboard
        
      }
      if (decoded.role === 'TRAINEE') {
        router.push('/trainee/dashboard'); // Redirect to TRAINEE dashboard
        
      }  
    }
  }, [token, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Enter your email and password to access your account
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {isPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium dark:text-black text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </div>
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
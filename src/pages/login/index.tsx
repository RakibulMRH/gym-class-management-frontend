import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push('/dashboard'); // Redirect to dashboard after successful login
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
      <main>
        <section id="login" className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  Login to Your Account
                </h2>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-11 right-3 pr-0 flex items-center text-gray-400"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                      <Button type="submit" className="w-full" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Signing in...' : 'Sign in'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

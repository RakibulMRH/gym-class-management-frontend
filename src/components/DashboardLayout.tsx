import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NavBar from './NavBar';
import Footer from './Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { token, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status !== 'loading' && !token) {
      router.push('/login');
    }
  }, [status, token, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null; // Return null while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
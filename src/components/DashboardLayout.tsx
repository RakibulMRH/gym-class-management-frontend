import React, { ReactNode } from 'react';
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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!token) {
    router.push('/login');
    return null;
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
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ReactNode } from 'react';

interface RootState {
  auth: {
    token: string | null;
  };
}

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [token, router]);

  if (!token) {
    return null; // Render nothing until redirect
  }

  return children;
};

export default RouteGuard;

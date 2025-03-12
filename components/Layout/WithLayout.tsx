"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { useRouter } from 'next/navigation';
import {PacmanLoader } from 'react-spinners'
const WithAuth = (WrappedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('authtoken');
        if (token) {
          try {
            const tokenInfo = JSON.parse(token);
            setUser(tokenInfo.user);
          } catch (error) {
            console.error('Error parsing token:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      };

      checkAuth();
    }, []);

    useEffect(() => {
      if (!loading && !user) {
        console.log('You must Log in');
        router.push('/auth/login'); // Redirect to login page
      }
    }, [user, loading, router]);

    if (loading) {
      return <div className='loader-overlay'><PacmanLoader size={5} color='#ffffff'/></div>; // Or any loading indicator
    }

    if (!user) {
      return null;
    }

    return (
      <div>
        <Navbar onLoginClick={() => setIsLoginOpen(true)}/>
        <div className='pt-16'>
          <WrappedComponent {...props} user={user} setUser={setUser} />
        </div>
      </div>
    );
  };

  HOC.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return HOC;
};

const getDisplayName = (WrappedComponent: React.ComponentType) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default WithAuth;
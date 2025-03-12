"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'
import useUserActivity from "../../hooks/useUserActivity";

const WithAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const [user, setUser] = useState<any>();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    useUserActivity();
    useEffect(() => {
      if (localStorage.getItem('authtoken')) {
        const tokenInfo = JSON.parse(localStorage.getItem('authtoken') as string)
        setUser(tokenInfo.user)
      }
    }, [])

    useEffect(() => {
      if (!user) {
        router.replace('/auth/login')
      }
    }, [user]);

    return user ?
      <div>
        <Navbar onLoginClick={() => setIsLoginOpen(true)}/>
        <div>
          <WrappedComponent {...props} user={user} setUser={setUser} />
        </div>
      </div>
      : null;
  };
};

WithAuth.displayName = "WithAuth";

export default WithAuth;
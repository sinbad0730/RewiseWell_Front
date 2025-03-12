"use client";

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../store/slices/activitySlice';
import { RootState } from '@/store/store';
import axios from 'axios';
import { API_BASE_URL } from '@/utils/axios';

const useUserActivity = () => {
  const dispatch = useDispatch();
  const activity = useSelector((state: RootState) => state.activity);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tokenData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authtoken') || '{}') : {};

  let count = 0
  useEffect(() => {
    if (typeof window === 'undefined') return; // Early return if not in browser environment

    const handleMouseEnter = () => {
      dispatch(setActive({ isActive: true })); // Set active to true when the mouse enters
    };

    const handleMouseLeave = () => {
      dispatch(setActive({ isActive: false })); // Set active to false when the mouse leaves
    };

    const handleMouseOver = () => {
      dispatch(setActive({ isActive: true })); // Set active to true when the mouse is over the page
    };

    const handleActivity = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch(setActive({ isActive: true }));
      timer();
    };

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mouseenter', handleMouseEnter); // Detect mouse entering
    window.addEventListener('mouseleave', handleMouseLeave); // Detect mouse leaving
    window.addEventListener('mouseover', handleMouseOver);

    if (tokenData.user?.id !== undefined) {
      const interval = setInterval(() => {
        dispatch(setActive({ isActive: true, time: activity.time ? activity.time + 1 : 1 }));
        if (activity.time && count < activity.time) {
          count++;
          // axios.get(`${API_BASE_URL}/activity/${tokenData?.user?.id}/${tokenData?.user?.firstName + ' ' + tokenData?.user?.lastName}`, {
          //   headers: {
          //     'Authorization': `Bearer ${tokenData.access_token}`,
          //   }
          // })
        }
      }, 60000);
      if (activity.isActive === false) {
        clearInterval(interval)
      }
      return () => clearInterval(interval);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mouseenter', handleMouseEnter); // Clean up
      window.removeEventListener('mouseleave', handleMouseLeave); // Clean up
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [activity]);

  const timer = () => {
    timeoutRef.current = setTimeout(async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authtoken');
        const currentTime = new Date().getTime();
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

        if (token) {
          const tokenData = JSON.parse(token);
          let starCreatedAt = tokenData.starCreatedAt
          if (starCreatedAt === null) {
            starCreatedAt = new Date().toISOString()
          }
          if (!tokenData.star || currentTime - new Date(starCreatedAt).getTime() > oneDayInMilliseconds) {
            tokenData.star++;
            tokenData.starCreatedAt = new Date().toISOString()
            localStorage.setItem('authtoken', JSON.stringify(tokenData));
            try {
              await axios.get(`${API_BASE_URL}/users/set_star/${tokenData?.user?.id}`, {
                headers: {
                  'Authorization': `Bearer ${tokenData.access_token}`,
                }
              }).then((res: any) => {

                localStorage.setItem('authtoken', JSON.stringify({
                  ...tokenData,
                  star: res.data.star,
                  starCreatedAt: res.data.star_at,
                }));
              });
            } catch (error) {
              console.log("error", error)
            }
          }
        }
      }
    }, 1000 * 60 * 15);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return; // Early return if not in browser environment

    const handleMouseEnter = () => {
      dispatch(setActive({ isActive: true })); // Set active to true when the mouse enters
    };

    const handleMouseLeave = () => {
      dispatch(setActive({ isActive: false })); // Set active to false when the mouse leaves
    };

    const handleMouseOver = () => {
      dispatch(setActive({ isActive: true })); // Set active to true when the mouse is over the page
    };

    const handleActivity = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch(setActive({ isActive: true }));
      timer();
    };

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mouseenter', handleMouseEnter); // Detect mouse entering
    window.addEventListener('mouseleave', handleMouseLeave); // Detect mouse leaving
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mouseenter', handleMouseEnter); // Clean up
      window.removeEventListener('mouseleave', handleMouseLeave); // Clean up
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [dispatch]);

  return null; // If you need to return something, modify this accordingly
};

export default useUserActivity;
'use client'
import { registerServiceWorker } from '@/lib/registerServiceWorker';
import store from '@/redux/store';
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';


export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);
    return <Provider store={store}>{children}</Provider>;
  }

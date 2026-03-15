'use client';

import { useEffect, useState, useCallback } from 'react';

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  updateAvailable: boolean;
  installPrompt: any;
}

export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOffline: false,
    updateAvailable: false,
    installPrompt: null
  });

  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setState(prev => ({ ...prev, isInstalled: true }));
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setState(prev => ({
        ...prev,
        isInstallable: true,
        installPrompt: e
      }));
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        installPrompt: null
      }));
    };

    // Listen for online/offline
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOffline: false }));
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOffline: true }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial offline check
    setState(prev => ({ ...prev, isOffline: !navigator.onLine }));

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered:', reg);
          setRegistration(reg);

          // Check for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setState(prev => ({ ...prev, updateAvailable: true }));
                }
              });
            }
          });
        })
        .catch((err) => {
          console.error('[PWA] Service Worker registration failed:', err);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_AVAILABLE') {
          setState(prev => ({ ...prev, updateAvailable: true }));
        }
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const install = useCallback(async () => {
    if (!state.installPrompt) return false;

    state.installPrompt.prompt();
    const { outcome } = await state.installPrompt.userChoice;
    
    setState(prev => ({
      ...prev,
      isInstallable: outcome !== 'accepted',
      installPrompt: null
    }));

    return outcome === 'accepted';
  }, [state.installPrompt]);

  const update = useCallback(async () => {
    if (!registration?.waiting) return;

    // Send skip waiting message
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    
    // Reload to activate new service worker
    window.location.reload();
  }, [registration]);

  const checkForUpdates = useCallback(async () => {
    if (!registration) return;
    
    try {
      await registration.update();
    } catch (error) {
      console.error('[PWA] Update check failed:', error);
    }
  }, [registration]);

  // Subscribe to push notifications
  const subscribeToPush = useCallback(async () => {
    if (!registration) return null;

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      });

      // Send subscription to server
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });

      return subscription;
    } catch (error) {
      console.error('[PWA] Push subscription failed:', error);
      return null;
    }
  }, [registration]);

  // Unsubscribe from push notifications
  const unsubscribeFromPush = useCallback(async () => {
    if (!registration) return;

    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        
        // Notify server
        await fetch('/api/notifications/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        });
      }
    } catch (error) {
      console.error('[PWA] Push unsubscribe failed:', error);
    }
  }, [registration]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  return {
    ...state,
    registration,
    install,
    update,
    checkForUpdates,
    subscribeToPush,
    unsubscribeFromPush,
    requestNotificationPermission
  };
}

// Hook for background sync
export function useBackgroundSync() {
  const sync = useCallback(async (tag: string) => {
    if (!('sync' in navigator.serviceWorker)) {
      console.warn('[PWA] Background sync not supported');
      return false;
    }

    try {
      await navigator.serviceWorker.ready;
      await (navigator.serviceWorker as any).sync.register(tag);
      return true;
    } catch (error) {
      console.error('[PWA] Background sync registration failed:', error);
      return false;
    }
  }, []);

  return { sync };
}

// Hook for offline storage
export function useOfflineStorage() {
  const saveForLater = useCallback(async (storeName: string, data: any) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('looporb-offline', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        const addRequest = store.add({
          ...data,
          timestamp: new Date().toISOString(),
          synced: false
        });
        
        addRequest.onsuccess = () => resolve(addRequest.result);
        addRequest.onerror = () => reject(addRequest.error);
      };
    });
  }, []);

  const getPending = useCallback(async (storeName: string) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('looporb-offline', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const getAll = store.getAll();
        
        getAll.onsuccess = () => {
          const items = getAll.result.filter((item: any) => !item.synced);
          resolve(items);
        };
        getAll.onerror = () => reject(getAll.error);
      };
    });
  }, []);

  return { saveForLater, getPending };
}

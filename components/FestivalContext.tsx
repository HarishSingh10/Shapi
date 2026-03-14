'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Festival = 'none' | 'diwali' | 'holi' | 'christmas' | 'new-year';

interface FestivalContextType {
  activeFestival: Festival;
  announcementText: string;
  setFestival: (festival: Festival) => void;
  updateAnnouncement: (text: string) => void;
  saveSettings: () => Promise<void>;
  festivalConfig: {
    primaryColor: string;
    secondaryColor: string;
    animationType: string;
    greeting: string;
  };
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export function FestivalProvider({ children }: { children: React.ReactNode }) {
  const [activeFestival, setActiveFestival] = useState<Festival>('none');
  const [announcementText, setAnnouncementText] = useState("CELEBRATE FESTIVALS WITH SAPI'S PREMIUM COLLECTION - UP TO 25% OFF");
  const [loading, setLoading] = useState(true);

  // Fetch settings from DB on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings/festival');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (data.activeFestival) {
          setActiveFestival(data.activeFestival);
        }
        if (data.announcementText) {
          setAnnouncementText(data.announcementText);
        }
      } catch (err) {
        console.error('Failed to sync settings with DB, using local fallback:', err);
        const savedFest = localStorage.getItem('sapis-active-festival') as Festival;
        const savedText = localStorage.getItem('sapis-announcement-text');
        if (savedFest) setActiveFestival(savedFest);
        if (savedText) setAnnouncementText(savedText);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const setFestival = (fest: Festival) => {
    setActiveFestival(fest);
  };

  const updateAnnouncement = (text: string) => {
    setAnnouncementText(text);
  };

  const saveSettings = async () => {
    try {
      await fetch('/api/settings/festival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ festival: activeFestival, announcementText }),
      });
      localStorage.setItem('sapis-active-festival', activeFestival);
      localStorage.setItem('sapis-announcement-text', announcementText);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to update settings in DB:', err);
      alert('Failed to save settings.');
    }
  };

  const getFestivalConfig = () => {
    switch (activeFestival) {
      case 'diwali':
        return {
          primaryColor: '#D4AF37', // Gold
          secondaryColor: '#FF4D00', // Deep Orange
          animationType: 'fireworks',
          greeting: 'Shubh Deepavali!'
        };
      case 'holi':
        return {
          primaryColor: '#E91E63', // Vibrant Pink
          secondaryColor: '#2196F3', // Bright Blue
          animationType: 'colors',
          greeting: 'Happy Holi!'
        };
      case 'christmas':
        return {
          primaryColor: '#C41E3A', // Cardinal Red
          secondaryColor: '#228B22', // Forest Green
          animationType: 'snow',
          greeting: 'Merry Christmas!'
        };
      case 'new-year':
        return {
          primaryColor: '#7DF9FF', // Electric Blue
          secondaryColor: '#B87333', // Copper
          animationType: 'confetti',
          greeting: 'Happy New Year 2026!'
        };
      default:
        return {
          primaryColor: '#D4AF37',
          secondaryColor: '#F4CF57',
          animationType: 'none',
          greeting: ''
        };
    }
  };

  return (
    <FestivalContext.Provider value={{ 
      activeFestival, 
      announcementText, 
      setFestival, 
      updateAnnouncement, 
      saveSettings,
      festivalConfig: getFestivalConfig() 
    }}>
      {children}
    </FestivalContext.Provider>
  );
}

export function useFestival() {
  const context = useContext(FestivalContext);
  if (!context) throw new Error('useFestival must be used within a FestivalProvider');
  return context;
}

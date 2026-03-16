"use client";

import { useState, useEffect, useCallback } from "react";

interface GuestData {
  votes: Record<string, "for" | "against" | "abstain">;
  bookmarks: string[];
  formDrafts: Record<string, any>;
  preferences: {
    theme?: "light" | "dark";
    language?: string;
  };
}

const STORAGE_KEY = "looporb_guest_data";

// Initialize default guest data
const defaultGuestData: GuestData = {
  votes: {},
  bookmarks: [],
  formDrafts: {},
  preferences: {},
};

export function useGuestStorage() {
  const [data, setData] = useState<GuestData>(defaultGuestData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData({ ...defaultGuestData, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load guest data:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  const saveData = useCallback((newData: Partial<GuestData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save guest data:", error);
      }
      return updated;
    });
  }, []);

  // Record a vote
  const recordVote = useCallback((proposalId: string, vote: "for" | "against" | "abstain") => {
    saveData({
      votes: { ...data.votes, [proposalId]: vote },
    });
  }, [data.votes, saveData]);

  // Get recorded vote for a proposal
  const getVote = useCallback((proposalId: string) => {
    return data.votes[proposalId] || null;
  }, [data.votes]);

  // Toggle bookmark
  const toggleBookmark = useCallback((itemId: string) => {
    const isBookmarked = data.bookmarks.includes(itemId);
    const newBookmarks = isBookmarked
      ? data.bookmarks.filter((id) => id !== itemId)
      : [...data.bookmarks, itemId];
    
    saveData({ bookmarks: newBookmarks });
    return !isBookmarked;
  }, [data.bookmarks, saveData]);

  // Check if item is bookmarked
  const isBookmarked = useCallback((itemId: string) => {
    return data.bookmarks.includes(itemId);
  }, [data.bookmarks]);

  // Save form draft
  const saveFormDraft = useCallback((formId: string, draftData: any) => {
    saveData({
      formDrafts: { ...data.formDrafts, [formId]: draftData },
    });
  }, [data.formDrafts, saveData]);

  // Get form draft
  const getFormDraft = useCallback((formId: string) => {
    return data.formDrafts[formId] || null;
  }, [data.formDrafts]);

  // Clear form draft
  const clearFormDraft = useCallback((formId: string) => {
    const { [formId]: removed, ...rest } = data.formDrafts;
    saveData({ formDrafts: rest });
  }, [data.formDrafts, saveData]);

  // Save preference
  const savePreference = useCallback((key: string, value: any) => {
    saveData({
      preferences: { ...data.preferences, [key]: value },
    });
  }, [data.preferences, saveData]);

  // Get preference
  const getPreference = useCallback((key: string) => {
    return data.preferences[key as keyof typeof data.preferences];
  }, [data.preferences]);

  // Clear all guest data (call this after registration/login)
  const clearAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(defaultGuestData);
    } catch (error) {
      console.error("Failed to clear guest data:", error);
    }
  }, []);

  // Migrate guest data to user account (call this after successful registration)
  const migrateToUser = useCallback(async (userId: string) => {
    try {
      // In production, send this data to your backend to associate with user account
      const dataToMigrate = { ...data };
      
      // Example API call:
      // await fetch("/api/users/migrate-guest-data", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ userId, ...dataToMigrate }),
      // });

      console.log("Migrating guest data for user:", userId, dataToMigrate);
      
      // Clear after successful migration
      clearAll();
      
      return true;
    } catch (error) {
      console.error("Failed to migrate guest data:", error);
      return false;
    }
  }, [data, clearAll]);

  return {
    data,
    isLoaded,
    recordVote,
    getVote,
    toggleBookmark,
    isBookmarked,
    saveFormDraft,
    getFormDraft,
    clearFormDraft,
    savePreference,
    getPreference,
    clearAll,
    migrateToUser,
  };
}

// Helper component to wrap your app with guest storage
export function GuestStorageProvider({ children }: { children: React.ReactNode }) {
  return children;
}

import { useEffect, useCallback } from 'react';

interface KeyboardShortcutsProps {
  generateTweet?: () => void;
  analyzeTweet?: () => void;
  activeTab: string;
  toggleEmojiPanel?: () => void;
}

/**
 * Hook to manage keyboard shortcuts in the tweet generator application
 * 
 * @param generateTweet - Function to generate tweets
 * @param analyzeTweet - Function to analyze tweets
 * @param activeTab - Current active tab ("generate" or "analyze")
 * @param toggleEmojiPanel - Function to toggle the emoji panel visibility
 */
export const useKeyboardShortcuts = ({
  generateTweet,
  analyzeTweet,
  activeTab,
  toggleEmojiPanel
}: KeyboardShortcutsProps) => {
  // Handle Alt+Enter for generating/analyzing tweets
  const handleAltEnter = useCallback((e: KeyboardEvent) => {
    if (e.altKey && e.key === 'Enter') {
      e.preventDefault();
      
      if (activeTab === 'generate' && generateTweet) {
        generateTweet();
      } else if (activeTab === 'analyze' && analyzeTweet) {
        analyzeTweet();
      }
    }
  }, [activeTab, generateTweet, analyzeTweet]);

  // Handle Windows+. (Period) for emoji panel
  const handleEmojiShortcut = useCallback((e: KeyboardEvent) => {
    // Check for Windows key (metaKey) + period
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      e.preventDefault();
      
      if (toggleEmojiPanel) {
        toggleEmojiPanel();
      }
    }
  }, [toggleEmojiPanel]);

  useEffect(() => {
    // Add event listeners
    document.addEventListener('keydown', handleAltEnter);
    document.addEventListener('keydown', handleEmojiShortcut);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('keydown', handleAltEnter);
      document.removeEventListener('keydown', handleEmojiShortcut);
    };
  }, [handleAltEnter, handleEmojiShortcut]);
};

export default useKeyboardShortcuts;
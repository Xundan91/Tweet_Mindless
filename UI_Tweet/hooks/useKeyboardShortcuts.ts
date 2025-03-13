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
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Alt+Enter shortcut for generate/analyze
    if (e.altKey && e.key === 'Enter') {
      e.preventDefault();
      
      if (activeTab === 'generate' && generateTweet) {
        generateTweet();
      } else if (activeTab === 'analyze' && analyzeTweet) {
        analyzeTweet();
      }
    }
    
    // Windows/Command + . for emoji panel
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      e.preventDefault();
      if (toggleEmojiPanel) {
        toggleEmojiPanel();
      }
    }
  }, [activeTab, generateTweet, analyzeTweet, toggleEmojiPanel]);

  useEffect(() => {
    // Add event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;
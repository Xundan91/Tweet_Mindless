import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
};

export const copyImageToClipboard = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const item = new ClipboardItem({ [blob.type]: blob });
    await navigator.clipboard.write([item]);

    return true;
  } catch (error) {
    console.error("Failed to copy image:", error);
    return false;
  }
};

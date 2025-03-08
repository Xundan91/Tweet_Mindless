"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-2",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md rounded-lg p-4 flex items-center space-x-4",
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      className
    )}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute top-2 right-2 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700",
      className
    )}
    {...props}
  >
    <X className="w-4 h-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

// ✅ Add useToast hook
export function useToast() {
  const [open, setOpen] = React.useState(false);
  const [toastContent, setToastContent] = React.useState<{ title: string; description?: string } | null>(null);

  const showToast = (title: string, description?: string) => {
    setToastContent({ title, description });
    setOpen(true);
    setTimeout(() => setOpen(false), 3000); // Auto-close after 3 seconds
  };

  return {
    showToast,
    ToastComponent: open && toastContent ? (
      <ToastPrimitives.Root open={open} onOpenChange={setOpen}>
        <ToastTitle>{toastContent.title}</ToastTitle>
        {toastContent.description && <ToastDescription>{toastContent.description}</ToastDescription>}
        <ToastClose />
      </ToastPrimitives.Root>
    ) : null,
  };
}

export { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport };

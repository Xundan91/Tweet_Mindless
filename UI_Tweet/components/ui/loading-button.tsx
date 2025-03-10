'use client';

import { Button } from "./button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? (
        <motion.div
          className="flex items-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="mr-2 h-4 w-4" />
          <span>Logging in...</span>
        </motion.div>
      ) : (
        children
      )}
    </Button>
  );
}
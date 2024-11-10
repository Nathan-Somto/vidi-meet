import React from 'react';
import Text from './Text'
import Box from './Box'
import { useEffect, useState } from 'react';
import { create } from 'zustand';
type ToastNotificationProps = {
  message: string;
  variant?: 'success' | 'error' | 'info';
  duration?: number;
};
type UseToastStore = {
  showToast: boolean;
  details: ToastNotificationProps;
  toast: (details: ToastNotificationProps) => void;
  removeToast: () => void;
};
const useToastStore = create<UseToastStore>((set) => ({
  showToast: false,
  details: {
    message: '',
    variant: 'info',
    duration: 3000,
  },
  toast: ({ message, variant, duration }: ToastNotificationProps) => {
    set({ showToast: true, details: { message, variant, duration } });
  },
  removeToast: () =>
    set({ showToast: false, details: { message: '', variant: 'info', duration: 3000 } }),
}));
function ToastNotification({ message, variant = 'info', duration = 3000 }: ToastNotificationProps) {
  const [visible, setVisible] = useState(true);
  const { removeToast } = useToastStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
        removeToast();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const backgroundColor =
    variant === 'success' ? 'success' : variant === 'error' ? 'destructive' : 'text';

  if (!visible) return null;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      backgroundColor={backgroundColor}
      padding={'m_16'}
      width="100%"
      alignItems="center"
      zIndex={9999}>
      <Text variant="body" color="white">
        {message}
      </Text>
    </Box>
  );
}
export function useToast() {
  const { showToast, details, toast } = useToastStore();
  const ToastContainer = () =>
    showToast ? (
      <ToastNotification
        message={details.message}
        variant={details.variant}
        duration={details.duration}
      />
    ) : (
      <></>
    );
  return { toast, ToastContainer };
}

import { useContext } from 'react';
import { NotificationContext, NotificationService } from '../context/NotificationContext';

export const useNotification = (): NotificationService => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
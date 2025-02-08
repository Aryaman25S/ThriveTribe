import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const useNotifications = () => {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);
};

export default useNotifications;

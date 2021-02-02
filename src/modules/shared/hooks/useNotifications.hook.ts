import { useCallback, useState } from 'react';

import { Notification, NotificationType } from '../models/Notification.model';
import { randomString } from '../utils/strings.util';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback(
    (id: string) => {
      setNotifications(notifications.filter(n => n.id !== id));
    },
    [notifications]
  );

  const addNotification = useCallback(
    (type: NotificationType, text: string) => {
      setNotifications([...notifications, { text, type, id: randomString() }]);
    },
    [notifications]
  );

  return {
    notifications,
    removeNotification,
    addNotification,
  };
};

export default useNotifications;

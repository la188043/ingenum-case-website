import React from 'react';

import { Notification as Notif } from '../models/Notification.model';
import Notification from './Notification';

interface Props {
  notif: Notif[];
  removeNotif: (notifId: string) => void;
}

const NotificationContainer = ({ notif, removeNotif }: Props) => (
  <>
    {notif.map(n => (
      <Notification
        key={n.id}
        onCloseClick={() => removeNotif(n.id)}
        text={n.text}
        type={n.type}
      />
    ))}
  </>
);

export default NotificationContainer;

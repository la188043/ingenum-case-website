import React, { useEffect } from 'react';
import classNames from 'classnames';

import Button from './Button';
import { NotificationType } from '../models/Notification.model';

interface Props {
  text: string;
  type?: NotificationType;
  onCloseClick: () => void;
}

const Notification = ({ text, type, onCloseClick }: Props) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onCloseClick();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'is-success';
      case 'warning':
        return 'is-warning';
      case 'error':
        return 'is-danger';
      case 'info':
        return 'is-info';
    }
  };

  return (
    <div
      className={classNames('notification', getColor(), 'notification-popup')}
    >
      <button className="delete" onClick={onCloseClick} />

      {text}
    </div>
  );
};

export default Notification;

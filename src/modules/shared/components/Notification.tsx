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
        return 'notification--success';
      case 'warning':
        return 'notification--warning';
      case 'error':
        return 'notification--danger';
      case 'info':
        return 'notification--info';
    }
  };

  return (
    <div className={classNames('notification', getColor())}>
      <Button
        type="button"
        value=""
        className="btn--danger"
        onClick={onCloseClick}
      />

      {text}
    </div>
  );
};

export default Notification;

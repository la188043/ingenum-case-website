import React from 'react';
import classNames from 'classnames';

export interface Props {
  type: 'button' | 'reset' | 'submit';
  value?: string;
  className?: string;
  iconName?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  showLoader?: boolean;
}

const Button = ({
  className,
  value,
  type,
  iconName,
  onClick,
  style,
  disabled,
  showLoader,
}: Props) => {
  const renderIcon = () => {
    if (!iconName) {
      return null;
    }

    return (
      <span className="icon">
        <i className={classNames('fas', iconName)} />
      </span>
    );
  };

  return (
    <button
      type={type}
      className={classNames('btn', className, { 'is-loading': showLoader })}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
      {renderIcon()}
    </button>
  );
};

export default Button;

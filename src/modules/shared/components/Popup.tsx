import { PropsWithChildren } from 'react';

const Popup = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return children as JSX.Element;
};

export default Popup;

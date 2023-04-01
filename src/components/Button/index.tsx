import classNames from 'classnames';
import React from 'react';

import s from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  variant?: string;
};

export const Button: React.FC<Props> = ({ children, variant }) => {
  return <button className={classNames(s.btn, variant)}>{children}</button>;
};

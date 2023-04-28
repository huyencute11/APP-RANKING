import React from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
  return (
    <div className={cx('wrapper')} >
      <span className={cx('text')}> User Ranking </span>
    </div>
  );
};

export default Navbar;

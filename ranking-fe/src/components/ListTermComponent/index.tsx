import React, { useState } from 'react';
import TermItem from './TermItem';
import Term from '../../interface/Term';
import styles from './ListTerm.module.scss';
import classNames from 'classnames/bind';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';


const cx = classNames.bind(styles);


const ListTerm: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleOnChange = (): void => {
        setShow(!show);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span className={cx('title_name')}>Terms of Use</span>
                    <span className={cx('icon')} onClick={handleOnChange}>
                        {show ? <FaCaretUp /> : <FaCaretDown />}
                    </span>
                </div>
                <TermItem show={show} />
            </div>
        </div>
    );
};

export default ListTerm;

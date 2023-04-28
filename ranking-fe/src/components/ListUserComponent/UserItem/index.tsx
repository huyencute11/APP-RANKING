import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../../../redux/store/userDetail';
import { UserID } from '../../../constants/userID';
import styles from './UserItem.module.scss';
import classNames from 'classnames/bind';
import { FaAngleRight } from 'react-icons/fa';
import User from '../../../interface/User';

const cx = classNames.bind(styles);

interface UserItemProps {
    user: User
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {

    const dispatch = useDispatch();

    const handleOnClick = (): void => {
        dispatch(setUserDetail(user));
    };

    return (
        <div className={cx('wrapper', { 'user--active': (user.user_id === UserID) })} onClick={handleOnClick}>
            <div className={cx('number')}>
                <span className={cx('numberText')}>{user.rank}</span>
            </div>
            <div className={cx('image-wrapper')}>
                <img className={cx('img')} src={user.img} alt="Avatar" />
            </div>
            <div className={cx('description')}>
                <span className={cx('name')}>{user.username}</span>
                <span className={cx('number_post')}>{user.score} score</span>
            </div>
            <div className={cx('icon')}>
                <FaAngleRight />
            </div>
        </div>
    );
};

export default UserItem;

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCloseUserDetail } from '../../redux/store/userDetail'
import styles from './DetailUser.module.scss';
import classNames from 'classnames/bind';
import { FaArrowLeft } from 'react-icons/fa';
import { AppDispatch } from '../../types/AppDispatch';
import User from '../../interface/User'
const cx = classNames.bind(styles);

interface DetailUserProps {
    showUserDetail: boolean;
}

const DetailUser: React.FC<DetailUserProps> = ({ showUserDetail }) => {
    const user: User = useSelector((state: RootState) => state.userClickShowDetail.userOnclick);

    const dispatch: AppDispatch = useDispatch();

    const handleOnclick = () => {
        dispatch(setCloseUserDetail());
    };

    return (
        <div className={cx('wrapper', { 'display--userDetail': showUserDetail, 'hide--userDetail': !showUserDetail })}>
            <div className={cx('container')}>
                <div className={cx('hide')}>
                    <span className={cx('icon_item')} onClick={() => handleOnclick()}>
                        <FaArrowLeft className={cx('icon_item_left')} />
                    </span>
                </div>
                <div className={cx('image')}>
                    <img src={user?.img} alt={user.username} />
                </div>
                <div className={cx('user_info')}>
                    <div className={cx('user_image')}>
                        <img src={user?.img} alt={user?.username} />
                    </div>
                    <div className={cx('user_info_des')}>
                        <span className={cx('user_name')}>{user?.username}</span>
                        <span className={cx('user_email')}>{user?.email}</span>
                    </div>
                </div>
                <div className={cx('user_rank_info')}>
                    <span className={cx('user_point')}>Total point: {user?.score}</span>
                    <span className={cx('user_raking')}>Rainking: {user?.rank}</span>
                    <span className={cx('user_post_number')}>Number posts: {user?.total_posts}</span>
                    <span className={cx('number_likes')}>Like: {user?.total_likes}</span>
                    <span className={cx('number_likes')}>Love: {user?.total_favorites}</span>
                    <span className={cx('number_likes')}>Comments: {user?.total_comments}</span>
                </div>
            </div>
        </div>
    );
}

export default DetailUser
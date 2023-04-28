import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetail } from '../../../redux/store/userDetail';
import styles from './UserItemInTop3.module.scss';
import classNames from 'classnames/bind';
import { FaCrown } from 'react-icons/fa';
import User from '../../../interface/User';

const cx = classNames.bind(styles);

type UserItemTop3Props = {
    userInTop3: User
}

const UserItemIntop3: React.FC<UserItemTop3Props> = ({ userInTop3 }) => {
    const dispatch = useDispatch();

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        dispatch(setUserDetail(userInTop3));
    };

    return (
        <div className={cx('item_ranking', { 'no_1': userInTop3?.rank === 1 })} onClick={handleOnClick}>
            <div className={cx('item_ranking__image')}>
                <div className={cx('item_ranking__icon')}>
                    <span className={cx('icon', { 'no_3': userInTop3?.rank === 3 })}>
                        <FaCrown />
                    </span>
                    <span className={cx('number_no')}>No {userInTop3?.rank}</span>
                </div>
                <img src={userInTop3?.img} alt='image' />
                <span ></span>
            </div>
            <div className={cx('item_ranking__des')}>
                <span className={cx('item_ranking__name')}>{userInTop3?.username}</span>
                <div className={cx('post_wrapper')}>
                    <span className={cx('item_ranking__postN')}>{userInTop3?.score}</span>
                    <span className={('item_ranking__post')}> score</span>
                </div>

            </div>
        </div>
    )
}
// const UserItemIntop3 = () => {
//     return (
//         <div className={cx('item_ranking', { 'no_1': user?.rank === 1 })} key={index} onClick={(e) => handleOnclick(e, user)}>
//             <div className={cx('item_ranking__image')}>
//                 <div className={cx('item_ranking__icon')}>
//                     <span className={cx('icon', { 'no_3': user?.rank === 3 })}>
//                         <FaCrown />
//                     </span>
//                     <span className={cx('number_no')}>No {user?.rank}</span>
//                 </div>
//                 <img src={user?.img} alt='image' />
//                 <span ></span>
//             </div>
//             <div className={cx('item_ranking__des')}>
//                 <span className={cx('item_ranking__name')}>{user?.username}</span>
//                 <div className={cx('post_wrapper')}>
//                     <span className={cx('item_ranking__postN')}>{user?.score}</span>
//                     <span className={('item_ranking__post')}> score</span>
//                 </div>

//             </div>
//         </div>
// }

export default UserItemIntop3
import React from 'react';
import styles from './Top3User.module.scss';
import User from '../../interface/User';
import UserItemIntop3 from './UserItemInTop3';
// import { FaCrown } from 'react-icons/fa';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Top3UsersProps = {
    data: User[];
}

const Top3Users: React.FC<Top3UsersProps> = ({ data }) => {

    // change position
    if (data.length === 4 || data.length === 3) {
        const firstUser = data.shift();
        // Calculate the middle index
        const middleIndex = Math.floor(data.length / 2);
        // Insert the first user at the middle index
        data.splice(middleIndex, 0, firstUser as User);
    } else if (data.length === 5) {
        const firstUser = data.shift();
        // Insert the first user at index 1
        data.splice(1, 0, firstUser as User);
    }

    return (
        <div className={cx('top3user_wrapper')} >
            <div className={cx('top3user_container', { 'top3user_container--modifier': (data.length > 3) }, { 'top3user_modifier--oneuser': data.length === 1 })}>
                {data.map((user, index) => (
                    <UserItemIntop3 key={index} userInTop3={user} />
                ))}
            </div>
        </div >
    )
}


export default Top3Users
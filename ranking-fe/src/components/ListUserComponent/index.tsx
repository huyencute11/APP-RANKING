import React from 'react';
import styles from './ListUser.module.scss';
import classNames from 'classnames/bind';
import UserItem from './UserItem';
import User from '../../interface/User';

const cx = classNames.bind(styles);

type ListUserProps = {
    listData: User[];
}

const ListUser: React.FC<ListUserProps> = ({ listData }) => {
    return (
        <div className={cx('wrapper')} id="list">
            {listData?.map((user: User) => {
                return <UserItem user={user} key={user.user_id} />;
            })}
        </div>
    );
};

export default ListUser;

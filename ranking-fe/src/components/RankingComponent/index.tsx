import React, { useState, useEffect } from 'react'
import TopUser from '../TopUserComponent'
import User from '../../interface/User';
import ListUser from '../ListUserComponent'
import styles from './Ranking.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type RankingProps = {
    data: User[];
    showUserDetail: boolean;
    currentRank?: number;
    listData: User[];
    allTop1: boolean;
    userInList: User[];
    userInTop3: User[];
}
//
const Ranking = ({ showUserDetail, currentRank, userInList, userInTop3 }: RankingProps) => {
    return (
        <div className={cx('wrapper', { 'hide--ranking': showUserDetail, 'display--ranking': !showUserDetail })} >
            <TopUser data={userInTop3} currentRank={currentRank} />
            <ListUser listData={userInList} />
        </div>
    )
}

export default Ranking
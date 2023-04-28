import React, { useState, useEffect } from 'react';
import { getUsers } from '../../redux/store/user/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../types/AppDispatch';
import styles from './TopUsers.module.scss';
import classNames from 'classnames/bind';
import { FaCrown } from 'react-icons/fa';
import Top3Users from '../Top3Users';
const cx = classNames.bind(styles);

type TopUsersProps = {
    data: any[];
    currentRank?: number;

}
type Date = {
    year: number;
    month?: number | undefined;
}

const TopUsers: React.FC<TopUsersProps> = ({ data, currentRank }) => {
    let date: Date;
    const lengthData = data.length;
    const dispatch: AppDispatch = useDispatch();
    const FILTER_BY_MONTH_OR_YEAR = {
        YEAR: 'YEARLY',
        MONTH: 'MONTHLY'
    }
    const FILTER_BY_ACT = {
        POST: 'POST',
        WANT_TO_GO: 'WANT TO GO'
    }
    const [activeAct, setActiveAct] = useState<string>(FILTER_BY_ACT.POST);
    const [filterActiveByMonthOrYear, setFilterActiveByMonthOrYear] = useState<string>(FILTER_BY_MONTH_OR_YEAR.MONTH);

    //Call api when state change


    useEffect(() => {
        // activeAct === FILTER_BY_ACT.POST ?

        // (date = { month: 3, year: 2023 }) : (date = { month: 3, year: 2023 });
        const isActiveInWantToGo = activeAct === FILTER_BY_ACT.WANT_TO_GO;
        filterActiveByMonthOrYear === FILTER_BY_MONTH_OR_YEAR.MONTH ? (date = { month: 3, year: 2023 }) : (date = { year: 2023 });
        dispatch(getUsers({ date, isWantToGo: isActiveInWantToGo }));
    }, [filterActiveByMonthOrYear, activeAct]);


    return (
        <div className={cx('wrapper_topUsers', { 'top3user_wrapper--modifier': (lengthData > 3) })}>
            <div className={cx('container_topUsers')}>
                <div className={cx('direct_container')}>
                    <div className={cx('wrapper_action')}>
                        <div className={cx('action')}>
                            <div className={cx('action__item', { 'action-item__active': activeAct === FILTER_BY_ACT.POST })} onClick={() => setActiveAct(FILTER_BY_ACT.POST)}>
                                <div>POST</div>
                            </div>
                            <div className={cx('action__item', { 'action-item__active1': activeAct === FILTER_BY_ACT.WANT_TO_GO })} onClick={() => setActiveAct(FILTER_BY_ACT.WANT_TO_GO)}>
                                <div>WANT TO GO</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper_action')}>
                        <div className={cx('filter')}>
                            <div className={cx('filter__item', { 'filter__item-active': filterActiveByMonthOrYear === FILTER_BY_MONTH_OR_YEAR.MONTH })} onClick={() => setFilterActiveByMonthOrYear(FILTER_BY_MONTH_OR_YEAR.MONTH)}>
                                <div className={cx('filter_1')}>MONTHLY</div>
                                {filterActiveByMonthOrYear ? (<span className={cx('pseudo')}></span>) : ''}
                            </div>
                            <div className={cx('filter__item', { 'filter__item-active2': filterActiveByMonthOrYear === FILTER_BY_MONTH_OR_YEAR.YEAR })} onClick={() => setFilterActiveByMonthOrYear(FILTER_BY_MONTH_OR_YEAR.YEAR)}>
                                <div className={cx('filter_2')}>YEARLY</div>
                                {filterActiveByMonthOrYear ? (<span className={cx('pseudo')}></span>) : ''}
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className={cx('ranking_top')}>
                    <div className={cx('ranking_top_container')}>
                        <div className={cx('ranking_top__icon')}>
                            <FaCrown />
                        </div>
                        <div className={cx('ranking_top__title')}>
                            <h3>USERS RANKING</h3>
                            <div className={cx('des_number')}>
                                <div className={cx('rule__1')}></div>
                                <span className={cx('ranking_top__number')}>Top {data?.length} Users</span>
                                <div className={cx('rule__2')}></div>
                            </div>
                        </div>
                        <div className={cx('current_ranking')}>
                            <span className={cx('wrapper_icon')}>
                                <FaCrown />
                            </span>
                            <span className={cx('your_current_ranking')}>Your current ranking:</span>
                            <span className={cx('current_number')}>{currentRank} th</span>
                        </div>
                    </div>
                </div>
                {/*  */}
                <Top3Users data={data} />
            </div>
        </div>
    )
}

export default TopUsers
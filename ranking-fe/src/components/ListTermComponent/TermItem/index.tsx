import React, { useEffect, useState } from 'react'
import styles from './TermItem.module.scss';
import classNames from 'classnames/bind';
import { getTerms } from '../../../redux/store/term/actions';
import Term from '../../../interface/Term';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { AppDispatch } from '../../../types/AppDispatch';
const cx = classNames.bind(styles);


interface IProps {
    show: boolean;


};
const TermItem: React.FC<IProps> = ({ show }) => {
    // const [termData, setTermData] = useState<Term[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const terms = useSelector((state: RootState) => state.terms.termData);

    useEffect(() => {
        dispatch(getTerms());
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className={cx('wrapper_terms')}>
            {terms.map((item, index) => (
                <div className={cx('term_item')} key={index}>
                    <span className={cx('term_item_title')}>Point {item.point}</span>
                    <span className={cx('term_item_content')}>{item.detail}</span>
                </div>
            ))}
        </div>
        // ) }

    );
};

export default TermItem;
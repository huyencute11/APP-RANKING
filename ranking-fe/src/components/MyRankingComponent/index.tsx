import React, { useEffect, useState } from 'react';
import User from '../../interface/User';
import { ITEM_USER_HEIGHT, HEIGHT_NAV_RANKING, VIEW_POINT_HEIGHT } from '../../constants/dimesion';
import styles from './MyRanking.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface IProps {
  indexUser: number,
  showUserDetail: boolean,
  numberUserTopRank: number,
  nummberUser: number
  currentUser?: User,
}
//const TermItem: React.FC<Props> = ({ show }) => {
const MyRanking: React.FC<IProps> = ({ currentUser, indexUser, showUserDetail, numberUserTopRank }) => {
  const SCREEN_DEVIATION = 10

  const [hideMyRanking, setHideMyRanking] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(window.pageYOffset);
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    //handle scroll
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    checkShowMyRanking()
  }, [scrollPosition, currentUser])

  //set show hide when onclick to display user
  useEffect(() => {
    setHideMyRanking(showUserDetail)
  }, [showUserDetail])

  let isScrollable = () => (window.innerHeight + window.pageYOffset) < document.body.offsetHeight - SCREEN_DEVIATION;
  // console.log('offsetHeight', (document.body.offsetHeight))
  // console.log('pageYOffset', (window.innerHeight + window.pageYOffset))
  const checkShowMyRanking = () => {
    let item_Can_Show_First_In_View = Math.floor((VIEW_POINT_HEIGHT - HEIGHT_NAV_RANKING) / ITEM_USER_HEIGHT);
    let number_Item_Show = numberUserTopRank + item_Can_Show_First_In_View

    if ((indexUser <= numberUserTopRank)) {
      if (scrollPosition > HEIGHT_NAV_RANKING && isScrollable()) {
        setStatus(true)
      }
      else
        setStatus(false)
    } else if ((indexUser > numberUserTopRank)) {

      //nam trong tam nhin
      if (indexUser <= number_Item_Show) {
        if (scrollPosition > (VIEW_POINT_HEIGHT - (number_Item_Show - indexUser) * ITEM_USER_HEIGHT) && isScrollable())
          setStatus(true)
        else
          setStatus(false)
      }
      //nam ngoai tam nhin
      else {
        // console.log('isScroll', isScrollable(scrollPosition))
        const postitionOfItem = HEIGHT_NAV_RANKING + (indexUser - numberUserTopRank) * ITEM_USER_HEIGHT
        //mac dinh hien thi
        if ((scrollPosition > postitionOfItem || scrollPosition < postitionOfItem) && isScrollable()) {
          setStatus(true)
          // if (scrollPosition > postitionOfItem && scrollPosition > (postitionOfItem - VIEW_POINT_HEIGHT + (indexUser - number_Item_Show) * ITEM_USER_HEIGHT)) {
          if (scrollPosition > ((indexUser - number_Item_Show) * ITEM_USER_HEIGHT)
            && scrollPosition < ((indexUser - number_Item_Show) * ITEM_USER_HEIGHT + VIEW_POINT_HEIGHT)
          ) {
            setStatus(false)
          }
        }
        else {
          setStatus(false)
        }
      }
    }
    else setStatus(false)
  }


  return (
    <div className={cx('wrapper', { 'visible--myranking': status }, { 'hide--myranking': hideMyRanking, 'show--myranking': !hideMyRanking })}>
      <div className={cx('number')}>
        <span className={cx('numberText', 'hide')}>{currentUser?.rank}</span>
      </div>
      <div className={cx('image-wrapper')}>
        <img className={cx('img')} src={currentUser?.img} alt="Avatar" />
      </div>
      <div className={cx('description')}>
        <span className={cx('name')}>{currentUser?.username}</span>
        <span className={cx('number_post')}>{currentUser?.score} score</span>
      </div>
    </div>
  )
}

export default MyRanking
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavbarComponent';
import { getUsers } from '../../redux/store/user/actions';
import { UserID } from '../../constants/userID';
import { useSelector, useDispatch } from 'react-redux';
import User from '../../interface/User';
import { AppDispatch } from '../../types/AppDispatch';
import { RootState } from '../../redux/store';
import MyRankingComponent from '../../components/MyRankingComponent';
import ListTerm from '../../components/ListTermComponent';
import DetailUser from '../../components/DetailUserComponent';
import Ranking from '../../components/RankingComponent';


const Home: React.FC = () => {
  const idUser = UserID;
  const dispatch: AppDispatch = useDispatch();

  const usersInStore = useSelector((state: RootState) => state?.users.userData);
  const { showUserDetail } = useSelector((state: RootState) => state?.userClickShowDetail);

  //use state
  const [userCurrent, setUserCurrent] = useState<User>();
  const [userInTop3, setUserInTop3] = useState<User[]>([]);
  const [userInList, setUserInList] = useState<User[]>([]);
  const [indexUser, setIndexUser] = useState<number>(0);
  const [data, setData] = useState<User[]>([]);
  const [allTop1, setAllTop1] = useState<boolean>(false);
  const [numberUserInTop, setNumberUserInTop] = useState<number>(0);

  //call api get data first
  useEffect(() => {
    const date = { month: 3, year: 2023 }
    dispatch(getUsers({ date }));
  }, [])

  //handle logic
  const setPriorityAndSetRank = (id: number, users: User[]): User[] => {
    // Find index of logged in user in array
    const loggedInUserIndex = users.findIndex(user => user?.user_id === id);
    // Find all users with the same score as logged in user
    const sameRankUsers = users.filter(user => user?.score === users[loggedInUserIndex]?.score);
    // If there are multiple users with the same score, swap the logged in user with the first user in the array
    const indexUserInSameRankUsers = sameRankUsers.findIndex(user => user?.user_id === id);
    if (sameRankUsers.length > 1) {
      const temp = sameRankUsers[0];
      sameRankUsers[0] = sameRankUsers[indexUserInSameRankUsers];
      sameRankUsers[indexUserInSameRankUsers] = temp;
      users = [...users.filter(user => user?.score !== users[loggedInUserIndex]?.score), ...sameRankUsers]
    }

    // Find the index of the current user and set their rank and index
    const indexUserCurrent = users.findIndex(user => user?.user_id === id);
    setUserCurrent(users[indexUserCurrent]);
    setIndexUser(indexUserCurrent + 1)
    return users;
  }

  const isAllRank1 = (users: User[]): boolean => {
    const allRank1 = users.every(item => item?.rank === 1);
    return allRank1;
  }

  const countUserInTop3 = (users: User[]): number => {
    let count = 0;
    for (const user of users) {
      if (user.rank && user.rank <= 3) {
        count++;
      }
    }
    return count;
  }
  //get top 3 user
  const get3UserInTop3 = (users: User[]): User[] => {
    const top3User = users.slice(0, 3);
    return top3User;
  }
  //get user to render in list
  const getUserInList = (users: User[]): User[] => {
    const listUser = users.slice(3);
    return listUser;
  }

  useEffect(() => {
    let usersAfterSetPriority = setPriorityAndSetRank(idUser, usersInStore)
    setData(usersAfterSetPriority)

    let rank1All = isAllRank1(usersAfterSetPriority)
    setAllTop1(rank1All)

    let numberUserInTop3 = countUserInTop3(usersAfterSetPriority)
    setNumberUserInTop(numberUserInTop3)

    let top3User = get3UserInTop3(usersAfterSetPriority)
    setUserInTop3(top3User)

    let listUserNotIncludeTop3 = getUserInList(usersAfterSetPriority)
    setUserInList(listUserNotIncludeTop3)
  }, [usersInStore]);

  return (
    <div>
      <Navbar />
      {usersInStore.length > 0 && (<>
        <Ranking data={data} currentRank={userCurrent?.rank}
          showUserDetail={showUserDetail} listData={data}
          allTop1={allTop1} userInTop3={userInTop3} userInList={userInList} />
        <MyRankingComponent currentUser={userCurrent} indexUser={indexUser} showUserDetail={showUserDetail}
          numberUserTopRank={numberUserInTop} nummberUser={data.length} />
      </>)}
      <DetailUser showUserDetail={showUserDetail} />
      {<ListTerm />}
    </div>
  )
}

export default Home
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export const getListTerms = async () => {
  // const dataGet = await axios
  //   .get(`${url}/api/term/getTerms`)
  //   .then((data) => {
  //     return data?.data?.data;
  //   });
  // return dataGet;

  try {
    const response = await axios.get(`${url}/api/term/getTerms`)
    return response?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
};

export const getPosts = async () => {
  const dataGet = await axios
    .get(`${url}/post`)
    .then((data) => {
      console.log("post", data.data.data);
      return data?.data?.data;
    });
  return dataGet;
};

interface UserDate {
  month?: number;
  year?: number;
}

export const getUserByMonthOrYear = async (date: UserDate) => {
  const month = date?.month;
  const year = date?.year;
  try {
    const response = await axios.get(`${url}/api/user/getScoreUser/getAll`, {
      params: { month, year },
    });
    // console.log('user', response?.data);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
};
export const getUserByPostOrWantToGo = async (date: UserDate) => {
  const month = date?.month;
  const year = date?.year;
  try {
    const response = await axios.get(`${url}/api/user/getScoreUser/wantToGo`, {
      params: { month, year },
    });
    // console.log('user', response?.data);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
}

export const fetchUserData = async () => {
  try {
    // Destructure startDate and endDate from dateData

    // Construct the API URL with the query parameters
    const url = `http://localhost:5000/api/user/getScoreUser/getAll`;

    // Make the API request using Axios with query parameters
    const response = await axios.get(url);

    // Extract the data from the response
    const data = response?.data;

    // Return the data
    return data;
  } catch (error: any) {
    // Handle any errors that occur during the API call
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

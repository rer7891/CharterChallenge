import axios from 'axios';

const restaurantApi = async (sortedRestaurantsByName, parentCallBack, parentCallBackReset) => {
    const apiURL = 'https://code-challenge.spectrumtoolbox.com/api/restaurants'
    const API_KEY = process.env.REACT_APP_RESTAURANT_API_KEY;
    const apiHeader = { 
        headers: { 
        Authorization: API_KEY, 
        }, 
    };
    await axios.get(apiURL, apiHeader)
    .then((response) => {
      return sortedRestaurantsByName(response.data);
    })
    .then((response) => {
       parentCallBack(response) 
       parentCallBackReset(response) 
    })
}
export default restaurantApi;
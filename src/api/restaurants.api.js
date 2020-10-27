import axios from 'axios';

const restaurantApi = async (sortedRestaurantsByName, parentCallBack, parentCallBackReset, loadingCallBack) => {
    const apiURL = 'https://code-challenge.spectrumtoolbox.com/api/restaurants'
    const API_KEY = process.env.REACT_APP_RESTAURANT_API_KEY;
    const apiHeader = { 
        headers: { 
        Authorization: API_KEY, 
        }, 
    };
    try {
      const response = await axios.get(apiURL, apiHeader)
        if (response.status === 200) {
           const sortedResponse = await sortedRestaurantsByName(response.data);
           parentCallBack(sortedResponse) 
           parentCallBackReset(sortedResponse) 
           loadingCallBack(false);
        }
      } catch (e) {
        console.log(e)
      }
   
}

export default restaurantApi;
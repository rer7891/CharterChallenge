import axios from 'axios';

const restaurantApi = async (sortedRestaurantsByName, parentCallBack, parentCallBackReset) => {
    const apiURL = 'https://code-challenge.spectrumtoolbox.com/api/restaurants'
    const apiHeader = { 
        headers: { 
        Authorization: 'Api-Key q3MNxtfep8Gt', 
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
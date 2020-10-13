import React, {useEffect, useState} from 'react';
import './App.css';

import axios from 'axios';

function App() {

    const [restaurants, setRestaurants] = useState(null);

    const apiURL = 'https://code-challenge.spectrumtoolbox.com/api/restaurants'
    const apiHeader = { 
        headers: { 
        Authorization: 'Api-Key q3MNxtfep8Gt', 
        }, 
    };

    const fetchData = async () => {
      const response = await axios.get(apiURL, apiHeader)
      .then((response) => {
        return  setRestaurants(response.data) 
      })
  }

useEffect (() => {
    fetchData();
}, [])

    return (
      <div>
          <p>Restaraunt List</p>
          <table> 
              <div>
                  {restaurants && restaurants.map(restaurant => (
                      <tr>
                          <td> { restaurant.name }</td>
                          <td> { restaurant.city }</td>
                          <td> { restaurant.state }</td>
                          <td> { restaurant.telephone }</td>
                          <td> { restaurant.genre }</td>
                      </tr>
                  
                  ))}
              </div>
          </table>
        </div>
    );
}

export default App;

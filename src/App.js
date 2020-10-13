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

    const sortedRestaurantsByName = (data) => {
      var byName = data.slice(0);
      byName.sort(function(a,b) {
        var nameOne = a.name.toLowerCase();
        var nameTwo = b.name.toLowerCase();
        return nameOne < nameTwo ? -1 : nameOne > nameTwo ? 1 : 0;
      });
      return byName;
    }

    const fetchData = async () => {
          await axios.get(apiURL, apiHeader)
          .then((response) => {
            return sortedRestaurantsByName(response.data);
          })
          .then((response) => {
             setRestaurants(response) 
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

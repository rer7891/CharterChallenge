import React, {useEffect, useState} from 'react';
import './App.css';

import axios from 'axios';

function App() {

    const [restaurants, setRestaurants] = useState(null);
    const [filter, setFilter] = useState(null);

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

    const sortedRestaurantByFilter = () => {
          var byFilter = restaurants.slice(0);
          const key = getKeyByValue(byFilter, filter)
          const byState = byFilter.filter(
            restaurant => 
              restaurant[key] === filter
        );
        return byState;
        }
        
      function getKeyByValue(object, value) { 
        let finalKey = 'genre';
        object.forEach((element) => {
          const keys = Object.keys(element)
      
          keys.forEach((key) => {
            if (element[key] === value) {
              finalKey = key;
            }
          })
      
        })
        return finalKey;
      }

    const handleChange = (event) => {
      event.persist();
      setFilter(event.target.value.trim().toUpperCase())
    };
  
  const handleSubmit = async () => {
    const newRestaurantList = await sortedRestaurantByFilter();
    setRestaurants(newRestaurantList);
    console.log('handleSubmit',restaurants);
  }

    return (
      <div>
          <p>Restaraunt List</p>
          <div>
          <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '18px' }}>Filter by State:</span>
            <input type="text" style={{ width: "27em", maxWidth: "70%", fontSize: '18px' }} onChange={ handleChange }/>
          </label>
          <button className="k-button" onClick={() => handleSubmit()}>Submit</button>
        </div>
        <div>
        <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '18px' }}>Filter by Genre:</span>
            <input type="text" style={{ width: "27em", maxWidth: "70%", fontSize: '18px' }} onChange={ handleChange }/>
        </label>
        <button className="k-button" onClick={() => handleSubmit()}>Submit</button>
        </div>
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

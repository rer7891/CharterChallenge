import React from 'react'

const RestaurantCard = (props) => {
const{ restaurants, activePage} = props; 
const endRange = (activePage * 5)
const beginningRage = (endRange - 5)
const restaurantRange = restaurants.slice(beginningRage, endRange)
const restaurantName = restaurantRange.map((restaurant, i) => 

    <tr class="restaurant-rows">
      <th>{ restaurant.name }</th>
      <th>{ restaurant.city }</th>
      <th>{ restaurant.state}</th>
      <th>{ restaurant.telephone }</th>
      <th>{ restaurant.genre }</th>
    </tr>
 )

return (
    <table id='restaurants'>
        <tr class="restaurant-header">
          <th> Name</th>
          <th> City</th>
          <th> State 
          <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '10px' }}>Search By State:</span>
            <input type="text" style={{ width: "27em", maxWidth: "50%", fontSize: '10px' }}/>
            </label>
          </th>
          <th> Telephone</th>
          <th> Genre
          <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '10px' }}>Search by Genre:</span>
            <input type="text" style={{ width: "27em", maxWidth: "50%", fontSize: '10px' }}/>
            </label>
          </th>
        </tr>
        {restaurantName}
    </table>
  )
}

export default RestaurantCard;

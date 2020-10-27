import React from 'react'

const RestaurantCard = (props) => {
const{ restaurants, activePage} = props; 
const endRange = (activePage * 5)
const beginningRage = (endRange - 5)
const restaurantRange = restaurants.slice(beginningRage, endRange)

const restaurantLink = (restaurant) => {
  const {website, name} = restaurant
  return <a href={website}> {name} </a>;
}

const restaurantName = restaurantRange.map((restaurant, i) => 
    <tr className="restaurant-rows" key={i}>
     <td>{restaurantLink(restaurant)}</td>
      <td>{ restaurant.city } </td>
      <td>{ restaurant.state } </td>
      <td>{ restaurant.telephone } </td>
      <td>{ restaurant.genre }  </td>
    </tr>
 )

return (
    <table id='restaurants'>
      <tbody>
        <tr className="restaurant-header">
          <th> Name </th>
          <th> City </th>
          <th> State </th>
          <th> Telephone </th>
          <th> Genre </th> 
        </tr>
        {restaurantName}
      </tbody>
    </table>
  )
}

export default RestaurantCard;

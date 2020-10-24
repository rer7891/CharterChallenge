import React from 'react'

const RestaurantCard = ({restaurants}) => {

const restaurantDisplay = restaurants.map((restaurant, i) => 
 <table> 
    <div>
        <tr>
            <td> { restaurant.name }</td>
            <td> { restaurant.city }</td>
            <td> { restaurant.state }</td>
            <td> { restaurant.telephone }</td>
            <td> { restaurant.genre }</td>
        </tr>
    </div>
 </table>
 )

return (
    <section>
      <div>
        {restaurantDisplay}
      </div>
    </section>
  )
}

export default RestaurantCard;

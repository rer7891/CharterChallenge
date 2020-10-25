import React, {useEffect, useState} from 'react';
import restaurantApi from '../../api/restaurants.api';
import RestaurantCard from '../../components/Restaurants'
import FilterRestaurants from '../../components/FilterRestaurants'
import ReactPagination from "react-js-pagination";
// import "bootstrap/dist/css/bootstrap.min.css";

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantsReset, setRestaurantsReset] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(38);

    const sortedRestaurantsByName = (data) => {
      var byName = data.slice(0);
      byName.sort(function(a,b) {
        var nameOne = a.name.toLowerCase();
        var nameTwo = b.name.toLowerCase();
        return nameOne < nameTwo ? -1 : nameOne > nameTwo ? 1 : 0;
      });
      return byName;
    }

    const callback = (response) => {
        setRestaurants(response)
      }

      const callbackReset = (response) => {
        setRestaurantsReset(response)
      }

    const pageCounter =  () => {
      const count = Math.ceil(restaurants.length / 5)
      setPageCount(count)
    }

    useEffect (() => {
        restaurantApi(sortedRestaurantsByName, callback, callbackReset);
    }, [])

    useEffect(() => {
      if (restaurants.length >= 1) {
        pageCounter();
      }
    })

    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
    }

return (
    <div>
    <p class="Header"> Restaraunt List</p>
    <div class="line"></div>
    <div class="Div"> 
    <FilterRestaurants restaurants = {restaurants} 
                       parentCallBack = {callback} 
                       restaurantsReset = {restaurantsReset}/>
     </div>
    {restaurants && restaurants.length && 
      <RestaurantCard restaurants = {restaurants} activePage = {activePage}/>
    }
    {console.log("Page Count", pageCount)}
    <ReactPagination
      itemClass="page-item"
      linkClass="page-link"
      itemsCountPerPage={5}
      totalItemsCount={restaurants.length}
      pageRangeDisplayed={pageCount}
      activePage={activePage}
      onChange={handlePageChange}
    />
   
  </div>

);
 }
export default Restaurants;
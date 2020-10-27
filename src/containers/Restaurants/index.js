import React, {useEffect, useState} from 'react';
import restaurantApi from '../../api/restaurants.api';
import RestaurantCard from '../../components/RestaurantCard/index'
import FilterRestaurants from '../../components/FilterRestaurants'
import { LoadingOutlined } from '@ant-design/icons';
import Pagination from "react-js-pagination";

function Restaurants() {
    const [ loading, setLoading ] = useState(true);
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

      const loadingCallBack = (response => {
        setLoading(response)
      })


    useEffect (() => {
        restaurantApi(sortedRestaurantsByName, callback, callbackReset, loadingCallBack);
    }, [])

    useEffect(() => {
      if (restaurants.length >= 1) {
        pageCounter();
      }
    })

    const pageCounter =  () => {
      const count = Math.ceil(restaurants.length / 5)
      setPageCount(count)
    }

    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
    }

return (

    <div className="container">

    <div className="circle">
    <p className="Header"> Restaraunt Listing</p></div>
    <div className="filter-container"> 
    <FilterRestaurants restaurants = {restaurants} 
                       parentCallBack = {callback} 
                       restaurantsReset = {restaurantsReset}/>
     </div>
    {restaurants && restaurants.length > 0 && !loading ? 
      <RestaurantCard restaurants = {restaurants} activePage = {activePage}/>
      :
      loading &&
        <div style={{ width: '100%', textAlign: 'center', paddingTop: 200 }}>
            <LoadingOutlined
                spin
                type="loading"
                style={{ fontSize: 100, color: '#002E6D' }}
            />
        </div>
    }
   { restaurants && restaurants.length < 1 && !loading &&
      <p className="error-message">Sorry there are no search results. Please clear the search and try again.</p>
   }

    <Pagination
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
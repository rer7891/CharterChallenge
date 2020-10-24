import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import restaurantApi from '../../api/restaurants.api';
import RestaurantCard from '../../components/Restaurants'
import FilterRestaurants from '../../components/FilterRestaurants'

function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [restaurantsReset, setRestaurantsReset] = useState(null);
    const [filter, setFilter] = useState(null);
    const [offset, setOffset] = useState(0);
    // const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);


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

    useEffect (() => {
        restaurantApi(sortedRestaurantsByName, callback, callbackReset);
    }, [])

//     const sortByGenre = (byFilter, key) => {
//       var genreArr = filter.split(',');
//       let byGenre = []
//             genreArr.forEach((genre) => {
//               console.log('genere', genre)
//               byGenre = byFilter.filter(
//                 restaurant => 
//                   restaurant[key].includes(genre) === true
//               );
//             }) 
//       return byGenre; 
//     }

//     const sortedRestaurantByFilter = () => {
//           var byFilter = restaurants.slice(0);
//           const key = getKeyByValue(byFilter, filter)
//           if (key !== 'genre'){
//             setFilter(filter.toUpperCase())
//             const byState = byFilter.filter(
//               restaurant => 
//                 restaurant[key] === filter
//           );
//           return byState;
//           }

//           if (key === 'genre'){
//             return sortByGenre(byFilter, key);
//           } 
//         }
        
//       function getKeyByValue(object, value) { 
//         let finalKey = 'genre';
//         object.forEach((element) => {
//           const keys = Object.keys(element)
      
//           keys.forEach((key) => {
//             if (element[key] === value) {
//               finalKey = key;
//             }
//           })
//         })
//         return finalKey;
//       }

//     const handleChange = (event) => {
//       event.persist();
//       if (event.target.value === '') {
//         setRestaurants(restaurantsReset);
//       }
//       setFilter(event.target.value.trim())
//     };
  
//   const handleSubmit = async () => {
//     const newRestaurantList = await sortedRestaurantByFilter();
//     setRestaurants(newRestaurantList);
//     console.log('handleSubmit',restaurants);
//   }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset)
  }


return (
    <div>
    <p>Restaraunt List</p>
    <FilterRestaurants restaurants = {restaurants} parentCallBack = {callback} restaurantsReset = {restaurantsReset}/>
  {restaurants && restaurants.length && 
    <RestaurantCard restaurants = {restaurants}/>
  }
    <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}/>
  </div>

);
 }
export default Restaurants;
import React, {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce';
import { throttle } from 'lodash';

const FilterRestaurants = (props) => {
    const [stateFilter, setStateFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [didMount, setDidMount] = useState(false);
    const [stateValue] = useDebounce(stateFilter, 1000);
    const [genreValue] = useDebounce(genreFilter, 1000);
    const [searchValue] = useDebounce(searchFilter, 1000);


    const{ restaurants, parentCallBack, restaurantsReset} = props; 

    const capitalize = (genre) => {
      return genre.charAt(0).toUpperCase() + genre.slice(1);
    }

    const sortByGenre = (byFilter, key) => {
        var genreArr = genreFilter.split(',');
        let byGenre = []
              genreArr.forEach((genre) => {
                const newGenre = capitalize(genre)
                byGenre = byFilter.filter(
                  restaurant => 
                    restaurant[key].includes(newGenre) === true
                );
              }) 
        if (byGenre.length === 38) {
          return []
        }
        return byGenre; 
      }
      const updateRestaurants = async (value) => {
        return await sortedRestaurantByFilter(value);
      }
      useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
     }, [])

      useEffect(() => {
        if (didMount && stateValue === '') {
          document.getElementById("form").reset();
          parentCallBack(restaurantsReset)
        }
        else{
          updateRestaurants(stateValue)
          .then((result) => {
            parentCallBack(result);
          });
        }
      }, [stateValue])

      useEffect(() => {
        if (didMount && genreValue === '') {
          document.getElementById("form").reset();
          parentCallBack(restaurantsReset)
        }
        else {
          updateRestaurants(genreValue)
          .then((result) => {
            parentCallBack(result);
          });
        }
      }, [genreValue])

      // useEffect(() => {
      //   if (didMount && searchValue === '') {
      //     document.getElementById("form").reset();
      //     parentCallBack(restaurantsReset)
      //   }
      // }, [searchValue])

  
      const sortedRestaurantByFilter = (filter) => {
            var byFilter = restaurants.slice(0);
            const key = getKeyByValue(byFilter, filter)
            if (key !== 'genre'){
              const upperCase = filter.toUpperCase()
              setStateFilter(filter.toUpperCase())
              const byState = byFilter.filter(
                restaurant => 
                  restaurant[key] === upperCase
            );
            return byState;
            }
  
            else {
              return sortByGenre(byFilter, key);
            } 
          }

        function getKeyByValue(object, value) { 
          let finalKey = 'genre';
          if (value.length === 2) {
            value = value.toUpperCase()
          }
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
    
    const handleSubmit = async () => {
      console.log('serach', searchValue)
      const newRestaurantList = await sortedRestaurantByFilter(searchValue);
      parentCallBack(newRestaurantList);
    }
    
    return (<>
          <form id="form">
            <label>
            <span className="filter">Filter by State: </span>
            <input type="text" onChange={(e) => {
               setStateFilter(e.target.value);}}/>
            </label>
        <label>
            <span className="filter">Filter by Genre: </span>
            <input type="text" onChange={(e) => {
               setGenreFilter(e.target.value);}}/>
        </label>
        <label>
            <button className="filter-button" onClick={() => handleSubmit()}> Search: </button>
            <input type="text" onChange={(e) => {
               setSearchFilter(e.target.value);}} />
        </label>
        </form> </>
      )
   }
    
    export default FilterRestaurants;
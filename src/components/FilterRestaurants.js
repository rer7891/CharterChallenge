import React, {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce';

const FilterRestaurants = (props) => {
    const [stateFilter, setStateFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    // const [searchFilter, setSearchFilter] = useState("");
    const [didMount, setDidMount] = useState(false);
    const [stateValue] = useDebounce(stateFilter, 1000);
    const [genreValue] = useDebounce(genreFilter, 1000);



    const{ restaurants, parentCallBack, restaurantsReset} = props; 

    const capitalize = (genre) => {
      return genre.charAt(0).toUpperCase() + genre.slice(1);
    }

    const sortByGenre = (byFilter, key) => {
      console.log('key', key)

      const genreArr = genreFilter.split(',')
        console.log('genreArr', genreArr)
        let byGenre = []
              genreArr.forEach((genre) => {
                // const newGenre = capitalize(genre)
                byGenre = byFilter.filter(
                  restaurant => 
                    restaurant[key].toLowerCase().includes(genre.toLowerCase()) === true
                );
              }) 
        if (byGenre.length === 38) {
          return []
        }
        console.log('byGenre', byGenre)
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
          console.log('use effect state')
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
          console.log('use effect genre')
          updateRestaurants(genreValue)
          .then((result) => {
            parentCallBack(result);
          });
        }
      }, [genreValue])

      const sortedRestaurantByFilter = (filter) => {
            var byFilter = restaurants.slice(0);
            const key = getKeyByValue(byFilter, filter)
            if (key === 'state'){
              setStateFilter(filter)
              const byState = byFilter.filter(
                restaurant => 
                  restaurant[key].toLowerCase() === stateFilter.toLowerCase()
            );
            return byState;
            }
  
            else {
              return sortByGenre(byFilter, key);
            } 
          }

        function getKeyByValue(object, value) { 
          console.log('value', value)
          let finalKey = 'genre';
          // if (value.length === 2) {
          //   value = value.toUpperCase()
          // }
          object.forEach((element) => {
            const keys = Object.keys(element)
            keys.forEach((key) => {
              if (element[key].toLowerCase() === value.toLowerCase()) {
                finalKey = key;
                console.log('finalKey 1', finalKey)
              }
            })
          })
          console.log('finalKey 2', finalKey)
          return finalKey;
        }
    
    const handleSubmit = () => {
      const newRestaurantList = sortedRestaurantByFilter(genreValue);
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
            <button type="button" className="filter-button" onClick={() => handleSubmit()}> Search: </button>
            <input type="text" onChange={(e) => {
               setGenreFilter(e.target.value);}} />
        </label>
        </form> </>
      )
   }
    
    export default FilterRestaurants;
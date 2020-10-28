import React, {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce';

const FilterRestaurants = (props) => {
    const [stateFilter, setStateFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [didMount, setDidMount] = useState(false);
    const [stateValue] = useDebounce(stateFilter, 1000);
    const [genreValue] = useDebounce(genreFilter, 1000);    

    const{ restaurants, parentCallBack, restaurantsReset} = props; 
    const byFilter = restaurants.slice(0);

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
        })
        .catch((e) => {
           console.log(`${e}`)
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
          })
          .catch((e) => {
            console.log(`${e}`)
         });
        }
      }, [genreValue])

      useEffect(() => {
        if (didMount && searchFilter === '') {
          document.getElementById("form").reset();
          parentCallBack(restaurantsReset)
        }
      }, [searchFilter])

      const sortBySearch = (key) => {
        const genreArr = searchFilter.split(',')
        return filterSearchbyKey(genreArr, key)
      }
  
      const sortByGenre = (key) => {
         const genreArr = genreFilter.split(',')
        return filterSearchbyKey(genreArr, key)
      }
  
      const updateRestaurants = async (value) => {
        return await sortedRestaurantByFilter(value);
      }

      const filterSearchbyKey = (searchArr, key) => {
        let byGenre = []
        searchArr.forEach((param) => {
          byGenre = byFilter.filter(
            restaurant => 
              restaurant[key].toLowerCase().includes(param.trim().toLowerCase()) === true
          );
        })  
        if (byGenre.length === 38) {
          return []
        }
        return byGenre; 
      }

      const sortedRestaurantByFilter = (filter) => {
            const key = getKeyByValue(filter)
            if (key === 'state'){
              setStateFilter(filter.trim())
              const byState = byFilter.filter(
                restaurant => 
                  restaurant[key].toLowerCase() === stateFilter.toLowerCase()
            );
              return byState;
            }
            else if (key === 'genre') {
              return sortByGenre(key);
            } 
            else {
              return sortBySearch(key)
            }
          }

        function getKeyByValue(value) { 
          let finalKey = 'genre';
    
          byFilter.forEach((element) => {
            const keys = Object.keys(element)
            keys.forEach((key) => {
              if (element[key].toLowerCase() === value.trim().toLowerCase()) {
                finalKey = key;
              }
            })
          })
          return finalKey;
        }
    
    const handleSubmit = () => {
      const newRestaurantList = sortedRestaurantByFilter(searchFilter);
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
               setSearchFilter(e.target.value);}} />
        </label>
        </form> </>
      )
   }
    
    export default FilterRestaurants;
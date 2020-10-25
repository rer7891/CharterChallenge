import React, {useState, useEffect} from 'react'
import { useDebounce } from 'use-debounce';

const FilterRestaurants = (props) => {
    const [stateFilter, setStateFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [didMount, setDidMount] = useState(false);
    const [stateValue] = useDebounce(stateFilter, 1000);
    const [genreValue] = useDebounce(genreFilter, 1000);


    const{ restaurants, parentCallBack, restaurantsReset} = props; 

    const sortByGenre = (byFilter, key) => {
        var genreArr = genreFilter.split(',');
        let byGenre = []
              genreArr.forEach((genre) => {
                byGenre = byFilter.filter(
                  restaurant => 
                    restaurant[key].includes(genre) === true
                );
              }) 
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
      //   let mounted = true
      //   if (mounted) {
      //     parentCallBack(restaurantsReset)
      //   }
      //   return () => mounted = false;
      // }, [resetFilter])

  
      const sortedRestaurantByFilter = (filter) => {
            var byFilter = restaurants.slice(0);
            const key = getKeyByValue(byFilter, filter)
            if (key !== 'genre'){
              setStateFilter(filter.toUpperCase())
              const byState = byFilter.filter(
                restaurant => 
                  restaurant[key] === filter
            );
            return byState;
            }
  
            else {
              return sortByGenre(byFilter, key);
            } 
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
    
    const handleSubmit = async () => {
      const newRestaurantList = await sortedRestaurantByFilter();
      parentCallBack(newRestaurantList);
    }
    
    return (<>
            <div class="Div">
            <label>
            <span style={{ display: "inline-block", width: "50px", paddingLeft: "50px", fontSize: '18px' }}>Filter by State: </span>
            <input type="text" onChange={(e) => {
               setStateFilter(e.target.value);}}/>
            </label>
        </div>
        <div class="Div">
        <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingLeft: "50px", fontSize: '18px' }}>Filter by Genre: </span>
            <input type="text" onChange={(e) => {
               setGenreFilter(e.target.value);}}/>
        </label>
        </div>
        <div class="Div">
        <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingLeft: "50px", fontSize: '18px' }}> Search:  </span>
            <input type="text" />
        </label>
        <button className="k-button" onClick={() => handleSubmit()}>Submit</button>
        </div>  </>
      )
   }
    
    export default FilterRestaurants;
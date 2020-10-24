import React, {useState} from 'react'

const FilterRestaurants = ({restaurants, parentCallBack, restaurantsReset}) => {
    const [filter, setFilter] = useState(null);

    const sortByGenre = (byFilter, key) => {
        var genreArr = filter.split(',');
        let byGenre = []
              genreArr.forEach((genre) => {
                console.log('genere', genre)
                byGenre = byFilter.filter(
                  restaurant => 
                    restaurant[key].includes(genre) === true
                );
              }) 
        return byGenre; 
      }
  
      const sortedRestaurantByFilter = () => {
            var byFilter = restaurants.slice(0);
            const key = getKeyByValue(byFilter, filter)
            if (key !== 'genre'){
              setFilter(filter.toUpperCase())
              const byState = byFilter.filter(
                restaurant => 
                  restaurant[key] === filter
            );
            return byState;
            }
  
            if (key === 'genre'){
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
  
      const handleChange = (event) => {
        event.persist();
        if (event.target.value === '') {
          parentCallBack(restaurantsReset);
        }
        setFilter(event.target.value.trim())
      };
    
    const handleSubmit = async () => {
      const newRestaurantList = await sortedRestaurantByFilter();
      parentCallBack(newRestaurantList);
      console.log('handleSubmit',restaurants);
    }
    
    return (<>
            <div>
            <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '18px' }}>Filter by State:</span>
            <input type="text" style={{ width: "27em", maxWidth: "70%", fontSize: '18px' }} onChange={ handleChange }/>
            </label>
            <button className="k-button" onClick={() => handleSubmit()}>Submit</button>
        </div>
        <div>
        <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '18px' }}>Filter by Genre:</span>
            <input type="text" style={{ width: "27em", maxWidth: "70%", fontSize: '18px' }} onChange={ handleChange }/>
        </label>
        <button className="k-button" onClick={() => handleSubmit()}>Submit</button>
        </div>
        <div>
        <label>
            <span style={{ display: "inline-block", width: "50px", textAlign: "right", paddingRight: "0.5em", fontSize: '18px' }}>Search:</span>
            <input type="text" style={{ width: "27em", maxWidth: "70%", fontSize: '18px' }} onChange={ handleChange }/>
        </label>
        <button className="k-button" onClick={() => handleSubmit()}>Submit</button>
        </div>  </>
      )
   }
    
    export default FilterRestaurants;
## Charter Challenge App
* This app allows a user to view a list of restaurants pulled from a 3rd part API. 
* A user can filter restaurants by State or Genre. They may further filter by Name, City, or Phone Number.
* To start a new search clear any of the search parameters and type in new parameters. 
* Restaurants are listed in Alphabetical order and paginated to five restaurants per page. 
* A restaurants name will link to the business's website.

## Deployed App: 
Link: https://charterchallenge.herokuapp.com/

## Local Setup:
* Run npm install

* This app has a .env file with the following environmental variable: <br />
- REACT_APP_RESTAURANT_API_KEY 

* Please contact the site's owner for the api key. This key is used to access
an restaurant api endpoint and is necessary to run the app locally. 

### npm start

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### npm run cypress

Launches the test runner in the interactive watch mode.<br />
Testing is done through Cypress test suite. Documentation can be found here: https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server

### npm build

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### Continuous Integration

This app also utilizes CI through Travis CI. Travis Documentation can be found here: https://docs.travis-ci.com/



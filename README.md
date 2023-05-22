# Assignment 2 - Web API.

Name: Dylan French Carroll

## Features.

 + Firebase Authentication - Verify ID Tokens to allow access to API
 + Custom account schema - Contains email, firebase uid and  multiple arrays of favourites/mustwatches
 + Logging - Used Winston logging to log to console and log file.
 + Multiple routers to cleanly split code
 + Rate Limiting - DDOS protection
 + Helmet - Used helmet to set HTTP headers
 + Large React Integration
 


## Installation Requirements
Clone the following repo: 

```cmd
git clone [http:\myrepo.git](https://github.com/DylanFrenchCarroll/ewd-labs-2023.git)
```

followed by installation & start

```bat
npm install
npm start
```



## API Configuration

TMDB Key is the API Key.
PORT/NODE_ENV are configurable. 
DATABASE_URL is your own Mongo instance

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
DATABASE_DIALECT=mongo
TMDB_KEY="51f6034647383dbsss5b5e48ea4028dfd0d"
DATABASE_URL=mongodb://localhost:27017/movies_db
JWT_SECRET_KEY=ilik
```


## API Design Routes


|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets discover movies | N/A | N/A | N/A
| /api/movies/upcoming | Get upcoming movies | N/A | N/A | N/A
| /api/movies/popular | Get popular movies | N/A | N/A | N/A  
| /api/movies/{id} | Get specific movie | N/A | N/A | N/A  
| /api/movies/{id}/videos | Get specific movie video | N/A | N/A | N/A  
| /api/movies/{id}/images | Get specific movies images | N/A | N/A | N/A  
| /api/movies/{id}/reviews | Get specific movies reviews | N/A | N/A | N/A  
| /api/movies/{id}/search | Search for specific movies  | N/A | N/A | N/A  
| ... | ... | ... | ... | ...
| /api/persons/{id} |Gets specific person | N/A | N/A | N/A
| /api/persons/{id}/images |Gets specific person images | N/A | N/A | N/A
| /api/persons/popular |Gets popular persons  | N/A | N/A | N/A
| ... | ... | ... | ... | ...
| /api/shows/{id} |Gets specific show | N/A | N/A | N/A
| /api/shows/{id}/images |Gets specific show images | N/A | N/A | N/A
| /api/shows/popular |Gets popular shows  | N/A | N/A | N/A
| ... | ... | ... | ... | ...
| /api/accounts/{id}/movies/favourites |Gets Favourites | Add Favourite | N/A | N/A
| /api/accounts/{id}/movies/mustWatches |Gets Must Watches | Add to Must Watch | N/A | N/A
| /api/accounts/{id}/shows/favourites |Gets Favourites | Add Favourite | N/A | N/A
| /api/accounts/{id}/persons/favourites |Gets Favourites | Add Favourite | N/A | N/A
| /api/accounts/{id}/movies/favourites |Gets Favourites | Add Favourite | N/A | N/A
| ... | ... | ... | ... | ...
| /api/accounts/{id}/ |Gets Account | Update Account | N/A | N/A
| /api/accounts/ |Gets All Account | Create Account | N/A | N/A


## Security and Authentication
I used Firebase again for authentication as my React app is also using Firebase for authentication. In the Account model I store the email and Firebase UID of the account in the schema in Mongo. When the React App or Postman sends a request to the API, a Firebase Access Token is required in the Bearer Token Auth header. 

Every route is protected by this authentication type as we do not want any users creating accounts without first having a Firebase Account. When a user registers on the React UI, a Firebase account is created and then an account on the Mongo DB is also created afterwards using the values returned from Firebase. 

## Validation
Used JOI validation to validate some user details when creating an account:
~~~Javascript
const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    firebaseUid: Joi.string().min(1).max(255).required()
});
~~~


## Integrating with React App

React Repo: https://github.com/DylanFrenchCarroll/web-dev-masters
I changed all of the endpoints in the React Application to go through the API instead of direct calls the TMDB Api. The favourites are also added when the button is clicked so that the MongoDB is also used e.g. 

~~~Javascript
export const getMovieVideo = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const user = JSON.parse(localStorage.getItem("authUser"));
  return fetch(`${import.meta.env.VITE_API_URL}/api/movies/${id}/videos` ,  { headers: {Authorization: `Bearer ${user.stsTokenManager.accessToken}`} })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

~~~

## Independent learning/Extra features
I added Winston Logger to log some data to the console. It also writes to a logs/app.log files.
I added Express Rate Limiter to limit the amount of requests coming from 1 IP address in a set amount of time to improve DDOS protection slightly
I used Helmet to help secure the app by setting HTTP response headers.
I added a custom Auth middle ware that I created using Firebase Admin SDK to verify tokens within the application/ Firebase project.


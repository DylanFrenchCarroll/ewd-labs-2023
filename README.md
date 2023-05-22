# Assignment 2 - Web API.

Name: Dylan French CArroll

## Features.

[A bullet-point list of the ADDITIONAL features/endpoints you have implemented in the API **THAT WERE NOT IN THE LABS** ]. 

 + Feature 1 - .... a statement of its purpose/objective ..... 

 + Feature 2 - .......

 + Feature 3 - ......

   e.g.

 + Get Similar Movies:  Get a list of similar movies using a movie ID. 

## Installation Requirements

[Describe how to run the API. If you used a DevContainer/Codespace , you can refer to the relevant files in your repo.]

[Describe getting/installing the software, perhaps:]

```cmd
git clone [http:\myrepo.git](https://github.com/DylanFrenchCarroll/ewd-labs-2023.git)
```

followed by installation

```bat
npm install
npm start
```



## API Configuration

[Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.]
[**REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB,** just placeholders as indicated below:]

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
DATABASE_DIALECT=mongo
TMDB_KEY="51f6034647383dbsss5b5e48ea4028dfd0d"
DATABASE_URL=mongodb://localhost:27017/movies_db
JWT_SECRET_KEY=ilik
```


## API Design
[Give an overview of your web API design, perhaps similar to the following: ]

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| ... | ... | ... | ... | ...

[If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).]
https://app.swaggerhub.com/apis-docs/fxwalsh/userAPI/initial




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
I changed all of the endpoints in the React Application to go through the API instead of direct calls the TMDB Api. The favourites are also added when the button is clicked so that the MongoDB is also used. 

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


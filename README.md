# Netflix Clone

My take on a Netflix Clone where I used [this video](https://youtu.be/XtMThy8QKqU) as a reference.
Their app wasn't responsive and had minor issues that I fixed for a better user experience.
I also used NextJS & TypeScript insted to keep practicing those.

The API I'm using is [TMDB](https://www.themoviedb.org/), which is a huge movie database.

## Instructions to run application locally

Clone this repo and create a .env.local-file in the root-folder with following values.
````
NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY
````

Open a new terminal and run the following commands.
````
npm install
npm run dev
````

Application should now be running on http://localhost:3000

## Link to hosted application
https://netflix-clone-pink.vercel.app/

## Frameworks & Libraries

- NextJS
- TypeScript
- [React-YouTube](https://www.npmjs.com/package/react-youtube)
- [Movie-Trailer](https://www.npmjs.com/package/movie-trailer)

### More features

If I were to add more features to this, I would firstly optimize the loading-times of the images.
Add a card that opens on click, with further information about the series/movie, such as ratings, genres etc.
Add a login-feature where you could add movies/series to your favourites.

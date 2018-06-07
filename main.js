console.log('HOME WORK WEEK8 STEP2')
function getAjaxData(url) {
    return new Promise((resolve, reject) => {
        // Create new ajax call with the js function called XMLHttpRequest
        const request = new XMLHttpRequest();
        request.addEventListener('load', function () {
            // This in here is our callback function
            // Check our server responsecode, 200 means ok, success: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 
            if (this.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject('error');
            }
        });

        request.addEventListener('error', function (error) {
            reject(error);
        });

        // initializes a request with an http method
        request.open("GET", url);
        // Sends the request 
        request.send();
    });
}
//wait for 3 seconds, then fetch some movies using this url https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json
 function getTimeOutPromise(){
     return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },3000);
     })
 }
const timeOutPromise  = getTimeOutPromise();
timeOutPromise
   .then(()=>{
       //console.log('3 seconds elapsed');
       return getAjaxData('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json');
       
   })
   .then((movies)=>{
       //all movies
    console.log(movies);
    //Give each movie a tag: Excellent (>=8.5), Very Good (>=8), Good (<8) based on the ratings.
    const ratingOfMovies = movies.map(movie =>movie.rating)
    console.log('All movies by rating',ratingOfMovies)
    console.log('Number Of Rated Movies is',ratingOfMovies.length);
    
    const taggedMovies = movies.map(movie => {
        if(movie.rating>=8.5){
            movie['tag']='Excellent';
        }else if(movie.rating >=8){
            movie['tag'] = 'Very Good';
        }
        else {
            movie['tag'] = 'Good'
        }
        return movie
    }); 
    // filtering movies based on tags
    //  All tag
    const totalTaggedAllMovies = taggedMovies.filter(movie => movie.tag==='All');
const taggedAllMovies=totalTaggedAllMovies.length
console.log("total movies tagged all: "+taggedAllMovies);
// excellent tag
const totalExcellentMovies = taggedMovies.filter(movie => movie.tag==='Excellent');
const excellentMovieCount=totalExcellentMovies.length
console.log("total excellent movies: "+excellentMovieCount);
console.log(totalExcellentMovies);
console.log(totalExcellentMovies.title)
// very good tag
const totalVeryGoodMovies = taggedMovies.filter(movie => movie.tag==='Very Good');
const veryGoodMovieCount=totalVeryGoodMovies.length
console.log("total very good movies: "+veryGoodMovieCount);
//good tag
const totalGoodMovies = taggedMovies.filter(movie => movie.tag==='Good');
const goodMovieCount=totalGoodMovies.length
console.log("total good movies: "+goodMovieCount);
//Calculate the total rating of all the movies
const totalRating = movies.reduce((accumulator,movie) => accumulator + movie.rating,0);
console.log('total rating is',totalRating);
//Calculate the average rating of all the movies
console.log('Average Rating is',( totalRating/movies.length ).toFixed(2));
    //filter method on arrays to filter on the titles.
     //titles of all movies
     const movieTitle = movies.map(movie =>movie.title)
     console.log(movieTitle);
     for (let i = 0; i < movies.length; i++) { 
     const ul = document.querySelector('#movieList')
     //let ul = document.querySelector('#all-movies');
     const btn = document.querySelector('input')
    btn.addEventListener('click',function(){
       const li = document.createElement('li')
       ul.appendChild(li);
       
       li.innerHTML = movies[i].title ;
    });
     }
     
         // Show only Excellent Movies 
    let excellentTag = document.querySelector('#excellentMovies');
    excellentTag.addEventListener('click', function () {
        for (let movie of movies) {
            if (movie.tag === 'Excellent') {
                let excellentTagUl = document.createElement('excellentTagUl');
                let newExcellentLi = document.createElement('li');
              let  newExcellentList = excellentTagUl.appendChild(newExcellentLi);
                newExcellentList.innerHTML = movie.title;
            }
        }
    });
   
   });
   
   
   


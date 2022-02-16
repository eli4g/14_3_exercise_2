/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

// API endpoint: http://api.tvmaze.com/search/shows?q=<search query>

// API endpoint: http://api.tvmaze.com/shows/<show id>/episodes


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(q) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.


    return await axios.get('http://api.tvmaze.com/search/shows', {params: {q}});

    


}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {

  
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    console.log(show.show);

    let showImageUrl = show.show.image.medium;

    if (showImageUrl === '' || showImageUrl === null){
      showImageUrl = 'https://tinyurl.com/tv-missing';
    }else{

      showImageUrl = show.show.image.medium;
    }


    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card" data-show-id="${show.show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.show.name}</h5>
             <p class="card-text">${show.show.summary}</p>
             <img class="card-img-top" src=${showImageUrl}>
             <button class="episode-button" id = "${show.show.id}">Get Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  console.log(shows);



  populateShows(shows.data);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above

  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes'`,{
    headers: {"Access-Control-Allow-Origin": "*"} })
  console.log(response);
  return await axios.get(`http://api.tvmaze.com/shows/${id}/episodes'`);

    
}



function populateEpisodes(episodes) {

  
  const $episodeList = $("#episode-list");
  $episodeList.empty();

  for (let episode of episodes) {
    console.log(episode);

    


    let $item = $(`<li>${episode.number}-${episode.name}</li>`);

    $episodeList.append($item);


    
  }
  $("#episodes-area").show();
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$(".episode-button").on("click", async function showEpisodes (evt) {
  evt.preventDefault();

  let episodeId = $(this).attr('id');

  console.log("button clicked");
 

  let episodes = await getEpisodes(episodeId);

  
  console.log(episodes);


  populateEpisodes(episodes);
});
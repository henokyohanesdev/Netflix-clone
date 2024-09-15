const API_KEY = import.meta.env.VITE_API_KEY;

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`, 
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAnimes: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchTvMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    fetchAdventures: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
    fetchfamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
}

export default requests;
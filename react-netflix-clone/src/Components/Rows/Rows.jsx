import React from 'react'
import Row from './Row/Row'
import requests from '../../utils/requests'
import './Rows.css'

export default function Rows() {
  return (
    <>
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Family Movies" fetchUrl={requests.fetchfamily} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Adventures" fetchUrl={requests.fetchAdventures} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries } />
      <Row title="Anime" fetchUrl={requests.fetchAnimes} />
      <Row title="Tv Movies" fetchUrl={requests.fetchTvMovies} />
    </>
  )
}

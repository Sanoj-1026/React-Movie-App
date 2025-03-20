import styled from "styled-components"
import MovieComponent from "./component/MovieComponent";
import Pagination from "./component/Pagination";
import { use, useState,useEffect } from "react";
import axios from "axios";
import MovieInfoComponent from "./component/MovieInfoComponent";


export const  API_KEY = 'a692dba'
const container = styled.div`
display:flex;
flex-direction : column;
`;

const Header = styled.div`
display:flex;
flex-direction:row;
background-color:black;
justify-content: space-between;
align-items:center;
color:white;
padding:10px;
font-weight:bold;
box-shadow:0 3px 6px 0 #555;
`;

const AppName = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;

const MovieImage = styled.img`
width:48px;
height:48px;
margin:15px;
`;

const SearchBox = styled.div`
display:flex;
flex-direction: row;
padding: 20px 20px;
background-color : white;
border-radius : 6px;
margin-left: 40px;
width : 40%;
align-items : center;
`;

const Searchicon = styled.img`
width : 32px;
height : 32px;
`;

const SearchInput = styled.input`
color: black;
font-size : 16px;
font-weight : bold;
border : none;
outline: none;
margin-left: 15px;
`;

const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content : space-evenly;
gap : 24px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState(""); // Initialize with an empty string
  const [timeoutId, updateTimeoutId] = useState(null);
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Correct function name
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(3);
  const [loading, setLoading] = useState(false);

 

 useEffect(() => {
  const fetchData = async (searchString) => {
    setLoading(true);
    Getdata(searchString);
  };

  fetchData();
}, []);

const Getdata= async (searchString) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=a692dba`
    );
    if (response.data.Search) {
      updateMovieList(response.data.Search);
      setLoading(false);
    } else {
      updateMovieList([]); // Handle case where no results are found
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    updateMovieList([]); // Clear movie list on error
  }
}
// Get current Movie
const indexOfLastMovie = currentPage * moviePerPage;
const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
const currentMovie = movieList.slice(indexOfFirstMovie, indexOfLastMovie);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
   const timeout = setTimeout(() => Getdata(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <div>
      <Header>
        <AppName>
          <MovieImage src="/movie.png" />
          React Movie Searching App
        </AppName>
        <SearchBox>
          <Searchicon src="/Search.png" />
          <SearchInput placeholder="Search Movie" onChange={onTextChange} />
        </SearchBox>
      </Header>

      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <MovieListContainer >
                 {currentMovie?.length ? (
                   currentMovie.map((movie, index) => (
                     <MovieComponent
                       key={index}
                       movie={movie}
                       onMovieSelect={setSelectedMovie} 
                     />
                   ))
                 ) : (
                   <p>Search For Movies</p>
                 )}
               </MovieListContainer>

     
      <Pagination
        moviePerPage={moviePerPage}
        totalMovie={movieList.length}
        paginate={paginate}
      />
    </div>
  );}

export default App;

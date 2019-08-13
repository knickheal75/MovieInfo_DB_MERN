import React,{useState,useEffect} from 'react'
import "./favourite.css"
import Axios from "axios";
import {Popover} from "antd";
import {IMAGE_URL} from "../../Config";

function FavouritePage() {

    const variables = { userFrom : localStorage.getItem('userId')};

    const [favouriteMovies,setFavouriteMovies]=useState([]);

    useEffect(()=>{
        fetchFavouriteMovies();
    })

    const fetchFavouriteMovies=()=>{
         Axios.post("/api/favourite/getfavouriteMovie",variables)
        .then(response=>{
            if (response.data.success){
                setFavouriteMovies(response.data.favourites)
            }
            else
            {
                alert("Failed to get favourite movies");
            }
        })
    }

    const onClickRemove=(movieId)=>{

        const variable={
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }

          Axios.post("/api/favourite/removeFromFavourite",variable)
            .then(response=>{
                if (response.data.success){
                    fetchFavouriteMovies();
                }
                else{
                    alert("Failed to remove from favourites")
                }
            })
    }

    const renderTableBody = favouriteMovies.map((movie,index)=>{

        const content = (
            <div>
            {/* {movie.moviePost ? <img src={`${IMAGE_URL}w500${moviePost}`} alt="movie post"/> :"No image"} */}
            </div>
        )

        return (
            <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRuntime}</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove from favourites</button></td>
            </tr>
        )
    })
    
    return (
        <div style={{width:"85%",margin:"3rem auto"}}>
            <h3>My Favourite Movies</h3>
            <hr />

            <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <th>Remove from Favourites</th>
                </tr>
            </thead>
            <tbody>
                {renderTableBody}
            </tbody>
            </table>
        </div>
    )
}

export default FavouritePage

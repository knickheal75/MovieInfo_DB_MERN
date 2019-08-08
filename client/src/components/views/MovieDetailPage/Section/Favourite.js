import React,{useEffect,useState} from 'react';
import axios from "axios";

function Favourite(props) {

    const variable = {
            userFrom : props.userFrom,
            movieId: props.movieId,
            movieTitle: props.movieInfo.original_title,
            movieImage: props.movieInfo.backdrop_path,
            movieRuntime : props.movieInfo.runtime
        }

    const [favouriteCount,setFavouriteCount]=useState(0);
    const [Favourited,setFavourited]=useState(false);

    useEffect(()=>{

        

        axios.post("/api/favourite/favouriteCount", variable)
        .then(response=>{
                if(response.data.success)
                {
                    setFavouriteCount(response.data.favouriteCount);
                }
                else
                {
                    alert("Failed to get Favourite Count")
                }
        })

        axios.post("/api/favourite/favourited",variable)
        .then(response=>{
            if (response.data.success){
                setFavourited(response.data.favourited)
            }
            else
            {
                 alert("Failed to get Favourite Information")
            }
        })

    },[])

    const onClickFavourite=()=>{
        if (Favourited){
              axios.post("/api/favourite/removeFromFavourite",variable)
            .then(response=>{
                if (response.data.success){
                   setFavouriteCount(favouriteCount-1);
                    setFavourited(!Favourited);
                }
                else{
                    alert("Failed to remove from favourites")
                }
            })

        }
        else
        {
            axios.post("/api/favourite/addToFavourite",variable)
            .then(response=>{
                if (response.data.success){
                    setFavouriteCount(favouriteCount+1);
                    setFavourited(!Favourited);
                }
                else{
                    alert("Failed to add to favourites")
                }
            })
        }
    }

    return (
        <div>
            <button onClick={onClickFavourite}>{ Favourited ?"Remove from favourites":"Add to favourites"} {favouriteCount}</button>
        </div>
    )
}

export default Favourite

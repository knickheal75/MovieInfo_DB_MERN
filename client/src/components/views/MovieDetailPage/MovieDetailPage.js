import React, {useEffect,useState} from 'react';
import {API_URL,API_KEY,IMAGE_URL} from "../../Config" ;
import MainImage from "../LandingPage/Sections/MainImage";
import {Descriptions,Button,Row} from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favourite from "./Section/Favourite.js"

function MovieDetailPage(props) {
    
    const movieId = props.match.params.movieId;

    const [Movie,setMovie]=useState([]);
    const [Crews,setCrews]=useState([]);
    const [ActorToggle,setActorToggle]=useState(false);


   useEffect(()=>{

      

    //    above statement to match from URL

       fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
       .then(response=>response.json())
       .then(response=>{
           setMovie(response);
       })

       fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
       .then(response=> response.json())
       .then(response=>{
           setCrews(response.cast)
       })
   },[])

   const handleToggle=()=>{
       setActorToggle(!ActorToggle)
   }

    return (
        <div>

        {Movie &&
        
        <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title} 
        text={Movie.overview}
        />}

        <div style={{width:"85%",margin:"1rem auto"}}>
            <div style={{display:"flex",justifyContent:"flex-end"}}>
                <Favourite userFrom={localStorage.getItem("userId")} movieId={movieId} movieInfo={Movie}/>
            </div>
            
        {/* Movie Information Table */}
        <Descriptions title="Movie Information" bordered>
        <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="release_date">{Movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
        <Descriptions.Item label="vote_average" span={2}>{Movie.vote_average}</Descriptions.Item>
        <Descriptions.Item label="vote_count">{Movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
        <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
        </Descriptions>

         <br/>
        <div style={{display:"flex",justifyContent:"center"}}>
            <Button onClick={handleToggle}>Toggle Actor View</Button>
        </div>
         <br/>
       
        {/* Crews GRid Card */}
        { ActorToggle && 
            <Row gutter={[16,16]}>
        {Crews && Crews.map((crew,index)=>{
            return (<React.Fragment key={index}>
               { crew.profile_path && <GridCard actor image={`${IMAGE_URL}w500${crew.profile_path}`}/>}
            </React.Fragment>)  
        })}
        </Row>
        }
         

        </div>
        </div>
    )
}

export default MovieDetailPage

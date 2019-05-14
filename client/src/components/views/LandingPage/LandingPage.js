import React,{useEffect} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL,API_KEY} from "../../Config" 

function LandingPage() {

useEffect(()=>{
    fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then(response=>response.json())
    .then(response=>{
        console.log(response)
    })
},[])
    return (
        <>
        <div className="app">
            <FaCode style={{ fontSize: '4rem' }} /><br />
            
        </div>
        
        </>
    )
}

export default LandingPage

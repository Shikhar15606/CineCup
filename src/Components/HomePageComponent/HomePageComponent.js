import React, { Component } from 'react';
import './HomePageStyle.css'
import CustomizedTables from "./LeaderboardComponent"
function HomePageComponent (){
    
        return (
            <>
            <div><h2>Movie Nomination Leaderboard</h2></div>
               <CustomizedTables /> 
            </>
        );
   
}


export default HomePageComponent;
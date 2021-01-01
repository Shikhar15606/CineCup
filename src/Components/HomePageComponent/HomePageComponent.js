import React, { Component } from 'react';
import './HomePageStyle.css'
// import '../../assets/css/flex-slider.css'
// import '../../assets/css/bootstrap.min.css'
// import '../../assets/css/templatemo-art-factory.css'
// import '../../assets/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
function HomePageComponent (){
    
        return (
            <>
            <div>

            
            <div className="welcome_box">
            <Grid container >
                <Grid item xs={12} md={5} className="welcome_text">
                 <h1>Cinecup Presents</h1>
                 <p>Cinecup 2020 movie awards</p>
                </Grid>
                <Grid item xs={12} md={7} className="welcome_image">
                <img src="https://templatemo.com/templates/templatemo_537_art_factory/assets/images/slider-icon.png"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
            </Grid>

            </div>
            <div className="section1">
            <Grid container >
            <Grid item xs={12} md={6} className="welcome_image">
                <img src="https://templatemo.com/templates/templatemo_537_art_factory/assets/images/left-image.png"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1>LeaderBoard</h1>
                 
                 <Button variant="contained" color="primary">
                   Leaderboard
                 </Button>
                </Grid>
                
            </Grid>

            </div>
            <div className="section2">
            <Grid container >
            
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1>Nomination</h1>
                 
                </Grid>
                <Grid item xs={12} md={6} className="welcome_image">
                <img src="https://templatemo.com/templates/templatemo_537_art_factory/assets/images/right-image.png"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
                
            </Grid>

            </div>
            <div className="section3">
            <Grid container >
            <Grid item xs={12} md={6} className="welcome_image">
                <img src="https://image.freepik.com/free-vector/social-media-isometric-concept-with-characters-landing-page-template-illustration_106788-1300.jpg"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1>Ranking Algorithm</h1>
                 
                </Grid>
                
            </Grid>

            </div>
            </div>
            
               
            </>
        );
   
}


export default HomePageComponent;
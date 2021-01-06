import React,{useState,useEffect} from 'react';
import './HomePageStyle.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import {useSelector,useDispatch} from 'react-redux';
import { init } from 'ityped';

function HomePageComponent (){
        const user = useSelector(state => state.user);
       
        useEffect(()=>{
          if(user.announcement){
            const myElement = document.querySelector('#myElement')
          init(myElement, { showCursor: false, strings:user.announcement })
          }
        },[user.announcement])
        return (
            <>
            <div className="wrapper_home">

            
            <div className="welcome_box">
            <Grid container >
            
                <Grid item xs={12} md={5} className="welcome_text">
                 <h1 className="heading_h" style={{textDecoration:"none"}}>Cinecup Presents</h1>
                 <p className="text_home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis turpis ut mauris pellentesque lobortis. Aliquam interdum facilisis varius. Vestibulum eu orci nibh. Duis non nibh quis urna faucibus tempus. Fusce non nisi luctus, iaculis lectus vitae, blandit metus. Ut sit amet viverra turpis, nec fermentum nisi. Cras et aliquet urna, ac euismod erat. Quisque rhoncus cursus vehicula. Nam dolor lorem, consectetur fringilla interdum sit amet, vehicula vitae libero.</p>
                </Grid>
                <Grid item xs={12} md={7} className="welcome_image">
                <img src="https://templatemo.com/templates/templatemo_537_art_factory/assets/images/slider-icon.png"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
                
            </Grid>

            </div>
           
            <Grid container className="section" >
            <Grid item xs={12} md={6} className="welcome_image">
            <img src="https://templatemo.com/templates/templatemo_537_art_factory/assets/images/left-image.png"
                         className="wel_image" alt="First Vector Graphic" />
            </Grid>
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1 className="heading_h">LeaderBoard</h1>
                 <p className="text_home">Lorem Ipsum is simply dummy text of the printing and typesetting industry. ive centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                 <Button variant="outlined" color="secondary" small>
                   Leaderboard
                 </Button>
                </Grid>
                
            </Grid>

            
            
            <Grid container className="section" >
               <Grid item xs={12} md={6} className="imag">
                <img src="https://templatemo.com/templates/templatemo_537_art_factory/assets/images/right-image.png"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
            
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1 className="heading_h">Nomination</h1>
                 <p className="text_home">Lorem Ipsum is simply dummy text of the printing and typesetting industry. book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                 <Button variant="outlined" color="secondary" small>
                   Nominate
                 </Button>
                </Grid>
                
                
            </Grid>

            
            
            <Grid container className="section">
            <Grid item xs={12} md={6} className="imag">
                <img src="https://lukaszadam.com/assets/downloads/javascript_illustration.svg"
                         className="wel_image" alt="First Vector Graphic" />
                </Grid>
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1 className="heading_h">Ranking Algorithm</h1>
                 <p className="text_home">Lorem Ipsum is simply dummy text of the printing and typesetting industry.  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                 <Button variant="outlined" color="secondary" small>
                   Dashboard
                 </Button>
                </Grid>
                
            </Grid>

            <Grid container className="section" >
                <Grid item xs={12} md={6} className="welcome_text">
                 <h1 className="heading_h">Announcements</h1>
                 <p className="text_home" id="type">
                 <div id="myElement"></div>
                 </p>
                </Grid>
                
                
            </Grid>

            </div>
            
               
            </>
        );
   
}


export default HomePageComponent;
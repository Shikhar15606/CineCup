import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function LoginPageComponent(){
    
        return (
            <div >
                <Container maxWidth="sm">
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <FontAwesomeIcon icon={faUser} />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Username" />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <FontAwesomeIcon icon={faLock} />
                    </Grid>
                    <Grid item>
                        <TextField type="password" id="input-with-icon-grid" label="Password" />
                    </Grid>
                </Grid>
                <Button
                    style={{width:"80%",margin:"25px"}}
                    variant="contained"
                    color="secondary"
                    startIcon={<FontAwesomeIcon icon={faGoogle}/>}>
                    Login with Google
                </Button>
                <Button
                    style={{width:"80%",margin:"25px"}}
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faFacebookF}/>}>
                    Login with Facebook
                </Button>
                </Container>
            </div>
        );
    
}

export default LoginPageComponent;
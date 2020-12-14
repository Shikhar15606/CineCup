import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignUpPageComponent(){
    
        return (
            <div>
                 <Container maxWidth="sm">
                <Button
                    style={{width:"80%",margin:"25px"}}
                    variant="contained"
                    color="secondary"
                    startIcon={<FontAwesomeIcon icon={faGoogle}/>} >
                    SignUp with Google
                </Button>
                <Button
                    style={{width:"80%",margin:"25px"}}
                    variant="contained"
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faFacebookF}/>}>
                    SignUp with Facebook
                </Button>
                </Container>
            </div>
        );
    
}

export default SignUpPageComponent;
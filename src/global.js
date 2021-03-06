import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`


  body {
    
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    
  }
  .navbar_h{
    background:${({ theme }) => theme.nav_background};
  }
  .back_s{
    background-color:${({ theme }) => theme.search_card_background}
  }
  .our-team{
    background-color:${({ theme }) => theme.search_card_background}
    color: ${({ theme }) => theme.text};
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  }
  .voting{
    color: ${({ theme }) => theme.text};
  }
.list__header{
  background-color:${({ theme }) => theme.search_card_background}
}
.header_row {
  background-color:${({ theme }) => theme.search_card_background}
}
.list__row{
  color: ${({ theme }) => theme.text};
  background-color:${({ theme }) => theme.search_card_background}
}
.list{
  box-shadow: 0px 12px 25px ${({ theme }) => theme.list_shadow1} 0px 5px 12px ${({ theme }) => theme.list_shadow2};
}
.searchbox{
  background-color:${({ theme }) => theme.search_bar}

}
.drawe{
  color: ${({ theme }) => theme.text};
  background-color:${({ theme }) => theme.search_card_background}
}
.voting_text{
  color: ${({ theme }) => theme.text};
}
.noresults{
  max-height:300px;
  height:100%;
  width:auto;
  position:relative;
  
}
.login-root{
  background-color : ${({ theme }) => theme.login_background};
}

.button1:disabled,
.button1[disabled]{
  border: 1px solid #999999;
  background-color: ${({ theme }) => theme.disabled_bg};
  color: ${({ theme }) => theme.disabled_color};
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
 
  -webkit-text-fill-color: ${({ theme }) => theme.text};
  -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255,0) inset;
  transition: background-color 5000s ease-in-out 0s;
}


`;

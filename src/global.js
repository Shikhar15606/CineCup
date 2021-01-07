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
`;

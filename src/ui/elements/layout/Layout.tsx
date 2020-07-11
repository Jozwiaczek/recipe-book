import React from 'react';
import {createGlobalStyle} from 'styled-components';
import Theme, {ITheme, styled} from './Theme';
import {INavBarItems, NavBar} from './NavBar';

const GlobalStyle = createGlobalStyle<{theme: ITheme}>`
  body {
    padding: 0;
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    color: ${props => props.theme.palette.text.primary};
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const StyledWrapper = styled.div`
  height: 100vh;
  padding-top: ${props => props.theme.sizes.navbarHeight};;
  background-color: ${props => props.theme.palette.background.default};
`;

const navBarItems: INavBarItems = {
  main: {
    title: 'Recipe Book',
    link: '/'
  },
  menuItems: []
};

export const Layout: React.FC = ({children}) => (
  <Theme>
    <GlobalStyle/>
    <StyledWrapper>
      <NavBar main={navBarItems.main} menuItems={navBarItems.menuItems}/>
      {children}
    </StyledWrapper>
  </Theme>
);

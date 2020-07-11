import React, {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {styled} from './Theme';

interface IMenuItem {
  title: string;
  link: string;
}

export interface INavBarItems {
  main: IMenuItem;
  menuItems: Array<IMenuItem>;
}

export const NavBar: FC<INavBarItems> = ({main, menuItems}) => {
  const [isShow, setShow] = React.useState(true);
  const [scrollPos, setScrollPos] = React.useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
    setShow(document.body.getBoundingClientRect().top > scrollPos);
  };

  return (
    <Transition>
      <StyledNavbar className={isShow ? 'active' : 'hidden'}>
        <Title to={main.link}>{main.title}</Title>
        <nav>
          {
            menuItems.map((menuItem, index) => (
              <LinkNav key={index} to={menuItem.link}>
                {menuItem.title}
              </LinkNav>
            ))
          }
        </nav>
      </StyledNavbar>
    </Transition>
  );
};

const Transition = styled.div`
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`;

const LinkNav = styled(Link)`
  text-decoration: none;
`;

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  height: ${props => props.theme.sizes.navbarHeight};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  background: cornflowerblue;
  z-index: 1000;
  a {
    margin-right: 1rem;
    font-weight: normal;
  }
    
`;

const Title = styled(LinkNav)`
  margin-left: 2rem;
  font-weight: 500;
  color: white;
  font-size: 1.6rem;
`;

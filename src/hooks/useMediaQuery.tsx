import React, {createContext, FC, useContext, useEffect, useState} from 'react';

interface IContext {
  width: number;
}

const ViewportContext = createContext<IContext>({width: window.innerWidth});

export const ViewportProvider: FC = ({children}) => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{width}}>
      {children}
    </ViewportContext.Provider>
  );
};

interface IUseMediaQuery {
  isMobile: boolean;
  br: string;
}

const useMediaQuery = (): IUseMediaQuery => {
  const {width} = useContext(ViewportContext);

  const response = {
    isMobile: width < 600,
    br: ''
  };

  if (width < 600) {
    response.br = 'xs';
  } else if (width >= 600 && width < 960) {
    response.br = 'sm';
  } else if (width >= 960 && width < 1280) {
    response.br = 'md';
  } else if (width >= 1280 && width < 1920) {
    response.br = 'lg';
  } else if (width >= 1920) {
    response.br = 'xl';
  }

  return response;
};

export default useMediaQuery;

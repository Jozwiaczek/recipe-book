import React from 'react';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router} from 'react-router-dom';
import {RecipeList} from './components/RecipeList';
import {Layout} from './elements/layout/Layout';
import {ViewportProvider} from '../hooks/useMediaQuery';

const App: React.FC = () => (
  <Router>
    <ViewportProvider>
      <Layout>
        <RecipeList/>
      </Layout>
    </ViewportProvider>
  </Router>
);

export default hot(App);

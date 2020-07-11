import React from 'react';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router} from 'react-router-dom';
import {RecipeList} from './components/RecipeList';
import {Layout} from './elements/layout/Layout';

const App: React.FC = () => (
  <Router>
    <Layout>
      <RecipeList/>
    </Layout>
  </Router>
);

export default hot(App);

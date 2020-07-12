import React from 'react';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router} from 'react-router-dom';
import {RecipeList} from './components/RecipeList';
import {Layout} from './elements/layout/Layout';
import {ViewportProvider} from '../hooks/useMediaQuery';
import {ToastProvider} from './elements/Toast';

const App: React.FC = () => (
  <Router>
    <ViewportProvider>
      <ToastProvider>
        <Layout>
          <RecipeList/>
        </Layout>
      </ToastProvider>
    </ViewportProvider>
  </Router>
);

export default hot(App);

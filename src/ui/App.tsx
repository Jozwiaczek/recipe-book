import React from 'react';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RecipeList} from './components/RecipeList';
import RecipeEdit from './components/RecipeEdit';
import {Layout} from './elements/layout/Layout';

const App: React.FC = () => (
  <Layout>
    <Router>
      <Switch>
        <Route exact path='/'>
          <RecipeList/>
        </Route>

        <Route exact path='/edit/:recipeId'>
          <RecipeEdit/>
        </Route>

      </Switch>
    </Router>
  </Layout>
);

export default hot(App);

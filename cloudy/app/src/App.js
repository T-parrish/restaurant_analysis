import './App.css';
import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import PageWrapper from './hoc/PageWrapper';
import Spinner from './components/Spinner';
import ComingSoon from './pages/comingSoon';

const opsPage = lazy(() => import('./pages/opsPage'));

function App() {

  return (
    <div className="App">
      <Suspense fallback={<div className='fallback'><Spinner /></div>}>
        <Switch>
          <Route path="/opsPage">
            <PageWrapper Component={opsPage} />
          </Route>
          <Route path="/revPage">
            <PageWrapper Component={ComingSoon} />
          </Route>
          <Route path="/loyaltyPage">
            <PageWrapper Component={ComingSoon} />
          </Route>
          <Redirect from="/" to="/opsPage" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;

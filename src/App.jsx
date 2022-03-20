import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LoggedInLayout } from 'layout';
import pages from 'pages';
import './lang/i18n';

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Router>
        {/* LoggedIn Pages Start */}
        <LoggedInLayout>
          <Routes>
            {pages.map(({ path, Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </Routes>
        </LoggedInLayout>
        {/* LoggedIn Pages End */}
      </Router>
    </Suspense>
  );
}

export default App;

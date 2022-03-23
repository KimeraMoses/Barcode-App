import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LoggedInLayout } from 'layout';
import './lang/i18n';
import Login from 'pages/Login/Login.page';

function App() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<LoggedInLayout />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;

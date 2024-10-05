import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Helmet} from 'react-helmet';
import Login from "./Login";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={
              <>
                  <Helmet>
                      <link rel="icon" href="/images/favicon.ico" type="image/x-icon"/>
                      <link rel="stylesheet" href="/css/style.css"/>
                  </Helmet>
                  <Login/>
              </>
            }/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;

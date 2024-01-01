import React, { useEffect, useState } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { rootReducer } from "./store/reducer";

import thunk from "redux-thunk";

import { hot } from "react-hot-loader/root";

import "./main.global.css";
import { Layout } from "./shared/components/Layout";
import { Header } from "./shared/Header";
import { NotFound } from "./shared/NotFound";
import { Content } from "./shared/Content";
import { Main } from "./shared/Main";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function AppComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider store={store}>
      {mounted && (
        <BrowserRouter>
          <Layout>
            <Header />
            <Content>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>
      )}
    </Provider>
  );
}

// export const App = hot(AppComponent); <-- hook won't work with token if it is used like here
export const App = hot(() => <AppComponent />);

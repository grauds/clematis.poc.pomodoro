import React, { useEffect, useState } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import thunk from "redux-thunk";

import { hot } from "react-hot-loader/root";

import { Layout } from "./shared/components/Layout";
import { Header } from "./shared/Header";
import { NotFound } from "./shared/NotFound";
import { Content } from "./shared/components/Content";
import { Main } from "./shared/Main";
import { Statistics } from "./shared/Statistics";

import { initialState, rootReducer } from "./store/reducer";

import "./main.global.css";

let persistedState;

function datesReviver(key: string, value: string) {
  // lame workaround for dates restoration
  if (typeof value === 'string' && key === 'date') {
      return new Date(Date.parse(value))
  }
  return value;
}

if (typeof window !== "undefined") {
  const item = localStorage.getItem("reduxState")
  persistedState = item ? JSON.parse(item, datesReviver) : initialState;
}

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });
}

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
                <Route path="/statistics" element={<Statistics />} />
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

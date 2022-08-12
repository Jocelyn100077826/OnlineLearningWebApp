import React, {useEffect} from 'react';
import {createStore} from "redux";
import {createWrapper} from "next-redux-wrapper";
import reducer from "../redux/reducer.js";

const makeStore = context => createStore(reducer);
const wrapper = createWrapper(makeStore, {debug: false});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);

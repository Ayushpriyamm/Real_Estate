import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import { persistor, store } from "../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

//PersistGate is a component provided by the redux-persist library that helps ensure your application doesn't render until the persisted state has been retrieved and rehydrated.

//The loading prop of PersistGate is set to null, indicating that no loading indicator is displayed while the persisted state is being retrieved. This is optional and can be customized according to your application's needs.

//The persistor prop is passed to PersistGate, which specifies the persistor object responsible for retrieving and rehydrating the persisted state.

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

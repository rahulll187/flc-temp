import React from "react";
import { AppRegistry, View } from "react-native";
import Router from "./router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from "./reducers/configureStore";
import * as Sentry from "@sentry/react-native";
import { SENTRY_URL } from "./constants";

Sentry.config(SENTRY_URL, {
  deactivateStacktraceMerging: true,
}).install();

const FieldForce = () => (
  <Provider store={store}>
    <PersistGate loading={<View />} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent("FieldForce", () => FieldForce);
export default FieldForce;

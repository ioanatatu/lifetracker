import React from "react";
import ReactDOM from "react-dom";
/*
 *
 * components
 */
import Welcome from "./Welcome/Welcome";
import App from "./App/App";
/*
 *
 * Redux boilerplate stuff
 */
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import reducer from "./Redux/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
// import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

store.subscribe(() => {
    console.log("Redux store is now: ", store.getState());
});
/*
 *
 * render App OR Welcome based on url
 */
// console.log(location.pathname != "/welcome");
const userIsLoggedIn = location.pathname != "/welcome";
/*
 *
 * render
 */
ReactDOM.render(
    userIsLoggedIn ? renderIfUserIsLoggedIn() : <Welcome />,
    document.getElementById("app")
);
/*
 *
 *
 *
 *
 * helper functions
 */
function renderIfUserIsLoggedIn() {
    // init(store);
    return (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

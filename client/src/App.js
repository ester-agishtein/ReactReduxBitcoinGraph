import "./App.css";
import React from "react";
import Graph from "./components/Graph";
import DateSelector from "./components/DateSelector";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../src/reducers/rootReducers";
import { devToolsEnhancer } from "redux-devtools-extension";
import Jumbotron from "react-bootstrap/Jumbotron";

function App() {
  const store = createStore(rootReducer, devToolsEnhancer());
  return (
    <Provider store={store}>
      <div id="App">
        <Jumbotron>
          <h1>Welcome to the Bitcoin Graph</h1>
          <p>
            Select a date and a currency. The graph will display the bitcoin
            market data.
          </p>
        </Jumbotron>
        <div id="App-content">
          <Graph />
          <DateSelector />
        </div>
      </div>
    </Provider>
  );
}

export default App;

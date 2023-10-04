import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringComponent } from "../string/string";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";
import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter >
        <Switch>
          <Route path="/fibonacci-school" exact>
            <MainPage />
          </Route>
          <Route path="/fibonacci-school/recursion">
            <StringComponent />
          </Route>
          <Route path="/fibonacci-school/fibonacci">
            <FibonacciPage />
          </Route>
          <Route path="/fibonacci-school/sorting">
            <SortingPage />
          </Route>
          <Route path="/fibonacci-school/stack">
            <StackPage />
          </Route>
          <Route path="/fibonacci-school/queue">
            <QueuePage />
          </Route>
          <Route path="/fibonacci-school/list">
            <ListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

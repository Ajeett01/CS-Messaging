import { Route, Switch } from "react-router";
import { AgentSelection } from "./pages/AgentSelection";
import { CustomerSelection } from "./pages/CustomerSelection";
import { AgentHome } from "./pages/AgentHome";
import { Home } from "./pages/Home";
import { CustomerHome } from "./pages/CustomerHome";


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/select-agent">
          <AgentSelection />
        </Route>
        <Route exact path="/select-customer">
          <CustomerSelection />
        </Route>
        <Route exact path="/agent-home/:id">
          <AgentHome />
        </Route>
        <Route exact path="/customer-home/:id">
          <CustomerHome />
        </Route>
      </Switch>
    </>
  );
}

export default App;

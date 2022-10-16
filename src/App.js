import React from "react";


// 1. Importing other modules
import { GetWeb3, GetContract, GetAccount } from "./BlockchainUtil";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateElection from "./CreateElection";
import ActiveElections from "./ActiveElections";
import contractJson from "./build/contracts/MainContract.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      account: null,
      mainInstance: null,
    };
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    // 2. Load web3
    const Web3 = new GetWeb3();
    this.web3 = await Web3.getWeb3();
    this.setState({ web3: this.web3 });

    // 3. Load Account
    const Account = new GetAccount();
    this.account = await Account.getAccount(this.web3);
    this.setState({ account: this.account[0] });

    // 4. Load Contract
    const Contract = new GetContract();
    this.mainInstance = await Contract.getContract(this.web3, contractJson);
    this.setState({ mainInstance: this.mainInstance });
  }

  render() {
    return <div>
      
      <Router>
        {/* Default route to ActiveElections component */}
        <Route path="/" exact>
          <Redirect to="/active" component="<Active>"/>
        </Route>

        {/* Navbar */}
        <nav
          className="navbar navbar-dark shadow"
          style={{
            backgroundColor: "#1b2021",
            height: "60px",
            color: "white",
            marginBottom: "50px",
          }}
        >
          {/* Link to Active election page (nav-header) */}
          <Link to="/active">
            <b style={{ cursor: "pointer", color: "white" }}>Avalanche Elections</b>
          </Link>

          {/* Account address on the right side of the navbar  */}
          <span style={{ float: "right" }}>{this.state.account}</span>
        </nav>

        {/* Route to CreateElection page */}
        {
          <Route
            path="/createElection"
            exact
            component={() => <CreateElection account={this.state.account} />}
          />
        }

        {/* Route to Active election page */}
        {
          <Route
            path="/active"
            exact
            component={() => <ActiveElections account={this.state.account} />}
          />
        }
      </Router>
</div>;
  }
}
export default App;

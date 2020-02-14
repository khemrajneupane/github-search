import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [], search: "", followers: [] };
  }
  submitFollowers = () => {
    fetch(`https://api.github.com/users/${this.state.search}/followers`) // https://api.github.com/users/khemrajneupane
      .then(response => response.json())
      .then(responseData => {
        //console.log("followers: ", responseData);
        this.setState({
          followers: [responseData]
        });
      });
  };

  submitSearch = () => {
    this.submitFollowers();
    fetch(`https://api.github.com/users/${this.state.search}`) // https://api.github.com/users/khemrajneupane
      .then(response => response.json())
      .then(responseData => {
        //console.log("listitems: ", responseData);
        this.setState({
          listItems: [this.state.followers.concat(responseData)]
        });
      });
  };

  inputChanged = event => {
    this.setState({
      search: event.target.value
    });
  };
  componentDidMount() {
    this.submitSearch();
    this.submitFollowers();
  }
  render() {
    console.log("this.state.listItems", this.state.listItems);
    const fullInfo = this.state.listItems.map(m => m.map(n => n));
    console.log(fullInfo);
    return (
      <div>
        <h1 style={{ textAlign: "center", color: "blue" }}>
          Github Repository Search
        </h1>
        <input
          type="text"
          value={this.state.search}
          onChange={this.inputChanged}
        />{" "}
        <Button className="btn btn-primary" onClick={this.submitSearch}>
          Search...
        </Button>
        <div></div>
        <ReactTable
          data={this.state.listItems}
          columns={[
            {
              Header: "Author",
              accessor: "login"
            },
            {
              Header: "URls",
              accessor: "html_url",

              Cell: e => (
                <div>
                  {e.value}

                  <a
                    href={e.value}
                    style={{ textDecoration: "none", fontSize: 20 }}
                    target="-blank"
                  >
                    {" "}
                    Search
                  </a>
                </div>
              )
            },
            {
              Header: "Followers",
              accessor: "[0].login "
            }
          ]}
        />
      </div>
    );
  }
}

export default App;

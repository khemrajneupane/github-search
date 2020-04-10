import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [], search: "" };
  }

  submitSearch = () => {
    fetch("https://api.github.com/search/repositories?q=" + this.state.search)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          listItems: responseData.items
        });
      });
  };

  inputChanged = event => {
    this.setState({
      search: event.target.value
    });
  };
  render() {
    console.log(this.state.listItems);

    return (
      <div>
        <h1 style={{ textAlign: "center", color: "blue" }}>
          Git repo search
        </h1>
        <input
          type="text"
          value={this.state.search}
          onChange={this.inputChanged}
        />{" "}
        <Button className="btn btn-primary" onClick={this.submitSearch}>
          Search...
        </Button>
        <ReactTable
          data={this.state.listItems}
          columns={[
            {
              Header: "Description",
              accessor: "name"
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
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
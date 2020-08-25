import React, {Component} from "react";
import Users from "./components/users";
import {getData} from "./api/index";
class App extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.getService();
  }
  getService = async () => {
    const options = {method: "GET", url: "http://localhost:3001/members"};
    const res = await getData(options);
    this.setState({data: res.data});
  };
  render() {
    const {data} = this.state;
  
    return (
      <div>
        <Users data={data}/>
      </div>
    );
  }
}

export default App;

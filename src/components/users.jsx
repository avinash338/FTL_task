import React, {Component} from "react";
import {getData} from "./../api/index";
import Modal from "./modal";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  handleChange = (e) => {
    const id = e.target.value;
    this.getUserdata(id);
  };
  getUserdata = async (id) => {
    const options = {method: "GET", url: `http://localhost:3001/members/${id}`};
    if (id) {
      const response = await getData(options);
      this.setState({userData: response.data});
    }
  };
  render() {
    const {data} = this.props;
    const {userData} = this.state;

    return (
      <div style={{textAlign: "center", paddingTop: "20px"}}>
        <h4>List of Users</h4>
        <select
          name="selectedUser"
          onChange={this.handleChange}
          className="ui dropdown"
        >
          <option value="">Select an User</option>
          {data.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.real_name}
              </option>
            );
          })}
        </select>
        {userData.id ? <Modal accessParent={this} userdata={userData} /> : null}
      </div>
    );
  }
}

export default Users;

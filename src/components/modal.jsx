import React, {Component} from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
  state = {
    selectedDate: "",
    activeSession: [],
  };
  handleClick = () => {
    this.props.accessParent.setState({userData: {}});
  };
  handleDate = (e) => {
    const formattedDate = this.formatDate(e.target.value);
    this.setState({selectedDate: formattedDate});

    const result = this.props.userdata.activity_periods.filter((item) =>
      item.start_time.includes(formattedDate)
    );
    this.setState({activeSession: result});
  };
  formatDate = (date) => {
    const date01 = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate =
      months[date01.getMonth()] +
      " " +
      date01.getDate() +
      " " +
      date01.getFullYear();

    return formattedDate;
  };
  render() {
    const {userdata} = this.props;
    const {selectedDate, activeSession} = this.state;
    console.log(this.state);
    console.log(!this.state.selectedDate);

    return ReactDOM.createPortal(
      <div
        className="ui dimmer modals visible active"
        onClick={this.handleClick}
      >
        <div
          className="ui standard modal visible active"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header">{userdata.real_name}</div>

          <div className="content">
            <div className="ui calendar" id="example1">
              <label htmlFor="date">
                <h5>
                  Select a date to check an{" "}
                  <span style={{color: "blue"}}>Active Session</span>
                </h5>
              </label>
              <br />
              <input
                type="date"
                id="date"
                name="selectedDate"
                onChange={this.handleDate}
              />
            </div>
            <br />
            {activeSession.length ? (
              <div>
                <h5>
                  Active Session found for{" "}
                  <span style={{color: "blue"}}>{selectedDate}</span>
                </h5>
                <p>
                  Start Time :{" "}
                  {activeSession[0].start_time.replace(selectedDate, "")}
                </p>
                <p>
                  End Time :{" "}
                  {activeSession[0].end_time.replace(selectedDate, "")}
                </p>
                <br />
              </div>
            ) : selectedDate ? (
              <div>
                <h5>
                  No Active Session found for{" "}
                  <span style={{color: "red"}}>{selectedDate}</span>
                </h5><br/>
              </div>
            ) : null}
            <button className="ui negative button" onClick={this.handleClick}>
              CLOSE
            </button>
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

export default Modal;

import React, { Component } from "react";

import Loader from "./components/Loader";
import MonthCard from "./components/MonthCard";
import UserCard from "./components/UserCard";
import "./index.scss";

const listOfMonthes = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    currentUsers: null,
  };

  componentDidMount() {
    fetch("https://yalantis-react-school.herokuapp.com/api/task0/users")
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: this.addMonthOfBirth(result),
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  addMonthOfBirth = list => {
    return list.map(function(item) {
      const date = new Date(item.dob);
      const month = date
        .toLocaleString("default", { month: "long" })
        .toLowerCase();
      return {
        ...item,
        month
      };
    });
  };

  getMonthClass = month => {
    const counter = this.getMonthCounter(month);
    switch (true) {
      case counter <= 2:
        return "gray";
      case counter >= 3 && counter <= 6:
        return "blue";
      case counter >= 7 && counter <= 10:
        return "green";
      case counter >= 11:
        return "red";
      default:
        return "";
    }
  };

  groupByMonth = list => {
    return list.reduce((acc, obj) => {
      const value = obj.month;
      acc[value] = acc[value] || [];
      acc[value].push(obj);
      return acc;
    }, {});
  };

  handleShowUsers = month => {
    const { items } = this.state;
    const currentUsers = this.groupByMonth(items)[month];
    this.setState({
      currentUsers
    });
  };

  handleHideUsers = () => {
    this.setState({
      currentUsers: null
    });
  };

  getMonthCounter = month => {
    const { items } = this.state;
    return this.groupByMonth(items)[month].length;
  };

  render() {
    const { error, isLoaded, currentUsers } = this.state;
    if (error) {
      return <div>ERROR: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="container">
          <div>
            {listOfMonthes.map(month => (
              <MonthCard
                month={month}
                additionalClass={this.getMonthClass(month)}
                key={month}
                onOpenUsers={() => this.handleShowUsers(month)}
                hideUsers={this.handleHideUsers}
              />
            ))}
          </div>
          <div className="columnRight">
            {Boolean(currentUsers) &&
              currentUsers.map(user => <UserCard user={user} key={user.id} />)}
          </div>
        </div>
      );
    }
  }
}

export default App;

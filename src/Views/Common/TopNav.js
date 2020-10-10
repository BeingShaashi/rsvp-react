import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopNav extends Component {
  componentDidMount() {}

  matchCurrentPath(path) {
    if (!path) return false;

    let r1 = new RegExp(`^${path}/+.*`);
    return !!(window.location.pathname + "/").match(r1);
  }

  items = [
    { label: "Register", path: "/register" },
    { label: "Users", path: "/users" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  render() {
    return (
      <div className="topnav">
        {this.items.map((item, i) => (
          <div
            key={i}
            className={
              "topnavlink-wrapper" +
              (this.matchCurrentPath(item.path) ? " active" : "")
            }
          >
            <Link className={"topnavlink"} to={item.path}>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default TopNav;

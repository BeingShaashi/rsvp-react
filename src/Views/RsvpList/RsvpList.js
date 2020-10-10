import React, { Component } from "react";
import api from "../../Services/Api";
import TopNav from "../Common/TopNav";

class RsvpList extends Component {
  state = {
    rsvps: [],
  };

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    this.load();
  }

  componentWillUnmount = () => {
    this.mounted = false;
  };

  async load() {
    try {
      this.setState({ loading: true, error: null });

      let res = await api.getRsvps();

      if (typeof res === "string") res = JSON.parse(res);
      if (!res?.rsvps) throw new Error("Something went wrong");

      if (this.mounted) {
        let rsvps = res.rsvps?.map((x) => ({
          ...x,
          _id: x._id?.$oid || x._id?._id || x._id,
        }));

        console.log({rsvps})
        this.rsvps = rsvps;
        this.setState({ loading: false, rsvps });
      }
    } catch (e) {
      console.error(e);
      this.setState({ error: e.message, loading: false });
    }
  }

  handleSearch(str) {
    if (!str) return this.setState({ rsvps: this.rsvps });
    else {
      let rsvps = this.rsvps?.filter((x) => {
        let matched = false;

        let regexp = new RegExp(str, "ig");
        matched = x.name.match(regexp) || x.locality.match(regexp);

        return !!matched;
      });

      this.setState({ rsvps });
    }
  }

  render() {
    const {
      state: { rsvps },
    } = this;

    return (
      <>
        <TopNav />

        <div className="main-container rsvplist">
          <div className="inner-container">
            <div className="rsvp-table">
              <div className="caption">
                <span>RSVP List</span>
                <SearchBox onChange={this.handleSearch.bind(this)} />
              </div>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Profession</th>
                    <th scope="col">Locality</th>
                    <th scope="col">Guests</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps?.map((item, index) => (
                    <TableRow
                      key={item._id}
                      item={item}
                      index={index}
                      history={this.props.history}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class SearchBox extends Component {
  state = { str: "" };
  timer = null;

  onType(str) {
    this.setState({ str });
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.onChange(str);
    }, 200);
  }

  render() {
    return (
      <input
        className="searchbox"
        placeholder="Search"
        value={this.state.str}
        onChange={(e) => this.onType(e.target.value)}
      />
    );
  }
}

class TableRow extends Component {
  handleClick() {
    this.props.history.push("/users/" + this.props.item?._id);
  }

  render() {
    const {
      props: {
        item: { name, dob, profession, locality, noOfGuest },
      },
    } = this;

    const age = dob
      ? parseInt(
          (Date.now() - new Date(parseInt(dob)).getTime()) /
            (1000 * 60 * 60 * 24 * 365)
        )
      : null;

    return (
      <tr onClick={this.handleClick.bind(this)}>
        <td data-label="Name">{name}</td>
        <td data-label="Age">{age}</td>
        <td data-label="Profession">{profession}</td>
        <td data-label="Locality">{locality}</td>
        <td data-label="Guests">{noOfGuest}</td>
      </tr>
    );
  }
}

export default RsvpList;

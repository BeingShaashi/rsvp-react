import React, { Component } from "react";
import moment from "moment";

import api from "../../Services/Api";
import TopNav from "../Common/TopNav";

class RsvpDetails extends Component {
  state = {
    rsvp: [],
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
      let _id = this.props.match.params?._id;

      this.setState({ loading: true, error: null });

      let res = await api.getRsvp({ _id });

      if (!res?.rsvp) throw new Error("Something went wrong");

      if (this.mounted) {
        this.setState({ loading: false, rsvp: res.rsvp });
      }
    } catch (e) {
      console.error(e.message);
      this.setState({ error: e.message, loading: false }, () =>
        console.log(this)
      );
    }
  }

  render() {
    const {
      state: { rsvp, error, loading },
    } = this;

    const { name, dob, profession, locality, noOfGuest, address } = rsvp || {};

    const age = dob
    ? parseInt(
        (Date.now() - new Date(parseInt(dob)).getTime()) /
          (1000 * 60 * 60 * 24 * 365)
      )
    : null;

    return (
      <>
        <TopNav />

        <div className="main-container">
          <div className="inner-container">
            <div className="register-box">
              {loading ? (
                <div className="centerify">
                  <div className="loader"></div>
                </div>
              ) : (
                <form
                  className="register-form validate-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <span className="register-form-title">User Details</span>

                  {error ? (
                    <div className="error">
                      <span>{error}</span>
                    </div>
                  ) : null}

                  <div className="form-input-box">
                    <span className="form-input-label">Your Name</span>
                    <input
                      className="form-input"
                      defaultValue={name}
                      type="text"
                      readOnly
                    />
                  </div>

                  <div className="form-input-box">
                    <span className="form-input-label">Date of birth</span>
                    <input
                      className="form-input"
                      type="text"
                      defaultValue={`${moment(parseInt(dob)).format(
                        "Do MMMM, YYYY"
                      )} (age: ${age}yrs)`}
                      readOnly
                    />
                  </div>

                  <div className="form-input-box">
                    <span className="form-input-label">Profession</span>
                    <input
                      className="form-input"
                      type="text"
                      defaultValue={profession}
                      readOnly
                    />
                  </div>

                  <div className="form-input-box">
                    <span className="form-input-label">Locality</span>
                    <input
                      className="form-input"
                      type="text"
                      defaultValue={locality}
                      readOnly
                    />
                  </div>

                  <div className="form-input-box">
                    <span className="form-input-label">No of Guest</span>
                    <input
                      className="form-input"
                      type="text"
                      defaultValue={noOfGuest}
                      readOnly
                    />
                  </div>

                  <div className="form-input-box">
                    <span className="form-input-label">Address</span>
                    <textarea
                      defaultValue={address}
                      className="form-input textarea"
                      type="text"
                      readOnly
                    />
                  </div>

                  {error ? (
                    <div className="error">
                      <span>{this.state.error}</span>
                    </div>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RsvpDetails;

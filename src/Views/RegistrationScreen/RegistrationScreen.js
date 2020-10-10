import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import api from "../../Services/Api";
import TopNav from "../Common/TopNav";

class RegistrationScreen extends Component {
  initialState = {
    name: "",
    dob: "",
    profession: "",
    locality: "",
    noOfGuest: "",
    address: "",
    loading: false,
    error: null,
    success: false,
  };

  state = this.initialState;

  componentDidMount() {}

  componentWillUnmount = () => {};

  async handleSubmit(e) {
    try {
      e.preventDefault();
      if (this.state.loading) return;

      this.setState({ loading: true, error: null });

      const {
        state: { name, dob, profession, locality, noOfGuest, address },
      } = this;

      await api.register({
        name,
        dob,
        profession,
        locality,
        noOfGuest,
        address,
      });

      this.setState({ ...this.initialState, success: true });
      setTimeout(() => {
        this.setState({success:false})
      }, 3000);
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    const {
      state: {
        name,
        dob,
        profession,
        locality,
        noOfGuest,
        address,
        error,
        loading,
        success,
      },
    } = this;

    return (
      <>
        <Prompt
          when={
            !!(name || dob || profession || locality || noOfGuest || address)
          }
          message={() => `Are you sure you want to leave this page?`}
        />

        <TopNav />

        <div className="main-container">
          <div
            style={success ? {} : { display: "none" }}
            className="success-container"
          >
            <div
              className="close-mark"
              onClick={() => this.setState({ success: false })}
            >
              X
            </div>
            <div className="success-msg">Registration Successfull</div>
          </div>

          <div className="inner-container">
            <div className="register-box">
              <form
                className="register-form validate-form"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <span className="register-form-title">Register</span>

                {error ? (
                  <div className="error">
                    <span>{this.state.error}</span>
                  </div>
                ) : null}

                <div className="form-input-box">
                  <span className="form-input-label">Your Name</span>
                  <input
                    className="form-input"
                    value={name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                  <span className="focus-input100"></span>
                </div>

                <div className="form-input-box">
                  <span className="form-input-label">Date of birth</span>
                  <input
                    className="form-input"
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={(e) => this.setState({ dob: e.target.value })}
                    required
                  />
                  <span className="focus-input100"></span>
                </div>

                <div className="form-input-box">
                  <span className="form-input-label">Profession</span>
                  <select
                    value={profession}
                    onChange={(e) =>
                      this.setState({ profession: e.target.value })
                    }
                    className="form-input"
                    name="profession"
                    required
                  >
                    <option disabled value="">
                      Select Profession
                    </option>
                    <option value="employed">Employed</option>
                    <option value="student">Student</option>
                  </select>
                  <span className="focus-input100"></span>
                </div>

                <div className="form-input-box">
                  <span className="form-input-label">Locality</span>
                  <input
                    value={locality}
                    onChange={(e) =>
                      this.setState({ locality: e.target.value })
                    }
                    className="form-input"
                    type="text"
                    name="locality"
                    placeholder="Enter your locality"
                    required
                  />
                  <span className="focus-input100"></span>
                </div>

                <div className="form-input-box">
                  <span className="form-input-label">No of Guests</span>
                  <select
                    value={noOfGuest}
                    onChange={(e) =>
                      this.setState({ noOfGuest: e.target.value })
                    }
                    className="form-input"
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                  <span className="focus-input100"></span>
                </div>

                <div className="form-input-box">
                  <span className="form-input-label">Address</span>
                  <textarea
                    value={address}
                    onChange={(e) => this.setState({ address: e.target.value })}
                    maxLength={50}
                    className="form-input textarea"
                    type="text"
                    name="locality"
                    placeholder="Enter your locality"
                    required
                  />
                  <span className="focus-input100"></span>
                </div>

                {error ? (
                  <div className="error">
                    <span>{this.state.error}</span>
                  </div>
                ) : null}

                <div className="form-btn-wrapper">
                  <button
                    className="contact100-form-btn"
                    type={"submit"}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="centerify">
                        <div className="loader small"></div>
                      </div>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RegistrationScreen;

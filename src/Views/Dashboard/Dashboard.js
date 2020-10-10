import React, { Component } from "react";

import api from "../../Services/Api";
import TopNav from "../Common/TopNav";
import DoughnutChart from "./DoughnutChart";

class Dashboard extends Component {
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

        console.log({ rsvps });
        this.rsvps = rsvps;

        let stats = this.prepareStatistics(rsvps) || {};

        console.log({ stats });

        this.setState({ loading: false, ...stats });
      }
    } catch (e) {
      console.error(e);
      this.setState({ error: e.message, loading: false });
    }
  }

  prepareStatistics(rsvps) {
    rsvps = rsvps || this.rsvps;

    let avgGroupSize = this.calculateAverageGroupSize(rsvps);
    let prosCount = this.calculateNoOfPros(rsvps);
    let studentCount = this.calculateNoOfStudents(rsvps);
    let totalCount = rsvps?.length;
    let peopleByLocalities = this.getPeopleByLocalities(rsvps);
    let peopleByAge = this.getPeopleByAge(rsvps);

    return {
      avgGroupSize,
      prosCount,
      studentCount,
      totalCount,
      peopleByLocalities,
      peopleByAge,
    };
  }

  render() {
    return (
      <>
        <TopNav />

        {/* Average group size of people attending the event (using guests count).
Professionals & students count. */}

        <div className="main-container dashboard">
          <div className="inner-container">
            <div className="container">
              <div className="statbox-bar">
                <div className="statbox">
                  <div
                    className="card"
                    style={{
                      background: "linear-gradient(45deg,#6a11cb,#2575fc)",
                    }}
                  >
                    <div className="card-body">
                      <div className="count">
                        {(this.state.avgGroupSize || 0)?.toFixed(2)}
                      </div>

                      <div className="label">Average Group Size</div>
                    </div>
                  </div>
                </div>
                <div className="statbox">
                  <div
                    className="card"
                    style={{
                      background: "linear-gradient(45deg,#fc4a1a,#f7b733)",
                    }}
                  >
                    <div className="card-body">
                      <div className="count">{this.state.prosCount || 0}</div>

                      <div className="label">Professionals</div>
                    </div>
                  </div>
                </div>
                <div className="statbox">
                  <div
                    className="card"
                    style={{
                      background: "linear-gradient(45deg,#00b09b,#96c93d)",
                    }}
                  >
                    <div className="card-body">
                      <div className="count">
                        {this.state.studentCount || 0}
                      </div>

                      <div className="label">Students</div>
                    </div>
                  </div>
                </div>
                <div className="statbox">
                  <div
                    className="card"
                    style={{
                      background: "linear-gradient(45deg,#ee0979,#ff6a00)",
                    }}
                  >
                    <div className="card-body">
                      <div className="count">{this.state.totalCount || 0}</div>

                      <div className="label">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-row">
                {this.state.peopleByLocalities ? (
                  <DoughnutChart
                    data={this.state.peopleByLocalities || []}
                    title="No of people by localities"
                  />
                ) : null}
                {this.state.peopleByAge ? (
                  <DoughnutChart
                    data={this.state.peopleByAge || []}
                    title="No of people by age"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  calculateAverageGroupSize(rsvps) {
    let totalGuest =
      rsvps?.map((x) => x.noOfGuest).reduce((a, b) => a + b, 0) || 0;
    let avgGuestCount = rsvps?.length ? totalGuest / rsvps?.length : 0;
    let avgGroupSize = avgGuestCount + 1;
    return avgGroupSize;
  }

  calculateNoOfPros(rsvps) {
    return rsvps?.filter((x) => x.profession === "employed").length;
  }

  calculateNoOfStudents(rsvps) {
    return rsvps?.filter((x) => x.profession === "student").length;
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getPeopleByLocalities(rsvps) {
    let key = "locality";
    let localitiesObj = this.groupBy(rsvps || [], key);

    let list = Object.keys(localitiesObj).map((key) => ({
      data: localitiesObj[key]?.length,
      label: key,
      backgroundColor:
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
    }));

    let sortedList = list.sort((a, b) => b.data - a.data);

    console.log({ localitiesObj, list, sortedList });

    return {
      datasets: [
        {
          data: sortedList.map((x) => x.data),
          backgroundColor: sortedList.map((x) => x.backgroundColor),
        },
      ],
      labels: sortedList.map((x) => x.label),
      total: sortedList.map((x) => x.data).reduce((a, b) => a + b, 0),
    };
  }

  getPeopleByAge(rsvps) {
    let localitiesObj = {};

    let ranges = [
      {
        label: "13-18",
        range: [13, 18],
        backgroundColor:
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        count: 0,
      },
      {
        label: "18-25",
        range: [18, 25],
        backgroundColor:
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        count: 0,
      },
      {
        label: "25+",
        range: [25, Infinity],
        backgroundColor:
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        count: 0,
      },
    ];

    let len = rsvps.length;
    let rangelen = ranges.length;

    for (let i = 0; i < len; i++) {
      const item = rsvps[i];
      if (!item || !item.dob) continue;
      const age = item.dob
        ? parseInt(
            (Date.now() - new Date(parseInt(item.dob)).getTime()) /
              (1000 * 60 * 60 * 24 * 365)
          )
        : 0;

      let matched = false;
      for (let j = 0; j < rangelen && !matched; j++) {
        const range = ranges[j].range;

        if (age > range[0] && age <= range[1]) {
          ranges[j].count = ranges[j].count + 1;
          matched = true;
        }
      }
    }

    return {
      datasets: [
        {
          data: ranges.map((x) => x.count),
          backgroundColor: ranges.map((x) => x.backgroundColor),
        },
      ],
      labels: ranges.map((x) => x.label),
      total: ranges.map((x) => x.count).reduce((a, b) => a + b, 0),
    };
  }
}

export default Dashboard;

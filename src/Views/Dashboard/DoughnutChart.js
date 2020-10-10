import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutChart extends Component {
  render() {
    const {
      props: { data, title },
    } = this;

    console.log({ data });

    return (
      <div className="chartbox">
        <div className="card">
          <div className="cardheader">{title}</div>
          <div className="chartholder">
            <Doughnut
              data={{ datasets: data.datasets, labels: data.labels }}
              options={{ legend: false }}
            />
          </div>
          <div>
            <table>
              <tbody>
                {data.datasets?.[0]?.data?.map((x, i) => {
                  return (
                    <tr>
                      <td>
                        <div className="flex">
                          <div
                            className="color-circle"
                            style={{
                              backgroundColor:
                                data.datasets[0].backgroundColor?.[i],
                            }}
                          />
                          {data.labels[i]}
                        </div>
                      </td>
                      <td>{x}</td>
                      <td>{((x * 100) / data.total).toFixed(2)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DoughnutChart;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import Predictions from "../components/Predictions";
import LineChart from "../components/LineChart";

function DashboardPage() {
  const userData = JSON.parse(localStorage.getItem("userdata"))

  if (userData === null) {
    window.location.href = '/login';
  } 

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <section className="ml-2 mr-2">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>15</h3>

                <p>Appliances</p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faComputer} />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>102</h3>

                <p>Consumption (November)</p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>244</h3>

                <p>Consumption (October)</p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faChartBar} />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>4</h3>

                <p>Exceeded Devices</p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faWarning} />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mr-2 ml-2">
        <div className="row">
          <div className="col-lg-6">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <PieChart />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mr-2 ml-2">
        <div className="row">
        <div className="col-lg-12">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <Predictions />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* <section className="mr-2 ml-2">
        <div className="row">
        <div className="col-lg-12">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <LineChart />
              </div>
            </div>
          </div>

        </div>
      </section> */}
    </div>
  );
}

export default DashboardPage;

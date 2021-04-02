import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [country, setcountry] = useState([]);
  const [data, setdata] = useState([]);
  const [info, setinfo] = useState([]);
//   const [location, setlocation] = useState("");
  const [selected, setselected] = useState("Global");
//   console.log(location);
//   console.log(data);
  useEffect(() => {
    axios.get("https://api.covid19api.com/countries").then((res) => {
      setcountry(res.data);
    });
    axios.get("https://api.covid19api.com/summary").then((res) => {
      setinfo(res.data.Global);
      setdata(res.data.Countries);
    });
  }, []);

  const getLocation = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let res = response.data;
        setselected(res.country_name);
        // setlocation(res.country_name.toLowerCase());

        const newdata = data.filter(
          (item) => item.Slug === res.country_name.toLowerCase()
        );

        setinfo(newdata[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedCountry = (e) => {
    setselected(e.target.value);
    const showdata = data.filter((item) => item.Slug === e.target.value);
    setinfo(showdata[0]);
  };

  return (
    <div id="app">
      <div className="container">
        <div className="row">
          <select
            onChange={selectedCountry}
            className="mt-2 form-control form-control-sm"
          >
            <option value="Global">Global</option>
            {country.map((item, index) => (
              <option key={index} value={item.Slug}>
                {item.Country}
              </option>
            ))}
          </select>
        </div>
        <h1 className="display-4">{selected.toUpperCase()}</h1>
        <div
          className="badge badge-primary"
          style={{ cursor: "pointer" }}
          onClick={getLocation}
        >
          Get your Country Information
        </div>
        <div className="mt-4 row d-flex justify-content-between main-container">
          <span className="badge badge-primary d-flex flex-column">
            <span> Confirmed</span>
            <span className="span mt-3">
              {info.TotalConfirmed?.toLocaleString()}
            </span>
          </span>
          <span className="badge badge-success d-flex flex-column">
            <span> Deaths</span>
            <span className="span mt-3">
              {info.TotalDeaths?.toLocaleString()}
            </span>
          </span>
          <span className="badge badge-danger d-flex flex-column">
            <span> Recovered</span>
            <span className="span mt-3">
              {info.TotalRecovered?.toLocaleString()}
            </span>
          </span>
        </div>
        <div className="row mt-5">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Country</th>
                <th scope="col">Confirmed</th>
                <th scope="col">Deaths</th>
                <th scope="col">Recovered</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index + 1}>
                  <th scope="row">{index}</th>
                  <td>{item.Country} </td>
                  <td>{item.TotalConfirmed}</td>
                  <td>{item.TotalDeaths}</td>
                  <td>{item.TotalRecovered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;

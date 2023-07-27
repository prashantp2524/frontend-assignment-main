import React, { useState } from "react";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tradeData, setTradeData] = useState([]);
  const [error, setError] = useState("");
  console.log(tradeData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/fetchStockData", {
        symbol,
        dateFrom,
        dateTo,
      });
      setTradeData(response.data);
    } catch (error) {
      setError(
        "Error fetching stock data. Please check your inputs and try again."
      );
    }
  };

  return (
    <>
      <div className="container m-5">
        <div className=" d-flex justify-content-center">
          <h1>AI Stock Trade Statistics</h1>
        </div>

        <div className="container m-5 row shadow p-3 mb-5 bg-body rounded d-flex justify-content-between">
          <div className="container justify-content-center  col-4 card p-2">
            <h1 className="display-6">Enter valid data</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Enter Symbol Name
                    <input
                      className="form-control"
                      type="text"
                      placeholder="AAP"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Enter Valid Date
                    <input
                      className="form-control"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Enter Valid Date
                    <input
                      className="form-control"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-7 card ">
            {tradeData && (
              <div>
                <h3>Trade Data</h3>
                <div>
                  <h5>
                    Trade Statistics for {symbol} on {dateFrom} to {dateTo}:
                  </h5>
                </div>
                {/* { Open: o, High: h, Low: l, Close: c, Volume: v }; */}
                <div className="container">
                  <div className="row border">
                    <div className="col border fw-bold">Sr No</div>
                    <div className="col border fw-bold">Open</div>
                    <div className="col border fw-bold">High</div>
                    <div className="col border fw-bold">Low</div>
                    <div className="col border fw-bold">Close</div>
                    <div className="col border fw-bold">Volume</div>
                  </div>
                  <div style={{ height: "300px", overflow: "scroll" }}>
                    {tradeData.map((item, indx) => (
                      <div className="row border">
                        <div className="col border">{indx + 1}</div>
                        <div className="col border">{item.o}</div>
                        <div className="col border">{item.h}</div>
                        <div className="col border">{item.l}</div>
                        <div className="col border">{item.c}</div>
                        <div className="col border">{item.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

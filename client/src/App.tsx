import "./App.css";
import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { clickedModel, realTimeModel, responseModel } from "./Models/socketModel";

function App() {
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(e.target.value);
  };
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [buy, setBuy] = useState<responseModel>();
  const [sell, setSell] = useState<responseModel>();
  const [side, setSide] = useState("");
  const [message, setMessage] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYkwrNE5IVDlHdWx2QWU4clhVQmVKNFJaNG02UHd0bmUxRDBQcW9sdXVqa21VOG9vR1lDTkdSalYzUW5kVUxQRVgyVTdLN2dnZGIzVmU4ZlFhclJnT3NYSlQrSUhLL05kUWlUUVRRR0U1WjVCbkVUekU2SFNOa0NFQ3NDVUhoWjE4RE1yQ1hzVTFXK3hjUXI1VzlIM3FkcGxWQWh2TEpTZGlKNGxMZm41NWN3K3g0SkRSbERWRUloTnRYbWdVNGRBYnY4WWJCaW9nazFrTWltU0FHWmluTFF5TXFVRnpHU09zbURXaGgxZEM3ZVQrUVR6UExqYmRaVndUUFE3REpadHN5Y2lzS1ZGRXQveE8wQWk1Vm01Yy9MeGQ1emRFOFYzMzFHb1ZsT0l1YzFsa08yU0JjTTEycGQ1b3NUY0JHVzJNdTF3cmRqalpCMFJXRDl5cmV6Z0ZEUm9FVWw2U3dNL014MmhsT2wyZGlYdWsrZmxUdVNLUE1Xd1ZOa3dNd0pVUVJ5VU1JU0l6bHl4ZERvaXFVa3FBM1habHpBVC9FVC9TMGVydzhySjBsOVErbmFISit6clByb1hzTWRwTHJoanZMcXVuV1NjS2NxYUxyRHNmSEt1SnJmTktWVWluQVVSdGdDYnNOMGNSWkJRcGx1K1dvMWp4VnFEM3Yrb0pNbkova0Q1RDl4eVdjc1RRbDVGSkNpYWNBPT0iLCJpYXQiOjE2NDM3MjQwMDAsImV4cCI6MTY0MzgxMDQwMH0.zME4A-Q2kWCKSkvL2OzRgFLz_UjUu2fonj0dckOWwlk";

  let ws: WebSocket;

  useEffect(() => {
    setInterval(socket, 100);
  });

  const fullDetailes: realTimeModel = {
    type: "execution",
    id: "dc7d7e2c-2155-475b-b31f-76dbced95c6b",
    data: {
      product: "BTC-USD",
      side: side,
      quantity: inputNumber,
      type: "MKT",
      slippage: 15,
      retries: 3,
    },
  };

  const socket = () => {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }
    ws = new WebSocket(`wss://ws-api.enigma-x.app/?token=${token}`);
    ws.onopen = () => {
      console.log("Connection opened!");
    };
    //sell
    setSide("SELL");
    ws.send(JSON.stringify(fullDetailes));
    ws.onmessage = ({ data }) => setSell(data);
    //buy
    setSide("BUY");
    ws.send(JSON.stringify(fullDetailes));
    ws.onmessage = ({ data }) => setBuy(data);

    ws.onclose = function () {
      ws = null;
    };
  };

  useEffect(() => {}, [sell, buy]);

  const clicked = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ws) {
      setMessage("No WebSocket connection :(");
      return;
    }
    let price: number | string;
  
    if(e.currentTarget.id === "selling"){
      setSide("SELL")
      price = sell?.content?.price
    }else{
      setSide("BUY");      
      price = buy?.content?.price
    }

    let clickedDetailes: clickedModel = {
      type: "execution",
      id: "dc7d7e2c-2155-475b-b31f-76dbced95c6b",
      data: {
        product: "BTC-USD",
        side: side,
        quantity: inputNumber,
        price: price,
        type: "LIMIT",
        time_in_force: "FOK",
        slippage: 15,
        retries: 3,
      },
    };  

    ws.send(JSON.stringify(clickedDetailes));
    ws.onmessage = ({ data }) => {
      setMessage(JSON.stringify(data));
    };
  };

  return (
    <BrowserRouter>
      <div className="app">
        <section>
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange(e) } type="number" min="1" />
        </section>
        <main>
          <div className="container">
            <div className="orders" id="orders" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => clicked(e) } >
              <p>Orders</p>
              <p id="messages">{buy?.content?.side}</p>
            </div>
            <div className="selling" id="selling" onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => clicked(e) } >
              <p>Selling</p>
              <p id="messages">{sell?.content?.side}</p>
            </div>
          </div>

          {message !== undefined && message !== '' && 
          <div className="server-notes">
            {message}
          </div>
          }
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

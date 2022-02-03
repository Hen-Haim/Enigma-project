const express = require("express");
const WebSocket = require("ws");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYkwrNE5IVDlHdWx2QWU4clhVQmVKNFJaNG02UHd0bmUxRDBQcW9sdXVqa21VOG9vR1lDTkdSalYzUW5kVUxQRVgyVTdLN2dnZGIzVmU4ZlFhclJnT3NYSlQrSUhLL05kUWlUUVRRR0U1WjVCbkVUekU2SFNOa0NFQ3NDVUhoWjE4RE1yQ1hzVTFXK3hjUXI1VzlIM3FkcGxWQWh2TEpTZGlKNGxMZm41NWN3K3g0SkRSbERWRUloTnRYbWdVNGRBYnY4WWJCaW9nazFrTWltU0FHWmluTFF5TXFVRnpHU09zbURXaGgxZEM3ZVQrUVR6UExqYmRaVndUUFE3REpadHN5Y2lzS1ZGRXQveE8wQWk1Vm01Yy9MeGQ1emRFOFYzMzFHb1ZsT0l1YzFsa08yU0JjTTEycGQ1b3NUY0JHVzJNdTF3cmRqalpCMFJXRDl5cmV6Z0ZEUm9FVWw2U3dNL014MmhsT2wyZGlYdWsrZmxUdVNLUE1Xd1ZOa3dNd0pVUVJ5VU1JU0l6bHl4ZERvaXFVa3FBM1habHpBVC9FVC9TMGVydzhySjBsOVErbmFISit6clByb1hzTWRwTHJoanZMcXVuV1NjS2NxYUxyRHNmSEt1SnJmTktWVWluQVVSdGdDYnNOMGNSWkJRcGx1K1dvMWp4VnFEM3Yrb0pNbkova0Q1RDl4eVdjc1RRbDVGSkNpYWNBPT0iLCJpYXQiOjE2NDM4MTU5MjQsImV4cCI6MTY0MzkwMjMyNH0.C1GlmPMpw13VddK_XWwUGsrEYgwkq9msJa3REuvBshI";

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

let server = app.listen(`wss://ws-api.enigma-x.app/?token=${token}`, () =>
  console.log("listening to port enigma")
);

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  let allData = JSON.parse(ws);
  allData.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

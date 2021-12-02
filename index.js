const express = require("express");

const testTarget = require("./Test_target.json");

const app = express();

app.use(express.json());

app.post("/process", (req, res) => {
  let squareDeltaSummation = 0;
  let n = testTarget.length;

  let inputFromFrontend = req.body;

  for (i = 0; i < testTarget.length; i++) {
    let delta = testTarget[i] - inputFromFrontend[i];
    let squareDelta = delta * delta;
    squareDeltaSummation += squareDelta;
    //console.log(delta, " ", squareDelta);
  }

  let ecm = (1 / n) * squareDeltaSummation;

  console.log("sumatoria deltas al cuadrado * 1/n", squareDeltaSummation * (1 / n));

  res.send({ Response: ecm });
});

app.listen(3001, () => {
  console.log("app escuchando puerto 3001");
});

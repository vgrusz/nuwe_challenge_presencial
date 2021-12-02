const express = require("express");

const testTarget = require("./Test_target.json");

const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3001;

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

  res.send({
    ecm: ecm,
    prediccion: inputFromFrontend,
    objetivo: testTarget,
  });
});

app.listen(PORT, () => {
  console.log("app escuchando puerto ", PORT);
});

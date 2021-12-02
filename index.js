const express = require("express");

const testTarget = require("./Test_target.json");

const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3001;

app.use(express.json());

app.post("/process", (req, res) => {
  try {
    let squareDeltaSummation = 0;
    let n = testTarget.length;

    let inputFromFrontend = req.body;

    //Verifies incoming data quantity
    if (inputFromFrontend.length != 990) throw new Error("Length of input not equal to 990");

    for (i = 0; i < testTarget.length; i++) {
      //verifies incoming data type
      if (typeof testTarget[i] != "number") throw new Error("Type error, expected number, received other");
      if (typeof inputFromFrontend[i] != "number") throw new Error("Type error, expected number, received other");

      let delta = testTarget[i] - inputFromFrontend[i];
      let squareDelta = delta * delta;
      squareDeltaSummation += squareDelta;
    }

    let ecm = (1 / n) * squareDeltaSummation;

    console.log("Summation of delta's squares * 1/n", squareDeltaSummation * (1 / n));

    res.send({
      ecm: ecm,
      prediccion: inputFromFrontend,
      objetivo: testTarget,
    });
  } catch (error) {
    console.log(error);
    res.send({ "error ": error.message });
  }
});

app.listen(PORT, () => {
  console.log("app listening on port ", PORT);
});

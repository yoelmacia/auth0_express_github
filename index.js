const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/user/signin/callback", (req, res) => {
  const { query } = req;
  const { code } = query;
  if (!code) {
    return res.send({
      success: "false",
      message: "Error, no code"
    });
  }
  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: "<your_client_id>",
      client_secret: "<your_secret_id>",
      code,
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      const data = response.data;
      token = data.split("&")[0].split("=")[1];
      res.send(token);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

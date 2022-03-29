const express = require("express");
const cors = require("cors");
const connectDatabase = require("./connection");
const Person = require("./person_model.js");
const User = require("./users_model.js");
const webpush = require("web-push");

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();


const publicVapidKey =
  "BErT8yw_oZTyNwR1ZlmTcgURTCnfVyOWMw0YvQBOGc8WsH1Cc6bBM3GRCUbLjExUaGBSXnntzz6RLlaBdcWyS8s";

const privateVapidKey = "sFo79ntrv2XrB-UVDVdDhHl-CfPAyNj0FbhKyfhP4Ms";


webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);


app.post("/api/persons", async (req, res) => {
  const user = await User.findOne({_id:req.body.id});

  const persons = await Person.find({userId:user._id});
  res.status(201).json({
    success: "success",
    message: "Working properly",
    data: {
      persons,
    },
  });

});

app.post("/api/signup", async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const response = await User.create(user);
    res.status(201).json({
      message: "user successfully created",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "user is not created",
      data: error.message,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.status(201).json({
          message: "user is logged in successfully",
          data: user,
        });
      } else {
        res.status(201).json({
          message: "password does not match",
          data: null,
        });
      }
    } else {
      res.status(201).json({
        message: "user does not exist",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "user is not logged in",
      data: error.message,
    });
  }
});

app.post("/api", async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.email });
  console.log(data);
  console.log(user);

  const subscription = user.subscription;

  const response = await Person.create({
    name: data.name,
    address: data.address,
    age: data.age,
    userId: user._id,
  });

  res.status(201).json({
    message: "data successfully inserted",
    data: { response },
  });

  const payload = JSON.stringify({ title: user.name });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));

});

app.listen(4500, () => {
  console.log("Server is working on port 4500");
});

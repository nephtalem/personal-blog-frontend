const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Replace with a strong secret key
const SECRET_KEY = "jhasdf843rh3u4r9%%#$%#jifhsdfaesr"; // Change this to a secure, unique key

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://blog:blog@cluster0.en6dj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, resp) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Attempt to create a new user
    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Respond with the user document and token
    resp.status(201).json({ user: userDoc, token });
  } catch (error) {
    // Handle specific errors, e.g., duplicate username
    if (error.code === 11000) {
      // MongoDB duplicate key error
      resp.status(400).json({ error: "Username already exists." });
    } else if (error.name === "ValidationError") {
      // Handle other validation errors
      resp
        .status(400)
        .json({ error: "Validation failed", details: error.message });
    } else {
      // Handle all other errors
      resp
        .status(500)
        .json({ error: "An error occurred during registration." });
    }
  }
});

app.post("/login", async (req, resp) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      return resp.status(400).json({ error: "Invalid username or password." });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
      return resp.status(400).json({ error: "Invalid username or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expiration time
      }
    );
    // Successful login: respond with user data and token
    resp.status(200).json({
      message: "Login successful!",
      user: {
        id: userDoc._id,
        username: userDoc.username,
        // Include any other user fields you want to return
      },
      token,
    });
  } catch (error) {
    resp.status(500).json({ error: "An error occurred during login." });
  }
});

app.listen(4000);

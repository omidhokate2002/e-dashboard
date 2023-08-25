import express from "express";
import cors from "cors";
import "./db/config.js";
import User from "./db/user.js";
import Product from "./db/product.js";
import jwt from "jsonwebtoken";

const app = express();
const JWT_KEY = "omidhokate2002";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, JWT_KEY, { expiresIn: "24h" }, (error, token) => {
      if (error) {
        res.send({
          result: "Something went wrong, Please try after some time.",
        });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .send({ error: "An error occurred while registering the user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      const user = await User.findOne(req.body).select("-password");
      console.log("Logged In User", user);
      if (user) {
        jwt.sign({ user }, JWT_KEY, { expiresIn: "24h" }, (error, token) => {
          if (error) {
            res.send({
              result: "Something went wrong, Please try after some time.",
            });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.send({ result: "User not found." });
      }
    } else {
      res.send({ result: "User not found." });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ error: "An error occurred while logging in" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .send({ error: "An error occurred while adding the product" });
  }
});

app.get("/products", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No Products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching products" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  console.log("Deleting product with id:", id);

  try {
    const deletionResult = await Product.deleteOne({ _id: id });

    if (deletionResult.deletedCount > 0) {
      res.send({ result: "Product deleted successfully" });
    } else {
      res.send({ result: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the product" });
  }
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({
      result: "No record found",
    });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  try {
    const key = req.params.key;

    const result = await Product.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { category: { $regex: key, $options: "i" } },
        { company: { $regex: key, $options: "i" } },
      ],
    });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    console.log("MiddleWare Called", token);
    jwt.verify(token, JWT_KEY, (error, valid) => {
      if (error) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

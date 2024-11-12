// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT;

// genAI model bnaye
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "mern stack me backend me kya kya important cheeje pta honi chaiye  english me btao";
const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
    // console.log(result.response.text());
  } catch (err) {
    console.log(err);
  }
};

// generate();

app.get("/api/content", async (req, res) => {
  try {
    const data = req.body.question;
    console.log(data);
    const response = await generate(data);
    console.log(response);
    res.send({
      res: response,
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});

const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

const llmController = require("../controllers/llmController");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

router.post("/summarize", limiter, llmController.summarize);

module.exports = router;
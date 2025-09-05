const express = require("express");
const { getAnswer } = require("../controllers/helpSection.controller");
const { submitIssue } = require("../controllers/helpSection.controller");
const router = express.Router();

router.post('/submit', submitIssue);
router.post("/chat", getAnswer);

module.exports = router;

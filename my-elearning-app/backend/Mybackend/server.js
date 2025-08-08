const axios = require("axios");

const setupCompilerRoute = (app) => {
  const JUDGE0_URL =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true";

  app.post("/compile", async (req, res) => {
    const { source_code, language_id } = req.body;

    if (!source_code || !language_id) {
      return res
        .status(400)
        .json({ error: "source_code and language_id are required" });
    }

    try {
      const encodedCode = Buffer.from(source_code).toString("base64");

      const body = {
        source_code: encodedCode,
        language_id,
      };

      const response = await axios.post(JUDGE0_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error("Judge0 API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Compilation error" });
    }
  });
};

module.exports = setupCompilerRoute;

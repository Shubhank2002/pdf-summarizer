const pdf_parser = require("pdf-parse");
console.log(pdf_parser);
const GetSummary = require("../services/summaryService");

const SummaryController = async (req, res) => {
  const buffer = req.file.buffer;
  try {
    const parsed = await pdf_parser(buffer);
    const summary = await GetSummary(parsed.text);
    if (!summary)
      return res
        .status(404)
        .json({ ok: false, message: "summary did not created" });

    return res
      .status(200)
      .json({ ok: true, message: "summary created sucessfully", summary });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = SummaryController;

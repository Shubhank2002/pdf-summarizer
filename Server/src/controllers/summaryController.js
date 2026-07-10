const pdf_parser = require("pdf-parse");
console.log(pdf_parser);
const createChunks = require("../services/chunkService");
const { streamSummary, GetSummary } = require("../services/summaryService");

const SummaryController = async (req, res) => {
  const buffer = req.file.buffer;
  try {
    const parsed = await pdf_parser(buffer);
    const chunks = createChunks(parsed.text);
    const summaries = await Promise.all(chunks.map(GetSummary));
    const merged_Summary = summaries.join("\n\n");
    const stream = await streamSummary(merged_Summary);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        res.write(event.delta);
      }
    }

    res.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = SummaryController;

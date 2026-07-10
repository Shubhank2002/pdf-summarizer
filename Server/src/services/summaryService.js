const client = require("../config/openai");

const GetSummary = async (text) => {
  if (!text) throw Error("please provide text");

  const responses = await client.responses.create({
    model: "gpt-5-mini",
    input: `Summarize the following PDF:
         ${text}
         `,
  });
  return responses.output_text;
};

const streamSummary = async (merged_summary) => {
  if (!merged_summary) throw Error("please provide text");

  const stream = await client.responses.create({
    model: "gpt-5-mini",
    input: `summarize the following text:
        ${merged_summary}
  `,
    stream: true,
  });
  return stream
};

module.exports = {GetSummary, streamSummary};

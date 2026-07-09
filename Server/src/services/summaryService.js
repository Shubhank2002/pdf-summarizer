const client = require("../config/openai")

const GetSummary = async(text)=>{
    if(!text)
        throw Error('please provide text')

    const responses = await client.responses.create({
        model:'gpt-5.4-mini-2026-03-17',
         input: `Summarize the following PDF:
         ${text}
         `
    })
    return responses.output_text
}

module.exports = GetSummary
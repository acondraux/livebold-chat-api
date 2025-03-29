headers: {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}

const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a family travel assistant built for Live Bold. Provide minimalist, nature-forward itineraries for parents with young kids." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
return {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
      'Content-Type': 'application/json'

  },
  body: JSON.stringify(data)
};
};

exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: "Method not allowed"
            })
        };
    }

    try {

        const { message } = JSON.parse(event.body || "{}");

        if (!message || typeof message !== "string") {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Please provide a message."
                })
            };
        }

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },

                body: JSON.stringify({
                    model: "gpt-5",
                    input: [
                        {
                            role: "system",
                            content:
                                "You are KATEMA AI Tutor, a helpful and patient tutor for Zambian secondary school students. Explain concepts clearly and at an appropriate level. Encourage students to understand rather than simply giving answers."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: data.error?.message || "OpenAI request failed."
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: data.output_text || "I could not generate a response."
            })
        };

    } catch (error) {

        console.error("KATEMA AI Tutor error:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Unknown error"
            })
        };
    }
};

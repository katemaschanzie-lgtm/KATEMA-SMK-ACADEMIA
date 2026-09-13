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
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },

                body: JSON.stringify({
                    system_instruction: {
                        parts: [
                            {
                                text:
                                    "You are KATEMA AI Tutor, a helpful and patient tutor for Zambian secondary school students. Explain concepts clearly and at an appropriate level. Encourage students to understand rather than simply giving answers."
                            }
                        ]
                    },

                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: message
                                }
                            ]
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
                    error:
                        data.error?.message ||
                        "Gemini API request failed."
                })
            };
        }

        const reply =
            data.candidates?.[0]?.content?.parts
                ?.map(part => part.text || "")
                .join("") ||
            "I could not generate a response.";

        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: reply
            })
        };

    } catch (error) {

        console.error("KATEMA Gemini error:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Unknown error"
            })
        };
    }
};

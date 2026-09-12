export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "Please provide a message."
            });
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
                                "You are KATEMA AI Tutor, a helpful and patient tutor for Zambian secondary school students. Explain concepts clearly and at an appropriate level. Encourage the student to understand rather than simply giving answers."
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
            return res.status(response.status).json({
                error: data.error?.message || "OpenAI request failed."
            });
        }

        return res.status(200).json({
            reply: data.output_text || "I could not generate a response."
        });

    } catch (error) {
        console.error("KATEMA AI Tutor error:", error);

        return res.status(500).json({
            error: "The AI Tutor is temporarily unavailable."
        });
    }
}

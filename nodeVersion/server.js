import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const genAI = new GoogleGenerativeAI(`${process.env.API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function main() {
    try {
        const prompt = await new Promise((resolve) => {
            rl.question("What is your question ? : ", (input) => {
                resolve(input);
                rl.close();
            });
        });

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

main();

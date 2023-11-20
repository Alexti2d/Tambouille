import {Configuration, OpenAIApi} from "openai";
import {config} from "dotenv";
import {IDataGenerator} from "~/types/idatagenerator";
config();

export class OpenAI implements IDataGenerator {

    openai: OpenAIApi;

    constructor() {
        this.openai = new OpenAIApi(new Configuration({
            apiKey: process.env.API_KEY_OPENAI,
        }));
    }

    async askForContent(title: string): Promise<string> {
        try {
            const completion = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Créer moi un article de blog à partir de ce titre : ${title}` }],
            });

            return completion.data.choices[0].message && completion.data.choices[0].message.content || '';
        } catch (e) {
            throw e;
        }
    }
}
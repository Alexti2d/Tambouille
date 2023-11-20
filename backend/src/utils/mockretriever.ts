import {IDataGenerator} from "~/types/idatagenerator";
import fs from "fs";

export class MockRetriever implements IDataGenerator {

    private PATH: string = "src/data/articlesContents.json";

    async askForContent(title: string): Promise<string> {
        try {
            let allArticlesContent = JSON.parse(fs.readFileSync(`${this.PATH}`, 'utf-8'));
            return allArticlesContent[Math.floor(Math.random()*allArticlesContent.length)]["content"];
        } catch (e) {
            throw e;
        }
    }
}
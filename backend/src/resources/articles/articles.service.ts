import {Article} from "~/types/article";
import {Ireaderwriter} from "~/types/ireaderwriter";
import {IDataGenerator} from "~/types/idatagenerator";

export class ArticlesService {

    constructor(
        private readerWriter: Ireaderwriter,
        private dataGenerator: IDataGenerator
    ) {}

    /**
     * Find all articles
     */
    async findAll(): Promise<object> {
        try {
            return this.readerWriter.findAll();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find a specific article
     * @param id - article's ID
     */
    async findOne(id: number): Promise<object> {
        try {
            return this.readerWriter.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update a particular article
     *
     * @param data - article with information updated
     * @param id - unique ID of article
     */
    async update(data: Article, id: number): Promise<object> {
        try {
            return this.readerWriter.update(data, id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create an article
     *
     * @param articleData - Object corresponding to an article, has not necessary a full article. Not taking ID.
     */
    async create(articleData: Article): Promise<object> {
        try {
            if (articleData.isPublished) articleData.datePublished = new Date().getTime();
            return this.readerWriter.create(articleData);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create an article
     *
     * @param title - Corresponding the article title used to generate an article
     */
    async generate(title: string): Promise<Article> {
        try {
            let content = await this.dataGenerator.askForContent(title);
            return new Article(
                Math.floor(Math.random()*10000),
                title,
                content,
                new Date().getTime(),
                0,
                false
            );
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a article
     */
    async delete(id: number): Promise<object> {
        try {
            return this.readerWriter.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

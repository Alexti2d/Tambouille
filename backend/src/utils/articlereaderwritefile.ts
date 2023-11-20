import {Article} from "~/types/article";
import * as fs from "fs";
import {Ireaderwriter} from "~/types/ireaderwriter";
import {ConflictException, NotFoundException} from "~/utils/exceptions";

export class ArticleReaderWriteFile implements Ireaderwriter {

    PATH: string = "src/data/articles.json";

    create(articleData: Article): Article {
        let allArticles = this.read();
        let article = allArticles.find(a => a.id == articleData.id);
        if (article !== undefined) throw new ConflictException('Resource already exists');

        allArticles.push(articleData);
        try {
            this.write(allArticles);
        } catch (e) {
            throw e;
        }

        return articleData;
    }

    delete(id: number): Article {
        let allArticle = this.read();
        let articleIndex = allArticle.findIndex(a => a.id === id);
        let article = this.findOne(id);
        if (articleIndex === -1 || article === undefined) throw new NotFoundException('Article not found');

        allArticle.splice(articleIndex, 1);

        try {
            this.write(allArticle);
        } catch (e) {
            throw e;
        }

        return article;
    }

    findAll(): Article[] {
        return this.read();
    }

    findOne(id: number): Article {
        let allArticles = this.read();
        let article = allArticles.find(a => a.id == id);
        if (article === undefined) throw new NotFoundException('Article not found');

        return article;
    }

    update(data: Article, id: number): Article {
        let allArticle = this.read();
        let articleIndex = allArticle.findIndex(a => a.id === id);

        if (articleIndex === -1) throw new NotFoundException('Article not found');

        allArticle.splice(articleIndex, 1, data);

        try {
            this.write(allArticle);
        } catch (e) {
            throw e;
        }

        return data;
    }

    private read(): Article[] {
        try {
            return JSON.parse(fs.readFileSync(`${this.PATH}`, 'utf-8'));
        } catch (e) {
            throw e;
        }
    }

    private write(articles: Article[]): void {
        try {
            fs.writeFileSync(`${this.PATH}`, JSON.stringify(articles),'utf-8');
        } catch(e) {
            throw e;
        }
    }
}
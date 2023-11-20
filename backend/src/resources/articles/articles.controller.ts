import { Router } from 'express'
import { ArticlesService } from '~/resources/articles/articles.service'
import { NotFoundException } from '~/utils/exceptions'
import { authenticateToken } from "~/middlewares/authentication.handler";
import { ArticleReaderWriteFile } from "~/utils/articlereaderwritefile";
import { Ireaderwriter } from "~/types/ireaderwriter";
import { IDataGenerator } from "~/types/idatagenerator";
import { MockRetriever } from "~/utils/mockretriever";
import { config } from "dotenv";
import { OpenAI } from "~/utils/openai";
config();
/**
 * We create a router, allowing us to create routes outside `src/index.ts`
 */
const ArticlesController = Router();

const readerWriter: Ireaderwriter = new ArticleReaderWriteFile();
const dataGenerator: IDataGenerator = process.env.API_KEY_OPENAI === '' ? new MockRetriever() : new OpenAI();

/**
 * Service instance
 */
const service = new ArticlesService(readerWriter, dataGenerator);

/**
 * Find all articles
 */
ArticlesController.get('/', async (req, res, next) => {
    try {
        const articles = await service.findAll();
        return res
            .status(200)
            .json(articles);
    } catch (error) {
        return next(error);
    }
})

/**
 * Find a specific article
 */
ArticlesController.get('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;

        const article = await service.findOne(Number(id));

        if (!article) throw new NotFoundException('Article not found');

        return res
            .status(200)
            .json(article);
    } catch (error) {
        return next(error);
    }
})

/**
 * Create a article
 */
ArticlesController.post('/', authenticateToken, async (req, res, next) => {
    try {
        const createdArticle = await service.create(req.body);
        return res
            .status(201)
            .json(createdArticle);
    } catch (error) {
        return next(error);
    }
})

/**
 * Update article
 */
ArticlesController.put('/:id', authenticateToken, async (req, res, next) => {
    try {
        const id = req.params.id;
        const articleNewInformation = req.body;

        const updatedArticle = await service.update(articleNewInformation, Number(id));

        return res
            .status(200)
            .json(updatedArticle);
    } catch (error) {
        return next(error);
    }
})

/**
 * Delete article
 */
ArticlesController.delete('/:id', authenticateToken, async (req, res, next) => {
    try {
        const id = req.params.id;

        const article = await service.delete(Number(id));

        return res
            .status(200)
            .json(article);
    } catch (error) {
        return next(error);
    }
})

/**
 * Generate content from article
 */
ArticlesController.post('/generate', authenticateToken, async (req, res, next) => {
    try {
        const createdArticle = await service.generate(req.body.title);

        return res
            .status(201)
            .json(createdArticle);
    } catch (error) {
        return next(error);
    }
})

export { ArticlesController }
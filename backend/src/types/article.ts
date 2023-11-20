export class Article {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public dateCreated: number,
        public datePublished: number,
        public isPublished: boolean
    ) {}
}
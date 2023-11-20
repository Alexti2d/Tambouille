import axios from 'axios';

export class api {
    baseUrl: string = 'http://localhost:3000'
    token: string | null = ''

    constructor() {
        if (localStorage.getItem("token")) {
            this.token = localStorage.getItem("token")
        }
    }
  
    login(username, password) {
        return axios
            .post(`${this.baseUrl}/login`, {
                login: username,
                password: password,
            });
    }

    articleGptGetOne(id) {
        return axios.get(`${this.baseUrl}/articles/${id}`);
    }

    articleGptUpdate(article, isPublished) {
        return axios.put(
            "http://localhost:3000/articles/" + article.id,
            {
                id: article.id,
                datePublished: article.datePublished,
                dateCreated: article.dateCreated,
                title: article.title,
                content: article.content,
                isPublished: isPublished,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
    }

    articleGptGenerate(generationTitle) {
        return axios
            .post(
                `${this.baseUrl}/articles/generate/`,
                {
                    title: generationTitle,
                },
                { headers: { Authorization: 'Bearer ' + this.token } }
            )
            .then((response) => response.data)
            .catch((error) => {
                console.error(error);
            });

    }

    articleGptAdd(articleGenerated, published) {
        if (this.token) {
            articleGenerated.isPublished = published;
            return axios.post(`${this.baseUrl}/articles/`,
                articleGenerated,
                { headers: { Authorization: 'Bearer ' + this.token } }
            )
        }
    }

    async articleGptDelete(id) {
        return axios.delete(
            `${this.baseUrl}/articles/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
    }

    articleGptGetAll() {
        return axios.get(`${this.baseUrl}/articles`);
    }
}
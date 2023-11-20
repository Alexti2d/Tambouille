import { assert } from 'chai'
import request from 'supertest'
import { app } from '~~/src'
import { config } from "dotenv";
config();

// npm run test
describe('Article tests (TOKEN, GET, POST, PATCH, PUT, DELETE)', function () {
  let token: string;
  let admin = {
    login: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD
  }

  // TOKEN
  before(function (done) {
    request(app)
      .post('/login')
      .send(admin)
      .end(function (err, res) {
        if (err) return done(err);
        token = res.body.accessToken;
        done();
      });
  });

  // GET
  it('Ce test doit retourner une erreur 401 (Unauthorized), car je ne passe pas de token', function (done) {
    request(app)
      .get('/articles')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.body.error, 'Authorization required');
        done();
      });
  });

  it('Ce test doit retourner les données des articles', function (done) {
    request(app)
      .get('/articles')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        done();
      });
  });

  // // ID pour tester les routes qui ont besoin d'un /:id
  let idArticleTest: number;

  // // POST
  it('Ce test doit créer un nouvel article', function (done) {
    const articleData = {
      "id": 1651654323,
      "title": "Les blogs pour les nuls",
      "content": "Voici un article généré par ChatGPT sur les blogs",
      "isPublished": false,
      "dateCreated": 11123556,
      "datePublished": 11123556
    }

    request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send(articleData)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        assert.exists(res.body.id);
        idArticleTest = res.body.id;

        assert.equal(res.body.title, articleData.title);
        done();
      });
  });

  // PUT
  it("Ce test doit modifier avec PUT l'article qu'on a crée avant", function (done) {
    const articleData = {
      "id": 1651654323,
      "title": "Les blogs MODIFIE avec PUT pour les nuls",
      "content": "Voici un article MODIFIE avec PUT généré par ChatGPT sur les blogs",
      "isPublished": false,
      "dateCreated": 11123556,
      "datePublished": 11123556
    }

    request(app)
      .put('/articles/' + idArticleTest)
      .set('Authorization', `Bearer ${token}`)
      .send(articleData)
      .expect(200)
      .end(function (err, res) {
        request(app)
          .get('/articles/' + idArticleTest)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            const modifiedArticle = res.body;
            assert.equal(modifiedArticle["title"], articleData["title"]);
            assert.equal(modifiedArticle["content"], articleData["content"]);
            done();
          });
      })
  })

  // DELETE
  it("Ce test doit supprimer l'article qu'on a crée avant", function (done) {
    request(app)
      .delete('/articles/' + idArticleTest)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      .end(function (err, res) {
        request(app)
          .get('/articles/' + idArticleTest)
          .set('Authorization', `Bearer ${token}`)
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err);
            done();
          });
      })
  })
});
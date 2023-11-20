<template>
    <section class="container row" id="article-gpt">
        <h2>ArticleGPT generator</h2>
        <div class="article-gpt-add-form-container my-4 col-12">
            <input class="w-100 me-3 mb-3" v-model="generationTitle" type="text" name="generation-title" placeholder="Entrez un titre ...">
            <button @click="articleGptGenerate" class="article-gpt-btn">Générer</button>
        </div>
        <img v-if="generationLoad" class="article-gpt-generation-load" src="https://i.gifer.com/ZZ5H.gif"/>
        <div v-else-if="generatedContent" class="article-gpt-result">
            <div class="article-gpt-result-content w-100 mb-4">{{ generatedContent }}</div>
            <div class="d-flex justify-content-between">
                <button @click="articleGptResultSave" class="article-gpt-btn article-gpt-result-save">Enregistrer</button>
                <button @click="articleGptResultPublish" class="article-gpt-btn article-gpt-result-publish">Publier</button>
            </div>
        </div>
        
    </section>
</template>
<style>
    #article-gpt {
        margin: 100px auto;
    }
    .article-gpt-generation-load {
        width: 80px;
        margin: 0 auto;
    }
    .article-gpt-btn {
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
    }
    .article-gpt-result textarea {
        resize: none;
    }
    .article-gpt-result-content {
        border: 1px solid black;
        padding: 10px 15px;
    }
</style>
<script>
import { ref } from 'vue';
import { api } from '@/services/api';
import { useRouter } from 'vue-router'

const apiService = new api();

export default {
  setup() {
    const router = useRouter()

    const generationLoad = ref(false);

    const generationTitle = ref('');
    const generatedContent = ref('');
    let articleGenerated;

    const articleGptGenerate = () => {
        generationLoad.value = true
        apiService.articleGptGenerate(generationTitle.value).then((generatedArticle) => {
            articleGenerated = generatedArticle
            generatedContent.value = generatedArticle.content
            generationLoad.value = false
        })
    };

    const articleGptResultSave = () => {
      apiService.articleGptAdd(articleGenerated, false).then(() => {
        router.push({name: "ComponentListArticle"})
      })
    };

    const articleGptResultPublish = () => {
      apiService.articleGptAdd(articleGenerated, true).then(() => {
        router.push({name: "ComponentListArticle"})
      })
    };

    return {
      generationLoad,
      generationTitle,
      generatedContent,
      articleGptGenerate,
      articleGptResultSave,
      articleGptResultPublish,
    };
  },
};

</script>
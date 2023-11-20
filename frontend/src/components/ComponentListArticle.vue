<script setup>

import ExportJson from "./ExportJson.vue"
import {ref} from "vue";
import {api} from "@/services/api";

defineProps(["article", "token"]);

const apiService = new api();

const printModif = (msg, article, isPublished) => {
  try {
    apiService.articleGptUpdate(article, isPublished)
        .then(() => {
          alert(msg);
        });
  } catch (error) {
    console.error(error);
  }
}

const printDel = (id) => {
  let isDelete = confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
  if (!isDelete) return;
  try {
    document.getElementById(id).remove();
    apiService.articleGptDelete(id).then((res) => res.data);
  } catch (error) {
    console.error(error);
  }
}

const getArticle = async () =>{
  try {
    return await apiService.articleGptGetAll().then((res) => res.data);
  } catch (error) {
    console.error(error);
  }
}
let data = ref(await getArticle());
let token = localStorage.getItem("token");
</script>

<template>
  <div>
    <div class="text-center back mb-5 container-fluid d-flex">
      <h1 class="pb-2">La Tambouille</h1>
      <h3>Le blog de l'espace temps</h3>
    </div>
    <div class="container d-flex flex-wrap justify-content-center" style="gap: 18px;">
      <div
        :id="article.id"
        v-for="article in data"
        class="colonne"
        :article="article"
        :key="article.id"
      >
        <div class="card mb-5">
          <a v-bind:href="'../article.html?id=' + article.id" class="content">
            <div class="card-body">
              <h5 class="card-title pb-4 pt-3">{{ article.title }}</h5>
              <p class="card-text">{{ article.content }}</p>
            </div>
          </a>
          <div v-if="token" class="w-100 text-end pe-3 pt-3 pb-4">
            <div class="btn-group" role="group" aria-label="Default button group">
              <button
                @click="
                  printDel(article.id)
                "
                type="button"
                class="btn btn-outline-danger"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                  />
                  <path
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                  />
                </svg>
              </button>
              <button
                v-if="!article.isPublished"
                @click="
                  printModif(
                    'Article ' + article.title + ' a été publié',
                    article,
                    1
                  )
                "
                type="button"
                class="btn btn-outline-success"
              >
                Publier
              </button>
              <button
                v-if="article.isPublished"
                @click="
                  printModif(
                    'Article ' + article.title + ' a été masqué',
                    article,
                    0
                  )
                "
                type="button"
                class="btn btn-outline-success"
              >
                Masquer
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ExportJson v-if="token" />
  </div>
</template>

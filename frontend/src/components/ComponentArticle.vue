<script setup>
import {ref} from "vue";
import {api} from "@/services/api";

defineProps(["article"]);

const apiService = new api();

async function getUser(id) {
  try {
    const response = await apiService.articleGptGetOne(id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let article = ref(await getUser(id));
</script>

<template>
  <div :article="article">
    <div class="card col-10 mt-5 mx-auto">
      <!-- <img :src="larticle.img" class="card-img-top card-img" /> -->
      <div class="card-body">
        <h5 class="card-title pb-4 pt-3">{{ article.title }}</h5>
        <p class="card-text">{{ article.content }}</p>
      </div>
    </div>
  </div>
</template>

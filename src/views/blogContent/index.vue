<template>
    <div class="blogArticle">
        <left-content/>
        <main-content/>
    </div>
</template>
<script>
import leftContent from './leftContent/index.vue';
import mainContent from './mainArticle/index.vue';
export default {
    name: 'articlePage',
    components: {
        'leftContent': leftContent,
        'main-content': mainContent
    }
};
</script>
<style lang="scss" scoped>
.blogArticle{
    width: 80%;
    position: relative;
    top: 20px;
    margin: 0 auto;
     display: flex;
    flex-flow: row;
}
</style>

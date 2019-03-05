<template>
    <div class="authorMessage">
        <blogger/>
        <blogger-blog/>
        
    </div>
</template>
<script>
import blogger from './blogger/blogger.vue';
import bloggerBlog from './bloggerBlog/index.vue';
export default {
    name: 'leftContent',
    components: {
        blogger,
        'blogger-blog': bloggerBlog
    }
};
</script>

<style lang="scss" scoped>
.authorMessage{
    width: 21%;
}
</style>

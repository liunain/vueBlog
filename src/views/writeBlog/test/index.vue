<template>
    <div v-html="compiledMarkdown" class="ar">
        {{content}}
    </div>
</template>
<script>
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import marked from 'marked';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
});
export default{
    name: 'test',
    data() {
        return {
            content: ''
        };
    },
    props: {
        value: String,
        model: {
            type: [String, Object]
        }
    },
    computed: {
        compiledMarkdown() {
            let detail = this.content;
            return marked(detail || '', {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
        }
    }
    // mounted() {
    //     this.message();
    // },
    // methods: {
    //     message() {
    //         fetch('http://120.79.94.90:8080/page/test/test')
    //             .then(function(response) {
    //                 return response.json();
    //             })
    //             .then(function(data) {
    //                 // this.content = data.data;
    //                 console.log(data);
    //             });
    //     }
    // }
};
</script>
<style lang="scss" scoped>
.ar{
    position: relative;
    top: 30px;
    width: 80%;
    margin: 0 auto;
    background: #dddddd;

}
</style>
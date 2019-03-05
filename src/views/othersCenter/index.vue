<template>
    <div id="portal">
        <leftBox />
        <rightBox />
    </div>
</template>

<script>
import leftBox from './leftBox/index.vue';
import rightBox from './rightBox/index.vue';
export default {
    name: '',
    data: () => ({}),
    components: {
        leftBox,
        rightBox
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
    #portal {
        width: 1070px;
        height: auto;
        margin: auto;
        padding: 5px;
    }
</style>

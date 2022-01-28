<template>
    <div id="container" class="pdf-viewer-container">
        <div class="pdf-viewer-wrapper">
            <div class="pdf-viewer-drawer" id="drawer">
                <pdf
                    v-for="i in numPages"
                    :key="i"
                    :page="i"
                    style="width: 100%"
                    class="pdf-page-Setting"
                    :src="src"
                    v-bind:id="'page'+i"></pdf>
            </div>
        </div>
    </div>
</template>
<script>
    import pdf from 'vue-pdf';
    export default {
        components: {
            pdf
        },
        props: {
            src: {
               type: String,
               default: () => (""),
           },
            numPages: Number
        }
    }
</script>
<style>
    .pdf-viewer-container {
        padding: 0 40px;
        align-items: center;
        margin-left: 280px;
        width: calc(100% - 280px);
        max-width: none;
        height: 100%;
        background-color: #F3F3F3;
    }
    .pdf-viewer-wrapper {
        padding-top: 100px;
        margin-left: 10%;
        text-align: center;
        height: 100%;
        width: 80%;
    }
    .pdf-viewer-drawer {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        overflow: hidden;
    }
</style>
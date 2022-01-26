<template>
    <div id="writer-pdf-container" class="writer-pdf-container">
        <div id="drawerScrollBox" class="writer-pdf-viewer">
            <div id="writer-pdf-drawer">
                <pdf v-for="i in this.$store.state.PDFScreenInfo.PDFPageInfo" :key="i" :page="i" :src="src" v-bind:id="'page'+i"></pdf>
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
        created() {
            this.$store.commit("SHOW_WRITE_END_PAGE");
            this.src = this.$store.state.PDFScreenInfo.src;
        },
        data() {
            return {
                numPages: undefined,
                src: ""
            }
        }
    }
</script>
<style>
    .container {
        align-items: center;
        width: 100%;
        max-width: none;
        height: 100%;
    }
    .writer-pdf-viewer {
        margin-left: 15%;
        text-align: center;
        height: 100%;
        width: 70%;
    }
    #writer-pdf-drawer {
        z-index: 2000;
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        overflow: hidden;
    }
</style>
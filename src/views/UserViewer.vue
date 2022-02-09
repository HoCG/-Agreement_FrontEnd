<template>
    <v-card class="user-main overflow-hidden">
        <div class="user-side-bar">
            <DocumentInfoSideBar/>
        </div>
        <DocumentComponent/><!--PDF업로드 및 유저 문서 리스트-->
    </v-card>
</template>
<script>
    import DocumentComponent from '../components/components_for_document/DocumentComponent.vue';
    import DocumentInfoSideBar from '../components/components_for_document/document/DocumentInfoSideBar.vue';
    export default {
        components: {
            DocumentInfoSideBar,
            DocumentComponent,
        },
        beforeDestroy() {
            this.$store.state.PDFScreenInfo.PDFTitle = "";
            this
                .$store
                .commit("FORMAT_ALL_CHECKBOX_OBJECTS");
            this
                .$store
                .commit("FORMAT_ALL_SHORTTEXT_OBJECTS");
            this
                .$store
                .commit("FORMAT_ALL_LONGTEXT_OBJECTS");
            this
                .$store
                .commit("FORMAT_ALL_SIGN_OBJECTS");
        },
        mounted() {
            this
                .$store
                .commit("CLOSE_EDIT_PAGE");
        }
    }
</script>
<style lang="scss">
    #textForm::after {
        content: attr(data-content);
    }
    ul {
        list-style: none;
    }
    .user-main {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    .container {
        padding: 0 40px;
        align-items: center;
        margin-left: 280px;
        width: calc(100% - 280px);
        max-width: none;
        height: 100%;
        background-color: #F3F3F3;
    }
    .user-side-bar {
        // padding-top: 100px;
        width: 280px;
        height: 100%;
        top: 0;
        margin-top: 60px;
        z-index: 4;
        position: fixed;
        background-color: white;
        border-right: 1px solid #9F9F9F;
    }
</style>
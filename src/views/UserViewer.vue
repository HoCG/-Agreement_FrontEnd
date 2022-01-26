<template>
    <v-card class="mainCard overflow-hidden">
        <div class="sideBar">
            <DocumentInfoSideBar class="ShowDocumentInfo"/>
        </div>
        <PDFComponent2/><!--PDF업로드 및 유저 문서 리스트-->
    </v-card>
</template>
<script>
    import PDFComponent2 from '../components/PDFComponent2.vue';
    import DocumentInfoSideBar from '../components_for_document/DocumentInfoSideBar.vue';
    export default {
        components: {
            DocumentInfoSideBar,
            PDFComponent2,
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
    .mainCard {
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
    .sideBar {
        padding-top: 100px;
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
    .ShowObjectInfo {
        height: 80%;
        overflow-y: scroll;
    }
    .objectInfo {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        height: 10%;
        background-color: #767676;
        color: white;
    }
    .objectInfoText {
        position: relative;
        top: 50%;
    }
</style>
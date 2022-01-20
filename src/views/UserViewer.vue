<template>
    <v-card class="mainCard overflow-hidden">
        <EditHeader class="UserHeader" v-if="this.$store.state.PDFInfo.PDFFileUploadCheck"/> <!--네비게이션바 컴포넌트-->
        <div class="sideBar">
            <ObjectList v-if="this.$store.state.PDFInfo.PDFFileUploadCheck" class="ShowObjectInfo"/> <!--왼쪽 사이드바-->
            <DocumentInfoSideBar v-else class="ShowDocumentInfo"/>
        </div>
        <PDFUploader/><!--PDF업로드 및 유저 문서 리스트-->
        <ObjectBox/><!--오브젝트 생성부분-->
    </v-card>
</template>
<script>
    import PDFUploader from '../components/PDFComponent.vue';
    import DocumentInfoSideBar from '../components_for_document/DocumentInfoSideBar.vue';
    import ObjectList from '../components_for_edit_page/ObjectList.vue'
    import ObjectBox from '../objects/ObjectBox.vue'
    import EditHeader from '../components_for_edit_page/EditHeader.vue';
    export default {
        components: {
            DocumentInfoSideBar,
            PDFUploader,
            ObjectList,
            ObjectBox,
            EditHeader
        },
        beforeDestroy() {
            this.$store.state.PDFInfo.PDFTitle = "";
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
        align-items: center;
        margin-left: 15%;
        width: 85%;
        height: 100%;
        background-color: #F3F3F3;
    }
    .sideBar {
        top: 20%;
        width: 15%;
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
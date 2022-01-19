<template>
    <v-card class="mainCard overflow-hidden">
        <EditHeader class="UserHeader" v-if="this.$store.state.PDFInfo.PDFFileUploadCheck"/>
        <div class="sideBar">
            <ObjectList v-if="this.$store.state.PDFInfo.PDFFileUploadCheck" class="ShowObjectInfo"/>
            <DocumentInfoSideBar v-else class="ShowDocumentInfo"/>
        </div>
        <PDFUploader/>
        <ObjectBox/>
    </v-card>
</template>
<script>
    import PDFUploader from '../components/PDFComponent.vue';
    import DocumentInfoSideBar from '../components/DocumentInfoSideBar.vue';
    import ObjectList from '../components/ObjectList.vue'
    import ObjectBox from '../objects/ObjectBox.vue'
    import EditHeader from '../components/EditHeader.vue';
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
        },
        data() {
            return {
                //오브젝트 관련 데이터 짧은글
                STextObjectName: "ShortTextObjectArea",
                STextObjectID: 1,

                //긴글
                LTextObjectName: "LongTextObjectArea",
                LTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "SignObjectArea",
                SignObjectID: 1
            }
        },
        methods: {
            //오브젝트를 형성하는 과정.
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
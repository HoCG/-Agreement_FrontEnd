<template>
    <div class="ShowDocumentInfo">
        <v-img :src="this.$store.state.admin.currentUser.profileImage"></v-img>
        <button id="MyDocument" class="documentShowBtn" @click="MyDocumentClick">
            내 문서 리스트
        </button>
        <button id="GetDocument" class="documentShowBtn" @click="GetDocumentClick">
            제출받은 문서 리스트
        </button>
    </div>
</template>
<script>
    export default {
        methods: {
            MyDocumentClick() {
                let MyDocument = document.getElementById("MyDocument");
                MyDocument.style.backgroundColor = "#9F9F9F";
                let GetDocument = document.getElementById("GetDocument");
                GetDocument.style.backgroundColor = "#F3F3F3";
                this
                    .$store
                    .commit("SET_WRITER_DOCUMENT_LIST_FALSE");
                this
                    .$store
                    .commit("SET_USER_DOCUMENT_LIST_TRUE");
            },
            GetDocumentClick() {
                let MyDocument = document.getElementById("MyDocument");
                MyDocument.style.backgroundColor = "#F3F3F3";
                let GetDocument = document.getElementById("GetDocument");
                GetDocument.style.backgroundColor = "#9F9F9F";
                this
                    .$store
                    .commit("SET_WRITER_DOCUMENT_LIST_TRUE");
                this
                    .$store
                    .commit("SET_USER_DOCUMENT_LIST_FALSE");
            }
        }
    }
</script>
<style>
    .documentShowBtn {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 25;
        font-weight: 700;
    }
    #MyDocument {
        background-color: #F3F3F3;
    }
    #GetDocument {
        background-color: #F3F3F3;
    }
</style>
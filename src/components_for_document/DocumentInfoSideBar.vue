<template>
    <div>
        <v-img :src="this.$store.state.admin.currentUser.profileImage"></v-img>
        <div class="user-info">user</div>
        <div class="document-show-btn my-document"
        :style="this.selectedId == 1 ? {backgroundColor: '#9F9F9F', color: '#F3F3F3' } : {backgroundColor: '#F3F3F3', color: '#767676'}"
        @click="MyDocumentClick">
            내 문서 리스트
        </div>
        <div class="document-show-btn submit-document"
        @click="GetDocumentClick"
        :style="this.selectedId == 2 ? {backgroundColor: '#9F9F9F', color: '#F3F3F3'} : {backgroundColor: '#F3F3F3', color: '#767676'}">
            제출받은 문서 리스트
        </div>
    </div>
</template>
<script>
    export default {

        data: () => {
            return {
                selectedId: 1,
            }
        },
        methods: {
            MyDocumentClick() {
                this.selectedId = 1;
                this
                    .$store
                    .commit("SET_WRITER_DOCUMENT_LIST_FALSE");
                this
                    .$store
                    .commit("SET_USER_DOCUMENT_LIST_TRUE");
            },
            GetDocumentClick() {
                this.selectedId = 2;
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
<style lang="scss" scoped>
    .document-show-btn {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 25;
        font-weight: 700;
        line-height: 50px;
        &:hover{
            cursor: pointer;
        }
        margin-bottom: 5px;
        border-radius: 5px;
    }
    .my-document {
        background-color: #F3F3F3;
    }
    .submit-document {
        background-color: #F3F3F3;
    }

    .user-info{
        width: 100%;
        height: 160px;
        line-height: 160px;
        text-align: center;
        border-bottom: 1px solid #9F9F9F;
        margin-bottom: 40px;
    }
</style>
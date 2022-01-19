<template>
    <div class="EditActionDiv">
        <button class="SaveEditPageButton" @click="SaveAllData">
            완료
        </button>
        <button class="CloseEditPageButton" @click="CloseEditPage">
            닫기
        </button>
    </div>
</template>
<script>
    export default {
        methods: {
            CloseEditPage() {
                this
                    .$store
                    .commit("CLOSE_EDIT_PAGE");
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
            SaveAllData() {
                let SendJsonFile = [];
                let CheckBoxArray = this.$store.state.CheckBoxObject.CheckBoxArr;
                let ShortTextArray = this.$store.state.ShortTextObject.ShortTextArr;
                let LongTextArray = this.$store.state.LongTextObject.LongTextArr;
                let SignArray = this.$store.state.SignObject.SignArr;
                SendJsonFile.push(CheckBoxArray);
                SendJsonFile.push(ShortTextArray);
                SendJsonFile.push(LongTextArray);
                SendJsonFile.push(SignArray);
                const UsersDocumentObjects = JSON.stringify(SendJsonFile);
                console.log(UsersDocumentObjects);
            }
        }
    }
</script>
<style>
    .EditActionDiv{
        float: right;
    }
    .SaveEditPageButton{
        float: right;
        width: 82px;
        height: 48px;
        /* gray_05 */
        background: #767676;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }
    .CloseEditPageButton{
        width: 82px;
        height: 48px;
        float: right;
        color: #C4C4C4;
    }
</style>
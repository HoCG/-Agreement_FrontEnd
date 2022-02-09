<template>
    <div class="edit-action-div">
        <button class="save-edit-page-button" @click="saveAllData">
            완료
        </button>
        <button class="close-edit-page-button" @click="closeEditPage">
            닫기
        </button>
    </div>
</template>
<script>
    import {updateProjectInfo} from '../apis/project_api'
    import DataProcess from '../DataProcess';
    export default {
        data() {
            return {
                SendJsonFile: {
                    project_object_texts: [],
                    project_object_signs: [],
                    project_object_checkboxes: []
                }
            }
        },
        computed: {
            ShortTextArr(){
                return this.$store.state.ShortTextObject.ShortTextArr;
            },
            LongTextArr(){
                return this.$store.state.LongTextObject.LongTextArr;
            },
            CheckBoxArr(){
                return this.$store.state.CheckBoxObject.CheckBoxArr;
            },
            SignArr(){
                return this.$store.state.SignObject.SignArr;
            },
            Document(){
                return this.$store.state.UsersDocument.Document;
            }
        },
        methods: {
            closeEditPage() {
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
                this
                    .$router
                    .push({
                        path: '/UserPage',
                    }
                ).catch();
            },
            saveAllData() {
                this.makeCheckBoxForm();
                this.makeTextForm();
                this.makeSignForm();
                updateProjectInfo(this.Document.name, JSON.stringify(this.SendJsonFile))
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
                 this
                    .$router
                    .push({
                        path: '/UserPage',
                    });
            },
            makeCheckBoxForm() {
                for (let CheckBoxObject of this.CheckBoxArr) {
                    this
                        .SendJsonFile
                        .project_object_checkboxes
                        .push(DataProcess.makeCheckBox(CheckBoxObject, 1));
                }
            },
            makeTextForm() {
                for (let ShortTextObject of this.ShortTextArr) {
                    this
                        .SendJsonFile
                        .project_object_texts
                        .push(DataProcess.makeShortText(ShortTextObject, 1));
                }
                for (let LongTextObject of this.LongTextArr) {
                    this
                        .SendJsonFile
                        .project_object_texts
                        .push(DataProcess.makeLongText(LongTextObject, 1));
                }
            },
            makeSignForm() {
                for (let SignObject of this.SignArr) {
                    this
                        .SendJsonFile
                        .project_object_signs
                        .push(DataProcess.makeSign(SignObject, 1));
                }
            }
        }
    }
</script>
<style>
    .edit-action-div {
        float: right;
    }
    .save-edit-page-button {
        float: right;
        width: 82px;
        height: 48px;
        /* gray_05 */
        background: #767676;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin-right: 20px;
    }
    .close-edit-page-button {
        width: 82px;
        height: 48px;
        float: right;
        color: #9F9F9F;
        margin-right: 20px;
        font-weight: bold;
    }
</style>
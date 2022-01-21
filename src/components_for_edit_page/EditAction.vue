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
    import axios from "axios";
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
                this.makeCheckBoxForm();
                this.makeTextForm();
                this.makeSignForm();
                axios
                    .post(`${process.env.VUE_APP_BASEURL}/api/projects/${this.$store.state.UsersDocument.Document.name}/objects`, JSON.stringify(this.SendJsonFile), {
                    headers: {
                        "Content-Type": `application/json`,
                        }
                    })
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
            makeCheckBoxForm() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = this.$store.state.PDFInfo.OriginalWidth[0]/parseInt(computed_Object_Style.width, 10);
                for (let CheckBoxObject of this.$store.state.CheckBoxObject.CheckBoxArr) {
                    let project_object_checkbox = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24
                    }
                    project_object_checkbox.name = CheckBoxObject.title;
                    project_object_checkbox.x_position = CheckBoxObject.x*computed_Ratio;
                    project_object_checkbox.y_position = CheckBoxObject.y*computed_Ratio;
                    project_object_checkbox.width = CheckBoxObject.width*computed_Ratio;
                    project_object_checkbox.height = CheckBoxObject.height*computed_Ratio;
                    project_object_checkbox.rotate = 0;
                    project_object_checkbox.page = CheckBoxObject.page;
                    project_object_checkbox.type = "DEFAULT";
                    this
                        .SendJsonFile
                        .project_object_checkboxes
                        .push(project_object_checkbox);
                }
            },
            makeTextForm() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = this.$store.state.PDFInfo.OriginalWidth[0]/parseInt(computed_Object_Style.width, 10);
                for (let ShortTextObject of this.$store.state.ShortTextObject.ShortTextArr) {
                    let project_object_text = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24
                    };
                    project_object_text.name = ShortTextObject.title;
                    project_object_text.x_position = ShortTextObject.x*computed_Ratio;
                    project_object_text.y_position = ShortTextObject.y*computed_Ratio;
                    project_object_text.width = ShortTextObject.width*computed_Ratio;
                    project_object_text.height = ShortTextObject.height*computed_Ratio;
                    project_object_text.rotate = 0;
                    project_object_text.page = ShortTextObject.page;
                    project_object_text.type = "SHORT_TEXT";
                    this
                        .SendJsonFile
                        .project_object_texts
                        .push(project_object_text);
                }
                for (let LongTextObject of this.$store.state.LongTextObject.LongTextArr) {
                    let project_object_text = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24
                    };
                    project_object_text.name = LongTextObject.title;
                    project_object_text.x_position = LongTextObject.x*computed_Ratio;
                    project_object_text.y_position = LongTextObject.y*computed_Ratio;
                    project_object_text.width = LongTextObject.width*computed_Ratio;
                    project_object_text.height = LongTextObject.height*computed_Ratio;
                    project_object_text.rotate = 0;
                    project_object_text.page = LongTextObject.page;
                    project_object_text.type = "LONG_TEXT";
                    this
                        .SendJsonFile
                        .project_object_texts
                        .push(project_object_text);
                }
            },
            makeSignForm() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = this.$store.state.PDFInfo.OriginalWidth[0]/parseInt(computed_Object_Style.width, 10);
                for (let SignObject of this.$store.state.SignObject.SignArr) {
                    let project_object_sign = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24
                    }
                    project_object_sign.name = SignObject.title;
                    project_object_sign.x_position = SignObject.x*computed_Ratio;
                    project_object_sign.y_position = SignObject.y*computed_Ratio;
                    project_object_sign.width = SignObject.width*computed_Ratio;
                    project_object_sign.height = SignObject.height*computed_Ratio;
                    project_object_sign.rotate = 0;
                    project_object_sign.page = SignObject.page;
                    project_object_sign.type = "DEFAULT";
                    this
                        .SendJsonFile
                        .project_object_signs
                        .push(project_object_sign);
                }
            }
        }
    }
</script>
<style>
    .EditActionDiv {
        float: right;
    }
    .SaveEditPageButton {
        float: right;
        width: 82px;
        height: 48px;
        /* gray_05 */
        background: #767676;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }
    .CloseEditPageButton {
        width: 82px;
        height: 48px;
        float: right;
        color: #C4C4C4;
    }
</style>
<template>
    <v-card class="WritersArea overflow-hidden">
        <LookingWriterHeader/>
        <WriteList/>
        <PDFViewer v-bind:numPages="this.numPages" v-bind:src="this.src"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import axios from "axios";
    import WriteList from '../components_for_writer_view/WriteList.vue';
    import LookingWriterHeader from '../components_for_looking_writer/LookingWriterHeader.vue';
    import PDFViewer from "../components/PDFViewer.vue"
    export default {
        components: {
            WriteList,
            LookingWriterHeader,
            PDFViewer
        },
        mounted() {
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
            let self = this;
            axios
                .get(
                    `${process.env.VUE_APP_BASEURL}/api/projects/submittees/${self.$store.state.writer.currentWriter.name}/pdf`,{responseType: "blob"}
                )
                .then(function (response) {
                    console.log(response.data);
                    let file = URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    console.log(file);
                    self.src = pdf.createLoadingTask(file);
                    self
                        .src
                        .promise
                        .then(pdf => {
                            self.numPages = pdf.numPages;
                            self
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", self.numPages);
                        }
                    );  
                })
                .catch(function (error) {
                console.log(error);
            });
            axios
                .get(
                    `${process.env.VUE_APP_BASEURL}/api/projects/submittees/${self.$store.state.writer.currentWriter.name}`
                )
                .then(function (response) {
                    self
                        .$store
                        .commit("SET_DOCUMENT_TITLE", response.data.pdf.original_name);
                    self.readAllObject(response.data);
                })
                .catch(function (error) {
                console.log(error);
            });
        },
        computed: {
            writer(){
                return this.$store.state.writer.currentWriter
            }
        },
        data() {
            return {
                //useForJsonFile 오브젝트 관련 데이터 짧은글
                src: "",
                numPages: undefined
            }
        },
        methods: {
            readAllObject(responseData) {
                //가지고 온 데이터에서
                this.readTextObject(responseData.submittee_object_texts); //텍스트들만 따로 처리.
                this.readCheckBoxObject(responseData.submittee_object_checkboxes); //체크박스만 따로 처리.
                this.readSignObject(responseData.submittee_object_signs); //사인값만 따로 처리.
            },
            readTextObject(project_object_texts) {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0];
                for (let TextObject of project_object_texts) {
                    if (TextObject.type === "SHORT_TEXT") {
                        this.$store.state.ShortTextObject.ShortText.htmlID = "ShortTextObjectArea"
                        this.$store.state.ShortTextObject.ShortText.title = "짧은 글_"
                        this.$store.state.ShortTextObject.ShortText.width = TextObject.width * computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.height = TextObject.height * computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.x = TextObject.x_position * computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.y = TextObject.y_position * computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.page = TextObject.page;
                        this.$store.state.ShortTextObject.ShortText.push_or_readCheck = false;
                        this
                            .$store
                            .commit("ADD_SHORTTEXT_OBJECT", this.$store.state.ShortTextObject.ShortText);
                    } else {
                        this.$store.state.LongTextObject.LongText.htmlID = "LongTextObjectArea"
                        this.$store.state.LongTextObject.LongText.title = "긴 글_"
                        this.$store.state.LongTextObject.LongText.width = TextObject.width * computed_Ratio;
                        this.$store.state.LongTextObject.LongText.height = TextObject.height * computed_Ratio;
                        this.$store.state.LongTextObject.LongText.x = TextObject.x_position * computed_Ratio;
                        this.$store.state.LongTextObject.LongText.y = TextObject.y_position * computed_Ratio;
                        this.$store.state.LongTextObject.LongText.page = TextObject.page;
                        this.$store.state.LongTextObject.LongText.push_or_readCheck = false;
                        this
                            .$store
                            .commit("ADD_LONGTEXT_OBJECT", this.$store.state.LongTextObject.LongText);
                    }
                }
            },
            readCheckBoxObject(project_object_checkboxes) {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0];
                for (let CheckBoxObject of project_object_checkboxes) {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = "CheckBoxObjectArea"
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_"
                    this.$store.state.CheckBoxObject.CheckBox.width = CheckBoxObject.width * computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.height = CheckBoxObject.height * computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.x = CheckBoxObject.x_position * computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.y = CheckBoxObject.y_position * computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.page = CheckBoxObject.page;
                    this.$store.state.CheckBoxObject.CheckBox.push_or_readCheck = false;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.$store.state.CheckBoxObject.CheckBox);
                }
            },
            readSignObject(project_object_signs) {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0];
                for (let SignObject of project_object_signs) {
                    this.$store.state.SignObject.Sign.htmlID = "SignObjectArea"
                    this.$store.state.SignObject.Sign.title = "사인_"
                    this.$store.state.SignObject.Sign.width = SignObject.width * computed_Ratio;
                    this.$store.state.SignObject.Sign.height = SignObject.height * computed_Ratio;
                    this.$store.state.SignObject.Sign.x = SignObject.x_position * computed_Ratio;
                    this.$store.state.SignObject.Sign.y = SignObject.y_position * computed_Ratio;
                    this.$store.state.SignObject.Sign.page = SignObject.page;
                    this.$store.state.SignObject.Sign.push_or_readCheck = false;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.$store.state.SignObject.Sign);
                }
            }
        },

        beforeDestroy() {
            this.$store.commit("removeCurrentWriter");
            this.$store.commit("SET_DOCUMENT_TITLE", "");
        }
    }
</script>
<style>
    body {
        background-color: transparent;
    }
    header {
        z-index: 3000 !important;
    }
    .WriterHeader {
        width: 100%;
        height: 15%;
        position: fixed;
        background-color: white;
        z-index: 5;
        left: 0;
        right: 0;
        top: 50px;
    }
    .navigation {
        position: relative;
        text-align: center;
        top: 25%;
        height: 60%;
    }
    .WritersArea {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    .sideBar {
        top: 20%;
        width: 15%;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
</style>
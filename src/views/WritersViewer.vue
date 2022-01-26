<template>
    <v-card class="WritersArea overflow-hidden">
        <WriterHeader />
        <WriteList />
        <div id="container" class="container">
            <div id="drawerScrollBox" class="pdfViewer">
                <div id="drawer">
                    <pdf v-for="i in numPages" :key="i" :page="i" :src="src" v-bind:id="'page'+i"></pdf>
                </div>
            </div>
        </div>
        <ObjectBox/>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import WriterHeader from "../components_for_writer_view/WriteHeader.vue"
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import axios from "axios";
    import ObjectBox from '../w_object/ObjectBox.vue';
    import WriteList from '../components_for_writer_view/WriteList.vue';
    export default {
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
                    `${process.env.VUE_APP_BASEURL}/api/submittees/projects/${this.documentName}`
                )
                .then(function (response) {
                    console.log(response.data);
                    self.src = pdf.createLoadingTask(
                        `${process.env.VUE_APP_BASEURL}` + String(response.data.pdf.url)
                    );
                    self.$store.state.UsersDocument.Document = Document;
                    self
                        .$store
                        .commit("SET_DOCUMENT_TITLE", response.data.title);
                    self
                        .src
                        .promise
                        .then(pdf => {
                            self.numPages = pdf.numPages;
                            self
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", self.numPages);
                            self.saveOriginalWidth(response.data);
                            self.readAllObject(response.data);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        components: {
            SignDialog,
            pdf,
            ObjectBox,
            WriteList,
            WriterHeader
        },
        data() {
            return {
                //useForJsonFile 오브젝트 관련 데이터 짧은글
                src: "",
                numPages: undefined,
                itemLength: 0,
                selectedID: "",
                imageID: "",
                selectedItem: 1,
                selectedItemText: "",
                documentName: this.$route.params.document_name
            }
        },
        methods: {
            saveOriginalWidth(responseData) {
                this
                    .$store
                    .commit("FORMAT_ORIGINAL_WIDTH");
                for (let OW of responseData.pdf.original_width) {
                    this
                        .$store
                        .commit("SAVE_ORIGINAL_WIDTH", OW);
                }
            },
            readAllObject(responseData) {
                //가지고 온 데이터에서
                this.readTextObject(responseData.project_object_texts); //텍스트들만 따로 처리.
                this.readCheckBoxObject(responseData.project_object_checkboxes); //체크박스만 따로 처리.
                this.readSignObject(responseData.project_object_signs); //사인값만 따로 처리.
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
        }
    }
</script>
<style>
    body {
        background-color: transparent;
    }
    .pdfViewer {
        margin-top: 200px;
        text-align: center;
        height: 100%;
        width: 80%;
    }
    #drawer {
        background-color: transparent;
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        overflow: hidden;
    }
    header {
        z-index: 3000 !important;
    }
    ul {
        list-style: none;
    }
    .WritersArea {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    .pdfViewer {
        z-index: 2;
        width: 70%;
        margin-left: 15%;
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
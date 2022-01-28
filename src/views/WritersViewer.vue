<template>
    <v-card class="writer-main overflow-hidden">
        <WriterHeader
        :document-name="this.documentName"
        />
        <WriteList/>
        <PDFViewer v-bind:numPages="this.numPages" v-bind:src="this.src"/>
        <ObjectBox/>
        <SignDialog :dialog="true"/>
        <AlertForm :dialog="true"/>
    </v-card>
</template>
<script>
    import WriterHeader from "../components_for_writer_view/WriteHeader.vue"
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import axios from "axios";
    import ObjectBox from '../w_object/ObjectBox.vue';
    import WriteList from '../components_for_edit_page/EditObjectList.vue';
    import PDFViewer from '../components/PDFViewer.vue'
    import AlertForm from '../components/AlertForm.vue';
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
                            self.pushAllObject(response.data);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.addEventListener('resize', this.resizeEvent, 
            true);
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.resizeEvent);
        },
        components: {
            SignDialog,
            ObjectBox,
            WriteList,
            WriterHeader,
            PDFViewer,
            AlertForm
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
            resizeEvent() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0];
                //데이터값에 저장되어있는 width, height, left, top값을 모두 적용시켜줍니다.
                for (let ShortTextObject of this.$store.state.ShortTextObject.ShortTextArr) {
                    const NewElementDiv = document.getElementById(ShortTextObject.htmlID);
                    NewElementDiv.style.width = ShortTextObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = ShortTextObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = ShortTextObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = ShortTextObject.y * computed_Ratio + "px";
                }
                for (let LongTextObject of this.$store.state.LongTextObject.LongTextArr) {
                    const NewElementDiv = document.getElementById(LongTextObject.htmlID);
                    NewElementDiv.style.width = LongTextObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = LongTextObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = LongTextObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = LongTextObject.y * computed_Ratio + "px";
                }
                for (let CheckBoxObject of this.$store.state.CheckBoxObject.CheckBoxArr) {
                    const NewElementDiv = document.getElementById(CheckBoxObject.htmlID);
                    NewElementDiv.style.width = CheckBoxObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = CheckBoxObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = CheckBoxObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = CheckBoxObject.y * computed_Ratio + "px";
                }
                for (let SignObject of this.$store.state.SignObject.SignArr) {
                    const NewElementDiv = document.getElementById(SignObject.htmlID);
                    NewElementDiv.style.width = SignObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = SignObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = SignObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = SignObject.y * computed_Ratio + "px";
                }
            },
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
            pushAllObject(responseData) {
                //가지고 온 데이터에서
                this.pushTextObject(responseData.project_object_texts); //텍스트들만 따로 처리.
                this.pushCheckBoxObject(responseData.project_object_checkboxes); //체크박스만 따로 처리.
                this.pushSignObject(responseData.project_object_signs); //사인값만 따로 처리.
            },
            pushTextObject(project_object_texts) {
                for (let TextObject of project_object_texts) {
                    if (TextObject.type === "SHORT_TEXT") {
                        this.$store.state.ShortTextObject.ShortText.htmlID = "ShortTextObjectArea"
                        this.$store.state.ShortTextObject.ShortText.title = "짧은 글_"
                        this.$store.state.ShortTextObject.ShortText.width = TextObject.width;
                        this.$store.state.ShortTextObject.ShortText.height = TextObject.height;
                        this.$store.state.ShortTextObject.ShortText.x = TextObject.x_position;
                        this.$store.state.ShortTextObject.ShortText.y = TextObject.y_position;
                        this.$store.state.ShortTextObject.ShortText.page = TextObject.page;
                        this.$store.state.ShortTextObject.ShortText.push_or_readCheck = true;
                        this
                            .$store
                            .commit("ADD_SHORTTEXT_OBJECT", this.$store.state.ShortTextObject.ShortText);
                    } else {
                        this.$store.state.LongTextObject.LongText.htmlID = "LongTextObjectArea"
                        this.$store.state.LongTextObject.LongText.title = "긴 글_"
                        this.$store.state.LongTextObject.LongText.width = TextObject.width;
                        this.$store.state.LongTextObject.LongText.height = TextObject.height;
                        this.$store.state.LongTextObject.LongText.x = TextObject.x_position;
                        this.$store.state.LongTextObject.LongText.y = TextObject.y_position;
                        this.$store.state.LongTextObject.LongText.page = TextObject.page;
                        this.$store.state.LongTextObject.LongText.push_or_readCheck = true;
                        this
                            .$store
                            .commit("ADD_LONGTEXT_OBJECT", this.$store.state.LongTextObject.LongText);
                    }
                }
            },
            pushCheckBoxObject(project_object_checkboxes) {
                for (let CheckBoxObject of project_object_checkboxes) {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = "CheckBoxObjectArea"
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_"
                    this.$store.state.CheckBoxObject.CheckBox.width = CheckBoxObject.width;
                    this.$store.state.CheckBoxObject.CheckBox.height = CheckBoxObject.height;
                    this.$store.state.CheckBoxObject.CheckBox.x = CheckBoxObject.x_position;
                    this.$store.state.CheckBoxObject.CheckBox.y = CheckBoxObject.y_position;
                    this.$store.state.CheckBoxObject.CheckBox.page = CheckBoxObject.page;
                    this.$store.state.CheckBoxObject.CheckBox.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.$store.state.CheckBoxObject.CheckBox);
                }
            },
            pushSignObject(project_object_signs) {
                for (let SignObject of project_object_signs) {
                    this.$store.state.SignObject.Sign.htmlID = "SignObjectArea"
                    this.$store.state.SignObject.Sign.title = "사인_"
                    this.$store.state.SignObject.Sign.width = SignObject.width;
                    this.$store.state.SignObject.Sign.height = SignObject.height;
                    this.$store.state.SignObject.Sign.x = SignObject.x_position;
                    this.$store.state.SignObject.Sign.y = SignObject.y_position;
                    this.$store.state.SignObject.Sign.page = SignObject.page;
                    this.$store.state.SignObject.Sign.push_or_readCheck = true;
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
    header {
        z-index: 3000 !important;
    }
    .writer-main {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    .sideBar {
        top: 20%;
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
</style>
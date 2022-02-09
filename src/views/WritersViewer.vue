<template>
    <v-card class="writer-main overflow-hidden">
        <WriterHeader :document-name="this.documentName"/>
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
    import ObjectBox from '../w_object/ObjectBox.vue';
    import WriteList from '../components_for_edit_page/EditObjectList.vue';
    import PDFViewer from '../components/PDFViewer.vue'
    import AlertForm from '../components/AlertForm.vue';
    import DataProcess from '../DataProcess'
    import {getSubmittee} from "../apis/writer_api";
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
            getSubmittee(this.documentName)
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
            window.addEventListener('resize', DataProcess.resizeEvent, 
            true);
        },
        beforeDestroy(){
            window.removeEventListener('resize', DataProcess.resizeEvent);
        },
        components: {
            SignDialog,
            ObjectBox,
            WriteList,
            WriterHeader,
            PDFViewer,
            AlertForm
        },
        computed: {
            ShortText(){
                return this.$store.state.ShortTextObject.ShortText;
            },
            LongText(){
                return this.$store.state.LongTextObject.LongText;
            },
            CheckBox(){
                return this.$store.state.CheckBoxObject.CheckBox;
            },
            Sign(){
                return this.$store.state.SignObject.Sign;
            },
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
            }
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
            //readAllObject와는 다르게 한번만 선언되어 사용되는 함수이기에 여기에 따로 DataProcess에 담지는 않음.
            pushAllObject(responseData) {
                //가지고 온 데이터에서
                this.pushTextObject(responseData.project_object_texts); //텍스트들만 따로 처리.
                this.pushCheckBoxObject(responseData.project_object_checkboxes); //체크박스만 따로 처리.
                this.pushSignObject(responseData.project_object_signs); //사인값만 따로 처리.
            },
            pushTextObject(project_object_texts) {
                for (let TextObject of project_object_texts) {
                    if (TextObject.type === "SHORT_TEXT") {
                        this.ShortText.htmlID = "short-text-object-area"
                        this.ShortText.title = "짧은 글_"
                        this.ShortText.width = TextObject.width;
                        this.ShortText.height = TextObject.height;
                        this.ShortText.x = TextObject.x_position;
                        this.ShortText.y = TextObject.y_position;
                        this.ShortText.page = TextObject.page;
                        this.ShortText.push_or_readCheck = true;
                        this
                            .$store
                            .commit("ADD_SHORTTEXT_OBJECT", this.ShortText);
                    } else {
                        this.LongText.htmlID = "long-text-object-area"
                        this.LongText.title = "긴 글_"
                        this.LongText.width = TextObject.width;
                        this.LongText.height = TextObject.height;
                        this.LongText.x = TextObject.x_position;
                        this.LongText.y = TextObject.y_position;
                        this.LongText.page = TextObject.page;
                        this.LongText.push_or_readCheck = true;
                        this
                            .$store
                            .commit("ADD_LONGTEXT_OBJECT", this.LongText);
                    }
                }
            },
            pushCheckBoxObject(project_object_checkboxes) {
                for (let CheckBoxObject of project_object_checkboxes) {
                    this.CheckBox.htmlID = "checkbox-object-area"
                    this.CheckBox.title = "체크박스_"
                    this.CheckBox.width = CheckBoxObject.width;
                    this.CheckBox.height = CheckBoxObject.height;
                    this.CheckBox.x = CheckBoxObject.x_position;
                    this.CheckBox.y = CheckBoxObject.y_position;
                    this.CheckBox.page = CheckBoxObject.page;
                    this.CheckBox.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.CheckBox);
                }
            },
            pushSignObject(project_object_signs) {
                for (let SignObject of project_object_signs) {
                    this.Sign.htmlID = "sign-object-area"
                    this.Sign.title = "사인_"
                    this.Sign.width = SignObject.width;
                    this.Sign.height = SignObject.height;
                    this.Sign.x = SignObject.x_position;
                    this.Sign.y = SignObject.y_position;
                    this.Sign.page = SignObject.page;
                    this.Sign.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.Sign);
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
    .sidebar {
        top: 20%;
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
</style>
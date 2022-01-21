<template>
    <v-card class="WritersArea overflow-hidden">
        <div class="WriterHeader">
            <div class="navigation">
                <button class="SaveEditPageButton" @click="pdfPrint()">
                    완료
                </button>
                <button class="CloseEditPageButton">
                    닫기
                </button>
            </div>
        </div>
        <WriteList/>
        <div id="container" class="container">
            <div id="drawerScrollBox" class="pdfViewer">
                <div id="drawer">
                    <pdf v-for="i in numPages" :key="i" :page="i" :src="src"></pdf>
                </div>
            </div>
        </div>
        <ObjectBox/>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";
    import axios from "axios";
    import ObjectBox from '../w_object/ObjectBox.vue';
    import WriteList from '../components_for_writer_view/WriteList.vue';
    export default {
        mounted() {
            this.src = pdf.createLoadingTask(this.pdfLink);
            let self = this;
            axios
                .get(`${process.env.VUE_APP_BASEURL}/api/submittees/projects/${this.documentName}`)
                .then(function (response) {
                    console.log(response.data);
                    self.src = pdf.createLoadingTask(
                        `${process.env.VUE_APP_BASEURL}` + String(response.data.pdf.url)
                    );
                    self.$store.state.UsersDocument.Document = Document;
                    self
                        .src
                        .promise
                        .then(pdf => {
                            self.numPages = pdf.numPages;
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
            WriteList
        },
        data() {
            return {
                //useForJsonFile 오브젝트 관련 데이터 짧은글
                pdfLink: require('../assets/커리큘럼.pdf'),
                ShortTextObjectName: "ShortTextObjectArea",
                ShortTextObjectCheck: false,
                ShortTextObjectID: 1,

                //긴글
                LongTextObjectName: "LongTextObjectArea",
                LongTextObjectCheck: false,
                LongTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectCheck: false,
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "SignObjectArea",
                SignObjectCheck: false,
                SignObjectID: 1,

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
            saveOriginalWidth(responseData){
                this.$store.commit("FORMAT_ORIGINAL_WIDTH");
                for(let OW of responseData.pdf.original_width){
                    this.$store.commit("SAVE_ORIGINAL_WIDTH", OW);
                }
            },
            pdfPrint() {
                // 현재 document.body의 html을 A4 크기에 맞춰 PDF로 변환
                html2canvas(document.getElementById("drawer")).then(function (canvas) {
                    // 캔버스를 이미지로 변환
                    var imgData = canvas.toDataURL('image/png');
                    var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
                    var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
                    var imgHeight = canvas.height * imgWidth / canvas.width;
                    var heightLeft = imgHeight;
                    var doc = new jsPDF({'orientation': 'p', 'unit': 'mm', 'format': 'a4'});
                    var position = 0;

                    // 첫 페이지 출력
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    // 한 페이지 이상일 경우 루프 돌면서 출력
                    while (heightLeft >= 20) {
                        position = heightLeft - imgHeight;
                        doc.addPage();
                        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    // 파일 저장
                    doc.save('sample.pdf');
                })
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
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this.$store.state.PDFInfo.OriginalWidth[0];
                for (let TextObject of project_object_texts) {
                    if (TextObject.type === "SHORT_TEXT") {
                        this.$store.state.ShortTextObject.ShortText.htmlID = "ShortTextObjectArea"
                        this.$store.state.ShortTextObject.ShortText.title = "짧은 글_"
                        this.$store.state.ShortTextObject.ShortText.width = TextObject.width*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.height = TextObject.height*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.x = TextObject.x_position*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.y = TextObject.y_position*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.page = TextObject.page;
                        this.$store.state.ShortTextObject.ShortText.push_or_readCheck = false;
                        this
                            .$store
                            .commit("ADD_SHORTTEXT_OBJECT", this.$store.state.ShortTextObject.ShortText);
                    } else {
                        this.$store.state.LongTextObject.LongText.htmlID = "LongTextObjectArea"
                        this.$store.state.LongTextObject.LongText.title = "긴 글_"
                        this.$store.state.LongTextObject.LongText.width = TextObject.width*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.height = TextObject.height*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.x = TextObject.x_position*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.y = TextObject.y_position*computed_Ratio;
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
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this.$store.state.PDFInfo.OriginalWidth[0];
                for (let CheckBoxObject of project_object_checkboxes) {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = "CheckBoxObjectArea"
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_"
                    this.$store.state.CheckBoxObject.CheckBox.width = CheckBoxObject.width*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.height = CheckBoxObject.height*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.x = CheckBoxObject.x_position*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.y = CheckBoxObject.y_position*computed_Ratio;
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
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this.$store.state.PDFInfo.OriginalWidth[0];
                for (let SignObject of project_object_signs) {
                    this.$store.state.SignObject.Sign.htmlID = "SignObjectArea"
                    this.$store.state.SignObject.Sign.title = "사인_"
                    this.$store.state.SignObject.Sign.width = SignObject.width*computed_Ratio;
                    this.$store.state.SignObject.Sign.height = SignObject.height*computed_Ratio;
                    this.$store.state.SignObject.Sign.x = SignObject.x_position*computed_Ratio;
                    this.$store.state.SignObject.Sign.y = SignObject.y_position*computed_Ratio;
                    this.$store.state.SignObject.Sign.page = SignObject.page;
                    this.$store.state.SignObject.Sign.push_or_readCheck = false;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.$store.state.SignObject.Sign);
                }
            },
            async addFiles(files) {
                console.log(files);
                this
                    .$store
                    .commit("SET_DOCUMENT_TITLE", files[0].name);
                if (files[0].name.includes(".pdf")) {
                    const src = await this.readFiles(files[0])
                    console.log(files[0])
                    console.log(src)
                    this.fileUploadCheck = true;
                    this
                        .$store
                        .commit("SET_PDF_FILE_UPLOAD_CHECK_TRUE");
                    this.src = src;
                    this.src = pdf.createLoadingTask(src);
                    this
                        .src
                        .promise
                        .then(pdf => {
                            this.numPages = pdf.numPages;
                            this
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", this.numPages);
                        });
                } else {
                    alert("pdf만 올릴수있습니다. 다시 시도해주세요.");
                }
            },
            async readFiles(files) {
                return new Promise((resolve) => {
                    const reader = new FileReader()
                    reader.onload = async (e) => {
                        resolve(e.target.result)
                    }
                    reader.readAsDataURL(files)
                });
            }
        }
    }
</script>
<style>
    .pdfViewer {
        margin-top: 200px;
        text-align: center;
        height: 100%;
        width: 80%;
    }
    #drawer {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        overflow: hidden;
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
    header {
        z-index: 3000 !important;
    }
    ul {
        list-style: none;
    }
    .WriterHeader {
        width: 100%;
        height: 15%;
        position: fixed;
        background-color: white;
        z-index: 10;
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
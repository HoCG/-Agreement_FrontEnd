<template>
    <v-card class="WritersArea">
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
        <div class="sideBar">
            <div class="ShowObjectInfo">
                <div class="objectInfo">
                    <h3 class="objectInfoText">오브젝트 리스트</h3>
                </div>
                <div class="objectList">
                    <ul>
                        <li>
                            <div style="width:100%; height: 28px;">
                                <ShortTextSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.ShortTextObjectArray.length}})</div>
                            </div>
                            <ol
                                style="width:100%;"
                                v-for="ShortTextObject in ShortTextObjectArray"
                                :key="ShortTextObject.id">
                                {{
                                    ShortTextObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li>
                            <div style="width:100%; height: 28px;">
                                <LongTextSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.LongTextObjectArray.length}})</div>
                            </div>
                            <ol
                                style="width:100%;"
                                v-for="LongTextObject in LongTextObjectArray"
                                :key="LongTextObject.id">
                                {{
                                    LongTextObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li>
                            <div style="width:100%; height: 28px;">
                                <CheckBoxSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.CheckBoxObjectArray.length}})</div>
                            </div>
                            <ol v-for="CheckBoxObject in this.CheckBoxObjectArray" :key="CheckBoxObject.id">
                                {{
                                    CheckBoxObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li>
                            <div style="width:100%; height: 28px;">
                                <SignSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.SignObjectArray.length}})</div>
                            </div>
                            <ol v-for="SignObject in this.SignObjectArray" :key="SignObject.id">
                                {{
                                    SignObject.title
                                }}
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="drawerScrollBox" class="pdfViewer">
            <div id="drawer">
                <pdf v-for="i in numPages" :key="i" :page="i" :src="src"></pdf>
            </div>
        </div>
        <div>
            <CheckBoxObject
                v-for="CheckBoxObject in CheckBoxObjectArray"
                :key="CheckBoxObject.id"
                v-bind:getCBData="CheckBoxObject"/>
        </div>
        <div>
            <LongTextObject
                v-for="LTextObject in LongTextObjectArray"
                :key="LTextObject.id"
                v-bind:getLTData="LTextObject"/>
        </div>
        <div>
            <ShortTextObject
                v-for="STextObject in ShortTextObjectArray"
                :key="STextObject.id"
                v-bind:getSTData="STextObject"/>
        </div>
        <div>
            <SignObject
                v-for="SignObject in SignObjectArray"
                :key="SignObject.id"
                v-bind:getSOData="SignObject"/>
        </div>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import JsonFile from '../assets/testJsonFile.json';
    import ShortTextSVG from '../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../svgs/CheckBoxSVG.vue';
    import SignSVG from '../svgs/SignSVG.vue';
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";
    import CheckBoxObject from "../w_object/CheckBoxObject.vue";
    import LongTextObject from "../w_object/LongTextObject.vue";
    import ShortTextObject from "../w_object/ShortTextObject.vue";
    import SignObject from "../w_object/SignObject.vue";
    export default {
        mounted() {
            this.src = pdf.createLoadingTask(this.pdfLink);
            this
                .src
                .promise
                .then(pdf => {
                    this.numPages = pdf.numPages;
                });
            //this.Loading(this.pdfLink);
            this.readAllObject(JsonFile);
            console.log(JsonFile);
            //this.documentTitle = JsonFile.documentInfo[0].title;
        },
        components: {
            CheckBoxObject,
            LongTextObject,
            ShortTextObject,
            SignObject,
            CheckBoxSVG,
            SignSVG,
            SignDialog,
            ShortTextSVG,
            LongTextSVG,
            pdf
        },
        data() {
            return {
                //useForJsonFile 오브젝트 관련 데이터 짧은글
                pdfLink: require('../assets/커리큘럼.pdf'),
                ShortTextObjectName: "ShortTextObjectArea",
                ShortTextObjectArray: [],
                ShortTextObject: {
                    title: "",
                    id: "",
                    htmlID: "",
                    text: "",
                    width: "",
                    height: "",
                    page: "",
                    x: "",
                    y: ""
                },
                ShortTextObjectCheck: false,
                ShortTextObjectID: 1,

                //긴글
                LongTextObjectName: "LongTextObjectArea",
                LongTextObjectArray: [],
                LongTextObject: {
                    title: "",
                    id: "",
                    htmlID: "",
                    text: "",
                    width: "",
                    height: "",
                    page: "",
                    x: "",
                    y: ""
                },
                LongTextObjectCheck: false,
                LongTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectArray: [],
                CheckBoxObject: {
                    title: "",
                    id: "",
                    htmlID: "",
                    text: "",
                    width: "",
                    height: "",
                    page: "",
                    x: "",
                    y: ""
                },
                CheckBoxObjectCheck: false,
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "SignObjectArea",
                SignObjectArray: [],
                SignObject: {
                    title: "",
                    id: "",
                    htmlID: "",
                    text: "",
                    width: "",
                    height: "",
                    page: "",
                    x: "",
                    y: ""
                },
                SignObjectCheck: false,
                SignObjectID: 1,

                isDragged: "",
                src: "",
                numPages: undefined,
                itemLength: 0,
                selectedID: "",
                imageID: "",
                selectedItem: 1,
                selectedItemText: ""
            }
        },
        methods: {
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
            fnSaveAsPdf() {
                html2canvas(document.getElementById("drawer")).then(function (canvas) {
                    var imgData = canvas.toDataURL('image/png');
                    var imgWidth = 210;
                    //var pageHeight = imgWidth * 1.414;
                    var imgHeight = canvas.height * imgWidth / canvas.width;

                    var doc = new jsPDF({'orientation': 'p', 'unit': 'mm', 'format': 'a4'});

                    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                    doc.save('sample_A4.pdf');
                    console.log('Reached here?');
                    console.log(doc);
                });
            },
            readAllObject(DocumentObjectList) {
                for (let DocumentObject of DocumentObjectList.object) {
                    let NewObject = {
                        title: "",
                        id: "",
                        htmlID: "",
                        text: "",
                        width: "",
                        height: "",
                        page: "",
                        x: "",
                        y: ""
                    }
                    if (DocumentObject.title.includes("짧은 글")) {
                        NewObject.htmlID = "ShortTextObjectArea" + DocumentObject.id;
                        NewObject.id = DocumentObject.id;
                        NewObject.title = "짧은 글_" + DocumentObject.id;
                        NewObject.width = DocumentObject.width;
                        NewObject.height = DocumentObject.height;
                        NewObject.x = DocumentObject.x;
                        NewObject.y = DocumentObject.y;
                        NewObject.page = DocumentObject.page;
                        this
                            .ShortTextObjectArray
                            .push(NewObject);
                    } else if (DocumentObject.title.includes("긴 글")) {
                        NewObject.htmlID = "LongTextObjectArea" + DocumentObject.id
                        NewObject.title = "긴 글_" + DocumentObject.id
                        NewObject.id = DocumentObject.id;
                        NewObject.width = DocumentObject.width;
                        NewObject.height = DocumentObject.height;
                        NewObject.x = DocumentObject.x;
                        NewObject.y = DocumentObject.y;
                        NewObject.page = DocumentObject.page;
                        this
                            .LongTextObjectArray
                            .push(NewObject);
                    } else if (DocumentObject.title.includes("체크박스")) {
                        NewObject.htmlID = "CheckBoxObjectArea" + DocumentObject.id
                        NewObject.title = "체크박스_" + DocumentObject.id
                        NewObject.id = DocumentObject.id;
                        NewObject.width = DocumentObject.width;
                        NewObject.height = DocumentObject.height;
                        NewObject.x = DocumentObject.x;
                        NewObject.y = DocumentObject.y;
                        NewObject.page = DocumentObject.page;
                        this
                            .CheckBoxObjectArray
                            .push(NewObject);
                    } else if (DocumentObject.title.includes("사인")) {
                        NewObject.htmlID = "SignObjectArea" + DocumentObject.id
                        NewObject.title = "사인_" + DocumentObject.id
                        NewObject.id = DocumentObject.id;
                        NewObject.width = DocumentObject.width;
                        NewObject.height = DocumentObject.height;
                        NewObject.x = DocumentObject.x;
                        NewObject.y = DocumentObject.y;
                        NewObject.page = DocumentObject.page;
                        this
                            .SignObjectArray
                            .push(NewObject);
                    }
                }
                console.log(this.ShortTextObjectArray)
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
    .ShortTextObjectArea {
        z-index: 6;
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
    }
    .LongTextObjectArea {
        z-index: 6;
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
    }
    .CheckBoxObjectArea {
        z-index: 6;
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
    }
    .SignObjectArea {
        z-index: 6;
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
    }
    .WritersArea {
        text-align: center;
        align-items: center;
    }
    .pdfViewer {
        z-index: 2;
        width: 70%;
        margin-left: 15%;
    }
</style>
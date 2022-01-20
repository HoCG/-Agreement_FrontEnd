<template>
    <div id="container" class="container">
        <div
            v-if="this.$store.state.PDFInfo.PDFFileUploadCheck"
            id="drawerScrollBox"
            class="pdfViewer">
            <div id="drawer">
                <pdf
                    v-for="i in numPages"
                    :key="i"
                    :page="i"
                    style="width: 100%"
                    class="pdf-page-Setting"
                    :src="src"
                    v-bind:id="'page'+i"></pdf>
            </div>
        </div>
        <div v-else class="FileUploadArea">
            <div v-if="this.$store.state.DocumentSideBarData.Show_UserDocumentList">
                <div
                    class="file-upload-container"
                    @dragenter="onDragenter"
                    @dragover="onDragover"
                    @dragleave="onDragleave"
                    @drop="onDrop">
                    <div class="file-upload-div">
                        <svg
                            class="file-upload-img"
                            width="105"
                            height="70"
                            viewBox="0 0 105 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M82.8333 69.6666H26.5C12.9556 69.6746 1.67383 59.2833 0.570867 45.7839C-0.532097 32.2845 8.91323 20.1996 22.2793 18.0089C28.4314 7.10143 39.9771 0.348473 52.5 0.333009C60.3087 0.303493 67.8939 2.93889 74.002 7.80393C79.9997 12.5613 84.2638 19.1615 86.1353 26.5846C97.3322 28.305 105.314 38.3605 104.448 49.6557C103.582 60.9509 94.1616 69.6726 82.8333 69.6666ZM52.5 8.99988C43.104 9.01099 34.4415 14.079 29.828 22.2643L27.8 25.8999L23.6876 26.5716C14.8055 28.0597 8.54267 36.1019 9.27588 45.0779C10.0091 54.0539 17.4941 60.9731 26.5 60.9999H82.8333C89.6305 61.0069 95.2856 55.7765 95.8082 48.9995C96.3308 42.2224 91.5445 36.1868 84.8266 35.1516L79.124 34.2849L77.7286 28.6863C74.8482 17.1024 64.4365 8.97807 52.5 8.99988ZM58.7833 52.3333H46.2166V39.3333H35.1666L52.5 21.9999L69.8333 39.3333H58.7833V52.3333Z"
                                fill="#767676"/>
                        </svg>
                        <h2 class="file-upload-text">서명 받을 문서를 끌어오거나 오른쪽의 버튼을 눌러 업로드 해주세요.</h2>
                        <button @click="onClick" class="file-upload-btn">문서 가져오기</button>
                    </div>
                </div>
                <!-- 파일 업로드 -->
                <input
                    type="file"
                    ref="fileInput"
                    class="file-upload-input"
                    @change="onFileChange"
                    multiple="multiple"/>
                <div id="mainWrapper">
                    <ul class="MainFrame">
                        <li>
                            <!--Table-->
                            <ul id="ulTable">
                                <li>
                                    <ul class="UlTitleSetting">
                                        <li>공유 상태</li>
                                        <li>문서 제목</li>
                                        <li>제출수</li>
                                        <li>&nbsp;</li>
                                        <li>&nbsp;</li>
                                    </ul>
                                </li>
                                <!-- 게시물이 출력될 영역 -->
                                <li
                                    v-for="Document in this.$store.state.UsersDocument.DocumentArr"
                                    :key="Document.id">
                                    <ul class="ItemsUl">
                                        <li>
                                            <DocumentState
                                                v-bind:StateInfo="Document.State"
                                                v-bind:WritersCountInfo="Document.documentWritersCount"/>
                                        </li>
                                        <li>
                                            <button @click="goEditScreen(Document)">
                                                {{Document.documentTitle}}
                                            </button>
                                        </li>
                                        <li>{{Document.documentWritersCount}}</li>
                                        <li>
                                            <StateAction v-bind:DocumentInfo="Document"/>
                                        </li>
                                        <li>
                                            <button @click="showDocumentMenu(Document, $event)">
                                                <DotsBtn/>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul class="ItemsUl"></ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <DocumentMenu v-bind:MenuDocument="this.MenuDocument" id="DocumentMenu"/>
                </div>
            </div>
            <div v-else>
                <WritersDocumentList/>
            </div>
        </div>
    </div>
</template>
<script>
    import UsersDocumentListInfo from "../assets/UsersDocumentListInfo.json";
    import WritersDocumentListInfo from "../assets/WritersDocumentListInfo.json";
    import DocumentState from "../components/DocumentState.vue";
    import pdf from 'vue-pdf';
    import DocumentObjectList from '../assets/DocumentObjectList.json';
    import StateAction from '../components/StateAction.vue';
    import WritersDocumentList from '../components/WritersDocumentList.vue';
    import DotsBtn from '../svgs/DotsSVG.vue';
    import DocumentMenu from '../components/DocumentMenu.vue';
    import axios from "axios";
    export default {
        mounted() {
            this
                .$store
                .dispatch('REQUEST_PROJECT');
            this
                .$store
                .commit("SET_WRITER_DOCUMENT_LIST_FALSE");
            this
                .$store
                .commit("SET_USER_DOCUMENT_LIST_TRUE");
        },
        components: {
            DocumentMenu,
            DocumentState,
            WritersDocumentList,
            StateAction,
            DotsBtn,
            pdf
        },
        data() {
            return {
                MenuDocument: {},
                DocumentObjectList: DocumentObjectList,
                OpenWritersDocument: false,
                FirstDocumentCheck: true,
                WritersDocumentListInfo: WritersDocumentListInfo,
                UsersDocumentListInfo: UsersDocumentListInfo,
                fileUploadCheck: false,
                isDragged: "",
                src: "",
                numPages: undefined
            }
        },
        methods: {
            IsFirstDocument() {
                if (this.FirstDocumentCheck) {
                    this.FirstDocumentCheck = false;
                    return true;
                } else if (!this.FirstDocumentCheck) {
                    return false;
                }
            },
            showDocumentMenu(Document, event) {
                let Menu = document.getElementById("DocumentMenu");
                this.MenuDocument = Document;
                Menu.style.display = "block";
                Menu.style.left = event.pageX - Menu
                    .getBoundingClientRect()
                    .width / 2 + "px";
                Menu.style.top = event.pageY - Menu
                    .getBoundingClientRect()
                    .height / 2 + "px";
                console.log(this.MenuDocument);
            },
            onClick() {
                this
                    .$refs
                    .fileInput
                    .click()
            },
            onDragenter() {
                // class 넣기
                this.isDragged = true;
            },
            onDragleave() {
                // class 삭제
                this.isDragged = false;
            },
            onDragover(event) {
                // 드롭을 허용하도록 prevetDefault() 호출
                event.preventDefault()
            },
            onDrop(event) {
                // 기본 액션을 막음 (링크 열기같은 것들)
                event.preventDefault()
                this.isDragged = false
                const files = event.dataTransfer.files;
                this.addFiles(files);
            },
            onFileChange(event) {
                const files = event.target.files;
                this.addFiles(files);
            },
            goEditScreen(Document) {
                this
                    .$store
                    .commit("SHOW_EDIT_PAGE");
                //let test = require('../assets/커리큘럼.pdf');
                let self = this
                axios
                    .get(`${process.env.VUE_APP_BASEURL}/api/projects/${Document.name}`)
                    .then(function (response) {
                        console.log(response.data);
                        self.src = pdf.createLoadingTask(`${process.env.VUE_APP_BASEURL}`+String(response.data.pdf.url));
                        self.$store.state.UsersDocument.Document = Document;
                        self
                            .src
                            .promise
                            .then(pdf => {
                                self.numPages = pdf.numPages;
                                self
                                    .$store
                                    .commit("SET_PDF_FILE_PAGE_INFO", self.numPages);
                                setTimeout(3000, self.readAllObject(response.data));
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            async addFiles(files) {
                console.log(files);
                this
                    .$store
                    .commit("SET_DOCUMENT_TITLE", files[0].name);
                if (files[0].name.includes(".pdf")) {
                    //const src = await this.readFiles(files[0])
                    this.$store.state.UsersDocument.Document.id = this
                        .$store
                        .state
                        .UsersDocument
                        .DocumentArr[0] + 1;
                    this.$store.state.UsersDocument.Document.documentTitle = files[0].name;
                    this.$store.state.UsersDocument.Document.Link = "";
                    this.$store.state.UsersDocument.Document.src = files[0];
                    this.$store.state.UsersDocument.Document.documentWritersCount = 0;
                    this.$store.state.UsersDocument.Document.State = 1;
                    this
                        .$store
                        .dispatch('POST_PROJECT', this.$store.state.UsersDocument.Document);
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
            },
            readAllObject(responseData) {
                console.log(responseData.project_object_texts)
                this.readTextObject(responseData.project_object_texts);
                this.readCheckBoxObject(responseData.project_object_checkboxes);
                this.readSignObject(responseData.project_object_signs);
            },
            readTextObject(project_object_texts) {
                for (let TextObject of project_object_texts) {
                    if (TextObject.type === "SHORT_TEXT") {
                        this.$store.state.ShortTextObject.ShortText.htmlID = "ShortTextObjectArea"
                        this.$store.state.ShortTextObject.ShortText.title = "짧은 글_"
                        this.$store.state.ShortTextObject.ShortText.width = TextObject.width;
                        this.$store.state.ShortTextObject.ShortText.height = TextObject.height;
                        this.$store.state.ShortTextObject.ShortText.x = TextObject.x_position;
                        this.$store.state.ShortTextObject.ShortText.y = TextObject.y_position;
                        this.$store.state.ShortTextObject.ShortText.page = TextObject.page;
                        this.$store.state.ShortTextObject.ShortText.push_or_readCheck = false;
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
                        this.$store.state.LongTextObject.LongText.push_or_readCheck = false;
                        this
                            .$store
                            .commit("ADD_LONGTEXT_OBJECT", this.$store.state.LongTextObject.LongText);
                    }
                }
            },
            readCheckBoxObject(project_object_checkboxes) {
                for (let CheckBoxObject of project_object_checkboxes) {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = "CheckBoxObjectArea"
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_"
                    this.$store.state.CheckBoxObject.CheckBox.width = CheckBoxObject.width;
                    this.$store.state.CheckBoxObject.CheckBox.height = CheckBoxObject.height;
                    this.$store.state.CheckBoxObject.CheckBox.x = CheckBoxObject.x_position;
                    this.$store.state.CheckBoxObject.CheckBox.y = CheckBoxObject.y_position;
                    this.$store.state.CheckBoxObject.CheckBox.page = CheckBoxObject.page;
                    this.$store.state.CheckBoxObject.CheckBox.push_or_readCheck = false;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.$store.state.CheckBoxObject.CheckBox);
                }
            },
            readSignObject(project_object_signs) {
                for (let SignObject of project_object_signs) {
                    this.$store.state.SignObject.Sign.htmlID = "SignObjectArea"
                    this.$store.state.SignObject.Sign.title = "사인_"
                    this.$store.state.SignObject.Sign.width = SignObject.width;
                    this.$store.state.SignObject.Sign.height = SignObject.height;
                    this.$store.state.SignObject.Sign.x = SignObject.x_position;
                    this.$store.state.SignObject.Sign.y = SignObject.y_position;
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
<style lang="scss">
    .TitleAndItemsUl {
        border: 2px solid #767676;
    }
    .ItemsUl {
        border: 1px solid #DADADA;
    }
    .FileUploadArea {
        float: right;
        left: 200px;
        text-align: center;
        justify-content: center;
        min-height: 184px;
        width: 100%;
    }
    .file-upload {
        width: 70%;
        height: 184px;
        float: right;
        border: transparent;
        border-radius: 20px;
        font-size: 10;
        font-weight: 700;
        cursor: pointer;
        &.dragged {
            border: 1px dashed powderblue;
            opacity: 0.6;
        }
        &-container {
            padding: 25px;
            width: 100%;
            height: 184px;
            margin: 0 auto;
            box-shadow: 0 0.625rem 1.25rem #0000001a;
            background-color: white;
            border: 3px dashed #4c384a;
            border-radius: 20px;
        }
        &-input {
            display: none;
        }
        &-div {
            margin-left: 180px;
            margin-top: 30px;
        }
        &-text {
            width: 420px;
            float: left;
        }
        &-img {
            float: left;
        }
        &-btn {
            text-align: center;
            width: 158px;
            height: 68px;
            float: left;
            /* Auto layout */
            margin-left: 110px;
            align-items: flex-start;
            padding: 10px;
            /* gray_03 */

            background: #DADADA;
            box-sizing: border-box;
            border-radius: 24px;

            /* Inside auto layout */
            flex: none;
        }
    }
    .pdfViewer {
        margin-top: 200px;
        margin-left: 10%;
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
    li,
    ul {
        list-style: none;
        text-align: center;
        padding: 0;
        margin: 0;
    }

    #mainWrapper {
        padding-right: 50px;
        margin-top: 20px;
        background-color: white;
        width: 100%;
        height: 1000px;
    }
    #mainWrapper > ul > li:first-child {
        text-align: center;
        font-size: 14px;
        height: 40px;
        vertical-align: middle;
        line-height: 30px;
    }
    .UlTitleSetting > li {
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 23px;
    }
    #ulTable > li:first-child > ul > li {
        font-weight: bold;
        text-align: center;
    }
    #ulTable > li > ul {
        text-align: center;
        clear: both;
        position: relative;
        min-width: 40px;
    }
    #ulTable > li > ul > li {
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: center;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 23px;
        float: left;
        font-size: 10pt;
        vertical-align: baseline;
    }

    #ulTable > li > ul > li:first-child {
        width: 12.5%;
    }
    #ulTable > li > ul > li:first-child +li {
        width: 45%;
    }
    /*No 열 크기*/
    #ulTable > li > ul > li:first-child +li+li {
        width: 12.5%;
    }
    /*제목 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li {
        width: 12.5%;
    }
    /*작성일 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li {
        width: 12.5%;
    }
    /*작성자 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li+li {
        width: 5%;
    }
    .left {
        text-align: left;
    }
    .switch-button {
        position: relative;
        display: inline-block;
        width: 55px;
        height: 30px;
    }
    .switch-button input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .onoff-switch {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        background-color: #ccc;
        box-shadow: inset 1px 5px 1px #999;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .onoff-switch:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 4px;
        bottom: 4px;
        background-color: #fff;
        -webkit-transition: 0.5s;
        transition: 0.4s;
        border-radius: 20px;
    }
    .switch-button input:checked + .onoff-switch {
        background-color: #F2D522;
        box-shadow: inset 1px 5px 1px #E3AE56;
    }
    .switch-button input:checked + .onoff-switch:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>
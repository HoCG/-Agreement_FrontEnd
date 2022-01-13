<template>
    <div id="container" class="container">
        <div v-if="fileUploadCheck" id="drawerScrollBox" class="pdfViewer">
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
                                        <li>링크</li>
                                        <li>수정</li>
                                        <li>공유</li>
                                        <li>&nbsp;</li>
                                    </ul>
                                </li>
                                <!-- 게시물이 출력될 영역 -->
                                <li
                                    v-for="Document in this.UsersDocumentListInfo.documentInfo"
                                    :key="Document.id">
                                    <ul v-if="IsFirstDocument()" class="TitleAndItemsUl">
                                        <li>
                                            <DocumentState v-bind:StateInfo="Document.State" v-bind:WritersCountInfo="Document.documentWritersCount"/>
                                        </li>
                                        <li>{{Document.documentTitle}}</li>
                                        <li>{{Document.documentWritersCount}}</li>
                                        <li>
                                            <LinkBtn/>
                                        </li>
                                        <li>
                                            <EditBtn v-if="(Document.State===1 || Document.State===0) || (Document.State===3 && Document.documentWritersCount===0)" 
                                            @click.native="goEditScreen(Document)"/>
                                        </li>
                                        <li>
                                            <label v-if="Document.State!=0" class="switch-button">
                                                <input type="checkbox"/>
                                                <span class="onoff-switch"></span>
                                            </label>
                                        </li>
                                        <li>&nbsp;</li>
                                    </ul>
                                    <ul v-else class="ItemsUl">
                                        <li>
                                            <DocumentState v-bind:StateInfo="Document.State" v-bind:WritersCountInfo="Document.documentWritersCount"/>
                                        </li>
                                        <li>{{Document.documentTitle}}</li>
                                        <li>{{Document.documentWritersCount}}</li>
                                        <li>
                                            <LinkBtn v-if="Document.State===2"/>
                                        </li>
                                        <li>
                                            <EditBtn v-if="(Document.State===1 || Document.State===0) || (Document.State===3 && Document.documentWritersCount===0)" 
                                            @click.native="goEditScreen(Document)"/>
                                        </li>
                                        <li>
                                            <label v-if="Document.State!=0" class="switch-button">
                                                <input type="checkbox"/>
                                                <span class="onoff-switch"></span>
                                            </label>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul class="ItemsUl"></ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <div id="mainWrapper">
                    <ul class="MainFrame">
                        <li>
                            <ul id="ulTable">
                                <li>
                                    <ul class="UlTitleSetting">
                                        <li>문서제목</li>
                                        <li>제출수</li>
                                        <li>제출일시</li>
                                        <li>제출자</li>
                                        <li>&nbsp;</li>
                                    </ul>
                                </li>
                                <!-- 게시물이 출력될 영역 -->
                                <li
                                    class="MainLiSetting"
                                    v-for="Document in this.WritersDocumentListInfo.documentInfo"
                                    :key="Document.id">
                                    <ul v-if="IsFirstDocument(Document)" class="TitleAndItemsUl">
                                        <li>{{Document.documentTitle}}</li>
                                        <li>{{Document.WritersDocument.length}}</li>
                                        <li>-</li>
                                        <li>-</li>
                                        <li>
                                            <button>open</button>
                                        </li>
                                    </ul>
                                    <ul v-else-if="!IsFirstDocument()" class="ItemsUl">
                                        <li>{{Document.documentTitle}}</li>
                                        <li>{{Document.WritersDocument.length}}</li>
                                        <li>-</li>
                                        <li>-</li>
                                        <li>
                                            <button
                                                v-bind:id="'openBtn'+Document.documentTitle"
                                                @click="ShowWritersDocumentList(Document.documentTitle)">open</button>
                                            <button
                                                class="closeBtn"
                                                v-bind:id="'closeBtn'+Document.documentTitle"
                                                @click="CloseWritersDocumentList(Document.documentTitle)">close</button>
                                        </li>
                                    </ul>
                                    <ul
                                        v-bind:class="'WritersList '+Document.documentTitle"
                                        v-for="WritersDocument in Document.WritersDocument"
                                        :key="WritersDocument.id">
                                        <li>{{Document.documentTitle}}</li>
                                        <li>-</li>
                                        <li>{{WritersDocument.date}}</li>
                                        <li>{{WritersDocument.writer}}</li>
                                        <li>
                                            <button class="ShowDocumentAboutWriter">
                                                문서 보기
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import UsersDocumentListInfo from "../assets/UsersDocumentListInfo.json";
    import WritersDocumentListInfo from "../assets/WritersDocumentListInfo.json";
    import DocumentState from "../components/DocumentState.vue";
    import EditBtn from "../svgs/EditSVG.vue";
    import LinkBtn from "../svgs/LinkBtnSVG.vue"
    import pdf from 'vue-pdf';
    let loadingTask = pdf.createLoadingTask(
        "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
    );
    export default {
        mounted() {
            this
                .$store
                .commit("SET_WRITER_DOCUMENT_LIST_FALSE");
            this
                .$store
                .commit("SET_USER_DOCUMENT_LIST_TRUE");
        },
        components: {
            DocumentState,
            EditBtn,
            LinkBtn,
            pdf
        },
        data() {
            return {
                OpenWritersDocument: false,
                FirstDocumentCheck: true,
                WritersDocumentListInfo: WritersDocumentListInfo,
                UsersDocumentListInfo: UsersDocumentListInfo,
                fileUploadCheck: false,
                isDragged: "",
                src: loadingTask,
                numPages: undefined
            }
        },
        methods: {
            ShowWritersDocumentList(documentTitle) {
                let WritersList = document.getElementsByClassName(documentTitle);
                for (let WL of WritersList) {
                    WL.style.display = "block";
                }
                let getCloseBtn = document.getElementById('closeBtn' + documentTitle);
                getCloseBtn.style.display = "inline";
                let getOpenBtn = document.getElementById('openBtn' + documentTitle);
                getOpenBtn.style.display = "none";
            },
            CloseWritersDocumentList(documentTitle) {
                let WritersList = document.getElementsByClassName(documentTitle);
                for (let WL of WritersList) {
                    WL.style.display = "none";
                }
                let getCloseBtn = document.getElementById('closeBtn' + documentTitle);
                getCloseBtn.style.display = "none";
                let getOpenBtn = document.getElementById('openBtn' + documentTitle);
                getOpenBtn.style.display = "inline";
            },
            IsFirstDocument() {
                if (this.FirstDocumentCheck) {
                    this.FirstDocumentCheck = false;
                    return true;
                } else if (!this.FirstDocumentCheck) {
                    return false;
                }
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
                this.fileUploadCheck = true;
                let test = require('../assets/커리큘럼.pdf');
                if(Document.src.length >= 2){
                    this.src = pdf.createLoadingTask(Document.src);
                    this
                        .src
                        .promise
                        .then(pdf => {
                            this.numPages = pdf.numPages;
                            this
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", this.numPages);
                    });
                }
                else{
                    this.src = pdf.createLoadingTask(test);
                    this
                        .src
                        .promise
                        .then(pdf => {
                            this.numPages = pdf.numPages;
                            this
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", this.numPages);
                    });
                }
                this
                    .$store
                    .commit("SET_PDF_FILE_UPLOAD_CHECK_TRUE");
            },
            async addFiles(files) {
                console.log(files);
                this
                    .$store
                    .commit("SET_DOCUMENT_TITLE", files[0].name);
                if (files[0].name.includes(".pdf")) {
                    const src = await this.readFiles(files[0])
                    /*
                    console.log(files[0])
                    console.log(src)
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
                    this
                        .$store
                        .commit("SET_PDF_FILE_PAGE_INFO", this.numPages);
                        */
                    let newData =         {
                        id: UsersDocumentListInfo.documentInfo.length + 1,
                        documentTitle: files[0].name,
                        Link: "",
                        src: src,
                        documentWritersCount: 2,
                        State: 0
                    }
                    UsersDocumentListInfo.documentInfo.push(newData);
                    console.log(UsersDocumentListInfo.documentInfo);
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
<style lang="scss">
    .closeBtn {
        display: none;
    }
    .WritersList {
        width: 100%;
        display: none;
    }
    .WritersList > li {
        display: block;
        background: #F3F3F3;
        box-sizing: border-box;
    }
    .WritersList > div > li {
        display: inline-block;
    }
    .WritersList > div > li:first-child {
        width: 45%;
    }
    /*No 열 크기*/
    .WritersList > div > li:first-child +li {
        width: 11%;
    }
    /*제목 열 크기*/
    .WritersList > div > li:first-child +li+li {
        width: 11%;
    }
    /*작성일 열 크기*/
    .WritersList > div > li:first-child +li+li+li {
        width: 11%;
    }
    /*작성자 열 크기*/
    .WritersList > div > li:first-child +li+li+li+li {
        width: 11%;
    }
    .WritersList > div > li:first-child +li+li+li+li {
        width: 11%;
    }
    .ShowDocumentAboutWriter {
        background: #DADADA;
        /* gray_05 */

        border: 1px solid #767676;
        box-sizing: border-box;
        border-radius: 20px;
        width: 60px;
        height: 23px;
    }
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
        height: 3000px;
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
        width: 11%;
    }
    #ulTable > li > ul > li:first-child +li {
        width: 45%;
    }
    /*No 열 크기*/
    #ulTable > li > ul > li:first-child +li+li {
        width: 11%;
    }
    /*제목 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li {
        width: 11%;
    }
    /*작성일 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li {
        width: 11%;
    }
    /*작성자 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li+li {
        width: 11%;
    }
    #ulTable > li > ul > li:first-child +li+li+li+li+li+li {
        width: 11%;
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
<!--작성자 기준에서 PDF전체 화면을 구성해주는 파일입니다.-->
<template>
    <div id="container" class="container">
        <!--편집화면으로 넘어갈때-->
        <div class="FileUploadArea">
            <div v-if="this.$store.state.DocumentSideBarData.Show_UserDocumentList">
                <DocumentUploadView />
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
                                            <!--문서의 상태값을 보여주는 컴포넌트-->
                                            <DocumentStateShow
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
                                            <!--문서의 상태값에 따라 공유와 공유재개를 결정하게 도와주는 컴포넌트-->
                                            <DocumentStateAction v-bind:DocumentInfo="Document"/>
                                        </li>
                                        <li>
                                            <button @click="showDocumentMenu(Document, $event)">
                                                <!--SVG-->
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
                <DocumentForWriterList/>
            </div>
        </div>
    </div>
</template>
<script>
    import DocumentStateShow from "../components_for_document/DocumentStateShow.vue";
    import DocumentStateAction from '../components_for_document/DocumentStateAction.vue';
    import DocumentForWriterList from '../components_for_document/DocumentForWriterList.vue';
    import DocumentMenu from '../components_for_document/DocumentMenu.vue';
    import DotsBtn from '../svgs/DotsSVG.vue';
    import DocumentUploadView from '../components_for_document/DocumentUploadView.vue';
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
            DocumentStateShow,
            DocumentForWriterList,
            DocumentStateAction,
            DotsBtn,
            DocumentUploadView
        },
        data() {
            return {
                MenuDocument: {},
                OpenWritersDocument: false,
                FirstDocumentCheck: true,
                fileUploadCheck: false,
                isDragged: "",
                src: "",
                numPages: undefined
            }
        },
        methods: {
            //맨처음 입력된 문서인지 확인하는 함수.(문서들의 정렬을 이쁘게 하고자 있는 함수이며 큰 의미는 없습니다.)
            IsFirstDocument() {
                if (this.FirstDocumentCheck) {
                    this.FirstDocumentCheck = false;
                    return true;
                } else if (!this.FirstDocumentCheck) {
                    return false;
                }
            },
            //문서 오른쪽에 있는 ...버튼을 눌렀을때에 이벤트 처리를 돕는 함수.
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
            //편집화면으로 넘어가도록 돕는 함수.
            goEditScreen(Document) {
                if (Document.State === 1) {
                    this
                        .$router
                        .push({
                            //name: "EditPage로 가는 데이터",
                            path: '/EditView',
                            query: {
                                getDocumentData: Document
                            }
                        }
                    ).catch();
                }
            },
            //서버에서 넘겨준 PDF의 원래 가로값을 가지고와서 전역으로 사용할 수 있도록 돕는 함수입니다.
            saveOriginalWidth(responseData) {
                this
                    .$store
                    .commit("FORMAT_ORIGINAL_WIDTH"); //기존에 store에서 담고있을 원래 가로값을 초기화 시켜줍니다.
                for (let OW of responseData.pdf.original_width) {
                    this
                        .$store
                        .commit("SAVE_ORIGINAL_WIDTH", OW); //원래 가로값을 store에 저장합니다.
                }
            },
            //서버를 통해 읽은 모든 데이터를 store에 저장합니다.
            readAllObject(responseData) {
                //가지고 온 데이터에서
                this.readTextObject(responseData.project_object_texts); //텍스트들만 따로 처리.
                this.readCheckBoxObject(responseData.project_object_checkboxes); //체크박스만 따로 처리.
                this.readSignObject(responseData.project_object_signs); //사인값만 따로 처리.
            },
            //아래 모든 함수들은 데이터를 저장하는 과정입니다.
            readTextObject(project_object_texts) {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0]; // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
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
                    .OriginalWidth[0]; // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
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
                    .OriginalWidth[0]; // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
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
<template>
    <v-card class="mainCard overflow-hidden">
        <div class="UserHeader" v-if="this.$store.state.PDFInfo.PDFFileUploadCheck">
            <div class="navigation">
                <button @click="makeObject(STextObjectName , $event)" class="objectBtnStyle">
                    <ShortTextSVG/>
                    <p>짧은 글</p>
                </button>
                <button @click="makeObject(LTextObjectName, $event)" class="objectBtnStyle">
                    <LongTextSVG/>
                    <p>긴 글</p>
                </button>
                <button @click="makeObject(CheckBoxObjectName, $event)" class="objectBtnStyle">
                    <CheckBoxSVG/>
                    <p>체크박스</p>
                </button>
                <button @click="makeObject(SignObjectName, $event)" class="objectBtnStyle">
                    <SignSVG/>
                    <p>서명</p>
                </button>
                <button class="SaveEditPageButton" @click="SaveAllData">
                    완료
                </button>
                <button class="CloseEditPageButton" @click="CloseEditPage">
                    닫기
                </button>
            </div>
        </div>
        <div class="sideBar">
            <div v-if="this.$store.state.PDFInfo.PDFFileUploadCheck" class="ShowObjectInfo">
                <div class="objectInfo">
                    <h3 class="objectInfoText">오브젝트 리스트</h3>
                </div>
                <div class="objectList">
                    <ul>
                        <li v-if="this.$store.state.ShortTextObject.ShortTextDefineCheck">
                            <div style="width:100%; height: 28px;">
                                <ShortTextSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.$store.state.ShortTextObject.ShortTextArr.length}})</div>
                            </div>
                            <ol
                                style="width:100%;"
                                v-for="STextObject in this.$store.state.ShortTextObject.ShortTextArr"
                                :key="STextObject.id">
                                {{
                                    STextObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li v-if="this.$store.state.LongTextObject.LongTextDefineCheck">
                            <div style="width:100%; height: 28px;">
                                <LongTextSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.$store.state.LongTextObject.LongTextArr.length}})</div>
                            </div>
                            <ol
                                style="width:100%;"
                                v-for="LTextObject in this.$store.state.LongTextObject.LongTextArr"
                                :key="LTextObject.id">
                                {{
                                    LTextObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li v-if="this.$store.state.CheckBoxObject.CheckBoxDefineCheck">
                            <div style="width:100%; height: 28px;">
                                <CheckBoxSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.$store.state.CheckBoxObject.CheckBoxArr.length}})</div>
                            </div>
                            <ol
                                v-for="CheckBoxObject in this.$store.state.CheckBoxObject.CheckBoxArr"
                                :key="CheckBoxObject.id">
                                {{
                                    CheckBoxObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li v-if="this.$store.state.SignObject.SignDefineCheck">
                            <div style="width:100%; height: 28px;">
                                <SignSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.$store.state.SignObject.SignArr.length}})</div>
                            </div>
                            <ol
                                v-for="SignObject in this.$store.state.SignObject.SignArr"
                                :key="SignObject.id">
                                {{
                                    SignObject.title
                                }}
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else class="ShowDocumentInfo">
                <DocumentInfoSideBar/>
            </div>
        </div>
        <PDFUploader/>
        <!--id반영이 제대로 안되는 버그-->
        <div>
            <SignObject
                v-for="SignObject in this.$store.state.SignObject.SignArr"
                :key="SignObject.id"
                v-bind:getSOData="SignObject"
                v-bind:id="SignObject.htmlID"/>
        </div>
        <div>
            <CheckBoxObject
                v-for="CheckBoxObject in this.$store.state.CheckBoxObject.CheckBoxArr"
                :key="CheckBoxObject.id"
                v-bind:getCBData="CheckBoxObject"
                v-bind:id="CheckBoxObject.htmlID"/>
        </div>
        <div>
            <LongTextObject
                v-for="LTextObject in this.$store.state.LongTextObject.LongTextArr"
                :key="LTextObject.id"
                v-bind:getLTData="LTextObject"
                v-bind:id="LTextObject.htmlID"/>
        </div>
        <div>
            <ShortTextObject
                v-for="STextObject in this.$store.state.ShortTextObject.ShortTextArr"
                :key="STextObject.id"
                v-bind:getSTData="STextObject"
                v-bind:id="STextObject.htmlID"/>
        </div>
    </v-card>
</template>
<script>
    import SignObject from '../objects/SignObject.vue'
    import CheckBoxObject from '../objects/CheckBoxObject.vue'
    import LongTextObject from '../objects/LongTextObject.vue'
    import ShortTextObject from '../objects/ShortTextObject.vue'
    import PDFUploader from '../components/PDFComponent.vue';
    import ShortTextSVG from '../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../svgs/CheckBoxSVG.vue';
    import SignSVG from '../svgs/SignSVG.vue';
    import DocumentInfoSideBar from '../components/DocumentInfoSideBar.vue';
    export default {
        components: {
            DocumentInfoSideBar,
            CheckBoxSVG,
            SignSVG,
            ShortTextSVG,
            LongTextSVG,
            PDFUploader,
            SignObject,
            CheckBoxObject,
            LongTextObject,
            ShortTextObject
        },
        beforeDestroy() {
            this.$store.state.PDFInfo.PDFTitle = "";
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
        mounted() {
            this
                .$store
                .commit("CLOSE_EDIT_PAGE");
        },
        data() {
            return {
                //오브젝트 관련 데이터 짧은글
                STextObjectName: "ShortTextObjectArea",
                STextObjectID: 1,

                //긴글
                LTextObjectName: "LongTextObjectArea",
                LTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "SignObjectArea",
                SignObjectID: 1
            }
        },
        methods: {
            CloseEditPage(){
                this.$store.commit("CLOSE_EDIT_PAGE");
                this.$store.commit("FORMAT_ALL_CHECKBOX_OBJECTS");
                this.$store.commit("FORMAT_ALL_SHORTTEXT_OBJECTS");
                this.$store.commit("FORMAT_ALL_LONGTEXT_OBJECTS");
                this.$store.commit("FORMAT_ALL_SIGN_OBJECTS");
            },
            SaveAllData(){
                let SendJsonFile = [];
                let CheckBoxArray = this.$store.state.CheckBoxObject.CheckBoxArr;
                let ShortTextArray = this.$store.state.ShortTextObject.ShortTextArr;
                let LongTextArray = this.$store.state.LongTextObject.LongTextArr;
                let SignArray = this.$store.state.SignObject.SignArr;
                SendJsonFile.push(CheckBoxArray);
                SendJsonFile.push(ShortTextArray);
                SendJsonFile.push(LongTextArray);
                SendJsonFile.push(SignArray);
                const UsersDocumentObjects = JSON.stringify(SendJsonFile);
                console.log(UsersDocumentObjects);
            },
            //오브젝트를 형성하는 과정.
            makeObject(objectID, event) {
                //forTest
                console.log(this.$store.state.PDFInfo.PDFPageInfo);
                for (let i = 1; i <= this.$store.state.PDFInfo.PDFPageInfo; i++) {
                    const PDF_Pages = document.getElementById("page" + String(i));
                    PDF_Pages.style.position = "relative";
                    console.log("page" + String(i));
                    let computed_PDF_Page_Style = window.getComputedStyle(PDF_Pages);
                    console.log(computed_PDF_Page_Style.height)
                }
                //MainSource
                const ThisWindow = document.getElementById("drawer");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                let offsetX = event.pageX - ThisWindow
                    .getBoundingClientRect()
                    .left;
                let offsetY = event.pageY - parseInt(computedheaderStyle.height, 10);
                this.pushObjectInArray(objectID, offsetX, offsetY);
            },
            //아직 완성못한 함수
            /*
            checkWhere_Object_Into_PDFPage(getElement) {
                let PageY = [];
                let Y_Num = 0;
                let computed_Object_Style = window.getComputedStyle(getElement);
                for (let i = 1; i <= this.$store.state.PDFInfo.PDFPageInfo; i++) {
                    const PDF_Pages = document.getElementById("page" + String(i));
                    let computed_PDF_Page_Style = window.getComputedStyle(PDF_Pages);
                    Y_Num = Y_Num + parseInt(computed_PDF_Page_Style.height, 10)
                    PageY.push(Y_Num);
                }
                for (let i = 1; i <= this.$store.state.PDFInfo.PDFPageInfo; i++) {
                    const PDF_Pages = document.getElementById("page" + String(i));
                    if (parseInt(computed_Object_Style.top, 10) >= PageY[i]) {
                        PDF_Pages.style.border = "3px dashed #4c384a";
                    }
                    PDF_Pages.addEventListener("dragover", function () {
                        PDF_Pages.style.border = "3px dashed #4c384a";
                    })
                    PDF_Pages.addEventListener("mouseout", function () {
                        PDF_Pages.style.border = "0px";
                    });
                }
            },
            */
            //배열내에 해당 오브젝트를 제거.
            pushObjectInArray(objectID, x, y) {
                if (objectID === "ShortTextObjectArea") {
                    this.$store.state.ShortTextObject.ShortText.htmlID = objectID;
                    this.$store.state.ShortTextObject.ShortText.title = "짧은 글_";
                    this.$store.state.ShortTextObject.ShortText.width = 100;
                    this.$store.state.ShortTextObject.ShortText.height = 30;
                    this.$store.state.ShortTextObject.ShortText.x = x;
                    this.$store.state.ShortTextObject.ShortText.y = y;
                    this.$store.state.ShortTextObject.ShortText.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SHORTTEXT_OBJECT", this.$store.state.ShortTextObject.ShortText);
                    console.log(this.$store.state.ShortTextObject.ShortTextArr)
                    this.STextObjectID++;
                } else if (objectID === "LongTextObjectArea") {
                    this.$store.state.LongTextObject.LongText.htmlID = objectID;
                    this.$store.state.LongTextObject.LongText.title = "긴 글_";
                    this.$store.state.LongTextObject.LongText.width = 100;
                    this.$store.state.LongTextObject.LongText.height = 100;
                    this.$store.state.LongTextObject.LongText.x = x;
                    this.$store.state.LongTextObject.LongText.y = y;
                    this.$store.state.LongTextObject.LongText.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_LONGTEXT_OBJECT", this.$store.state.LongTextObject.LongText);
                    this.LTextObjectID++;
                } else if (objectID === "CheckBoxObjectArea") {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = objectID;
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_";
                    this.$store.state.CheckBoxObject.CheckBox.width = 30;
                    this.$store.state.CheckBoxObject.CheckBox.height = 30;
                    this.$store.state.CheckBoxObject.CheckBox.x = x;
                    this.$store.state.CheckBoxObject.CheckBox.y = y;
                    this.$store.state.CheckBoxObject.CheckBox.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.$store.state.CheckBoxObject.CheckBox);
                    this.CheckBoxObjectID++;
                } else if (objectID === "SignObjectArea") {
                    this.$store.state.SignObject.Sign.htmlID = objectID;
                    this.$store.state.SignObject.Sign.title = "사인_";
                    this.$store.state.SignObject.Sign.width = 100;
                    this.$store.state.SignObject.Sign.height = 100;
                    this.$store.state.SignObject.Sign.x = x;
                    this.$store.state.SignObject.Sign.y = y;
                    this.$store.state.SignObject.Sign.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.$store.state.SignObject.Sign);
                    this.SignObjectID++;
                }
            }
        }
    }
</script>
<style lang="scss">
    .SaveEditPageButton{
        float: right;
        width: 82px;
        height: 48px;
        /* gray_05 */
        background: #767676;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }
    .CloseEditPageButton{
        width: 82px;
        height: 48px;
        float: right;
        color: #C4C4C4;
    }
    #textForm::after {
        content: attr(data-content);
    }
    ul {
        list-style: none;
    }
    .objectBtnStyle {
        margin-left: 2%;
        margin-right: 2%;
    }
    .mainCard {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
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
    .UserHeader {
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
</style>
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
            </div>
        </div>
        <div class="sideBar">
            <div v-if="this.$store.state.PDFInfo.PDFFileUploadCheck" class="ShowObjectInfo">
                <div class="objectInfo">
                    <h3 class="objectInfoText">오브젝트 리스트</h3>
                </div>
                <div class="objectList">
                    <ul>
                        <li v-if="this.STextObjectCheck">
                            <div style="width:100%; height: 28px;">
                                <ShortTextSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.STextObjectArray.length}})</div>
                            </div>
                            <ol
                                style="width:100%;"
                                v-for="STextObject in STextObjectArray"
                                :key="STextObject.id">
                                {{
                                    STextObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li v-if="this.LTextObjectCheck">
                            <div style="width:100%; height: 28px;">
                                <LongTextSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.LTextObjectArray.length}})</div>
                            </div>
                            <ol
                                style="width:100%;"
                                v-for="LTextObject in LTextObjectArray"
                                :key="LTextObject.id">
                                {{
                                    LTextObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li v-if="this.CheckBoxObjectCheck">
                            <div style="width:100%; height: 28px;">
                                <CheckBoxSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.CheckBoxObjectArray.length}})</div>
                            </div>
                            <ol v-for="CheckBoxObject in CheckBoxObjectArray" :key="CheckBoxObject.id">
                                {{
                                    CheckBoxObject.title
                                }}
                            </ol>
                        </li>
                        <br/>
                        <br/>
                        <br/>
                        <li v-if="this.SignObjectCheck">
                            <div style="width:100%; height: 28px;">
                                <SignSVG style="float: left" height="15%"/>
                                <div style="float: left">({{this.SignObjectArray.length}})</div>
                            </div>
                            <ol v-for="SignObject in SignObjectArray" :key="SignObject.id">
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
            <SignObject v-for="SignObject in this.SignObjectArray" :key="SignObject.id" v-bind:getSOData="SignObject" v-bind:id="SignObject.htmlID"/>
        </div>
        <div>
            <CheckBoxObject v-for="CheckBoxObject in this.CheckBoxObjectArray" :key="CheckBoxObject.id" v-bind:getCBData="CheckBoxObject" v-bind:id="CheckBoxObject.htmlID"/>
        </div>
        <div>
            <LongTextObject v-for="LTextObject in this.LTextObjectArray" :key="LTextObject.id" v-bind:getLTData="LTextObject" v-bind:id="LTextObject.htmlID"/>
        </div>
        <div>
            <ShortTextObject v-for="STextObject in this.STextObjectArray" :key="STextObject.id" v-bind:getSTData="STextObject" v-bind:id="STextObject.htmlID"/>
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
    import DocumentInfoSideBar from '../components/DocumentInfoSideBar.vue'
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
        },
        mounted() {
            this
                .$store
                .commit("SET_PDF_FILE_UPLOAD_CHECK_FALSE");
        },
        data() {
            return {
                //오브젝트 관련 데이터 짧은글
                STextObjectName: "ShortTextObjectArea",
                STextObjectArray: [],
                STextObjectCheck: false,
                STextObjectID: 1,

                //긴글
                LTextObjectName: "LongTextObjectArea",
                LTextObjectArray: [],
                LTextObjectCheck: false,
                LTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectArray: [],
                CheckBoxObjectCheck: false,
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "SignObjectArea",
                SignObjectArray: [],
                SignObjectCheck: false,
                SignObjectID: 1
            }
        },
        methods: {
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
            popObjectInArray(ElementID) {
                if (ElementID.includes("ShortTextObjectArea")) {
                    this.STextObjectArray = this
                        .STextObjectArray
                        .filter(e => e.id !== ElementID);
                } else if (ElementID.includes("LongTextObjectArea")) {
                    this.LTextObjectArray = this
                        .LTextObjectArray
                        .filter(e => e.id !== ElementID);
                } else if (ElementID.includes("CheckBoxObjectArea")) {
                    this.CheckBoxObjectArray = this
                        .CheckBoxObjectArray
                        .filter(e => e.id !== ElementID);
                } else if (ElementID.includes("SignObjectArea")) {
                    this.SignObjectArray = this
                        .SignObjectArray
                        .filter(e => e.id !== ElementID);
                }
            },
            findObjectInArray(ElementID) {
                if (ElementID.includes("ShortTextObjectArea")) {
                    return this
                        .STextObjectArray
                        .find(object => object.id === ElementID);
                } else if (ElementID.includes("LongTextObjectArea")) {
                    return this
                        .LTextObjectArray
                        .find(object => object.id === ElementID);
                } else if (ElementID.includes("CheckBoxObjectArea")) {
                    return this
                        .CheckBoxObjectArray
                        .find(object => object.id === ElementID);
                } else if (ElementID.includes("SignObjectArea")) {
                    return this
                        .SignObjectArray
                        .find(object => object.id === ElementID);
                }
            },
            pushObjectInArray(objectID, x, y) {
                let pushObject = {
                    htmlID: "",
                    id: "",
                    title: "",
                    width: "",
                    height: "",
                    x: "",
                    y: ""
                }
                pushObject.width = 100;
                pushObject.height = 100;
                pushObject.x = x;
                pushObject.y = y;
                if (objectID === "ShortTextObjectArea") {
                    pushObject.id = this.STextObjectID;
                    pushObject.htmlID = objectID + String(this.STextObjectID);
                    pushObject.title = "짧은 글_" + String(this.STextObjectID);
                    this
                        .STextObjectArray
                        .push(pushObject);
                    this.STextObjectCheck = true;
                    console.log(this.STextObjectArray);
                    this.STextObjectID++;
                } else if (objectID === "LongTextObjectArea") {
                    pushObject.id = this.LTextObjectID;
                    pushObject.htmlID = objectID + String(this.LTextObjectID);
                    pushObject.title = "긴 글_" + String(this.LTextObjectID)
                    this
                        .LTextObjectArray
                        .push(pushObject);
                    this.LTextObjectCheck = true;
                    console.log(this.LTextObjectArray);
                    this.LTextObjectID++;
                } else if (objectID === "CheckBoxObjectArea") {
                    pushObject.id = this.CheckBoxObjectID;
                    pushObject.htmlID = objectID + String(this.CheckBoxObjectID);
                    pushObject.title = "체크박스_" + String(this.CheckBoxObjectID);
                    this
                        .CheckBoxObjectArray
                        .push(pushObject);
                    this.CheckBoxObjectCheck = true;
                    console.log(this.CheckBoxObjectArray);
                    this.CheckBoxObjectID++;
                } else if (objectID === "SignObjectArea") {
                    pushObject.id = this.SignObjectID;
                    pushObject.htmlID = objectID + String(this.SignObjectID);
                    pushObject.title = "사인_" + String(this.SignObjectID);
                    this
                        .SignObjectArray
                        .push(pushObject);
                    this.SignObjectCheck = true;
                    console.log(this.SignObjectArray);
                    this.SignObjectID++;
                }
            },
            DeleteBtnStyleSetting(DeleteBtn, computed_Object_Style, currentX, currentY) {
                let stringHTML = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">'+
                '<path d="M9.51123 0.185547L5.37049 4.32629L1.22975 0.185547L0.185303 1.22999L4.32604 5.37073L0.185303 9.51147L1.229'+
                '75 10.5559L5.37049 6.41518L9.51123 10.5559L10.5557 9.51147L6.41493 5.37073L10.5557 1.22999L9.51123 0.185547Z" fill="white"/></svg>';
                DeleteBtn.style.width = "20px";
                DeleteBtn.style.height = "20px";
                DeleteBtn.style.borderRadius = "50%"
                DeleteBtn.style.left = currentX + parseInt(computed_Object_Style.width, 10) / 2 + "px";
                DeleteBtn.style.top = currentY - parseInt(computed_Object_Style.height, 10) / 2 + "px";
                DeleteBtn.style.zIndex = 4;
                DeleteBtn.style.backgroundColor = "#767676"
                DeleteBtn.style.position = "absolute";
                DeleteBtn.innerHTML = stringHTML;
            }
        }
    }
</script>
<style lang="scss">
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
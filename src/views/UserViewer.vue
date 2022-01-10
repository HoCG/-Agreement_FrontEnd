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
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import PDFUploader from '../components/PDFComponent.vue';
    import ShortTextSVG from '../components/ShortTextSvg.vue';
    import LongTextSVG from '../components/LongTextSvg.vue';
    import SignDialog from '../components/SignDialog.vue';
    import CheckBoxSVG from '../components/CheckBoxSVG.vue';
    import SignSVG from '../components/SignSVG.vue';
    import DocumentInfoSideBar from '../components/DocumentInfoSideBar.vue'
    export default {
        components: {
            DocumentInfoSideBar,
            CheckBoxSVG,
            SignSVG,
            SignDialog,
            ShortTextSVG,
            LongTextSVG,
            PDFUploader
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
                const NewElementDiv = document.createElement("div");
                const ThisWindow = document.getElementById("drawer");
                const headerWindow = document.getElementsByTagName("header")[0];
                const ElementTitle = document.createElement("p");
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                ElementTitle.setAttribute("id", "textForm");
                ElementTitle.style.zIndex = 10;
                ElementTitle.style.width = "100%";
                ElementTitle.style.height = "25px";
                ElementTitle.style.bottom = "100%";
                ElementTitle.style.position = "absolute";
                NewElementDiv.setAttribute("class", objectID);
                NewElementDiv.setAttribute("width", 100);
                NewElementDiv.setAttribute("height", 100);
                let offsetX = event.pageX - ThisWindow
                    .getBoundingClientRect()
                    .left - parseInt(NewElementDiv.getAttribute("width"), 10) / 2;
                let offsetY = event.pageY - parseInt(NewElementDiv.getAttribute("height"), 10) / 2 - parseInt(
                    computedheaderStyle.height,
                    10
                );
                NewElementDiv.style.left = offsetX + "px";
                NewElementDiv.style.top = offsetY + "px";
                this.pushObjectInArray(offsetX, offsetY, objectID, ElementTitle, NewElementDiv);
                //이벤트 넣기 this.makingDragEvent(NewElementDiv);
                this.makingFirstClickObject(NewElementDiv);
                NewElementDiv.append(ElementTitle);
                ThisWindow.append(NewElementDiv);
            },
            //아직 완성못한 함수
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
            //PDF페이지중에 어디에 속해있는지를 파악하고 해당 PDF에 오브젝트를 집어넣습니다.
            appendIntoPDFPage(getElement, currentX, currentY) {
                let getElement_in_Array = this.findObjectInArray(getElement.getAttribute("id"));
                let appendY1 = 0;
                let appendY2 = 0;
                for (let i = 1; i <= this.$store.state.PDFInfo.PDFPageInfo; i++) {
                    const PDF_Pages = document.getElementById("page" + String(i));
                    PDF_Pages.style.position = "relative";
                    let computed_PDF_Page_Style = window.getComputedStyle(PDF_Pages);
                    let computed_Object_Style = window.getComputedStyle(getElement);
                    appendY2 = appendY2 + parseInt(computed_PDF_Page_Style.height, 10);
                    if (currentY >= appendY1 && currentY <= appendY2) {
                        getElement.style.top = currentY - appendY1 - parseInt(
                            computed_Object_Style.height,
                            10
                        ) / 2 + "px";
                        getElement_in_Array.y = currentY - appendY1 - parseInt(
                            computed_Object_Style.height,
                            10
                        ) / 2;
                        getElement_in_Array.x = currentX
                        PDF_Pages.append(getElement);
                        break;
                    } else {
                        appendY1 = appendY2;
                    }
                }
            },
            //아래부터는 메인 이벤트 모음입니다. 먼저 !초기! 클릭시에 오브젝트 생성.
            makingFirstClickObject(getElement) {
                getElement.style.position = 'absolute';
                getElement.style.zIndex = 6;
                let currentX = 0;
                let currentY = 0;
                const ThisWindow = document.getElementById("drawer");
                const containerWindow = document.getElementById("container");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedContainerStyle = window.getComputedStyle(containerWindow);
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                let self = this;
                function moveAt(currentX, currentY) {
                    getElement.style.left = currentX - getElement
                        .getBoundingClientRect()
                        .width / 2 + 'px';
                    getElement.style.top = currentY - getElement
                        .getBoundingClientRect()
                        .height / 2 + 'px';
                }
                function onMouseMove(event) {
                    currentX = event.pageX - ThisWindow
                        .getBoundingClientRect()
                        .left;
                    //패딩값만큼 빼고 계산하는 로직을 추가했다.
                    currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                        computedheaderStyle.height,
                        10
                    );
                    // 페이지 영역에 있는지 확인하는 함수이지만... 잘동작하지 않으므로 일단 보류.
                    // self.checkWhere_Object_Into_PDFPage(getElement);
                    if (currentX < 0) {
                        currentX = 0;
                    }
                    if (currentY < 0) {
                        currentY = 0;
                    }
                    moveAt(currentX, currentY);
                }
                getElement.addEventListener('mousemove', onMouseMove);
                getElement.addEventListener('click', function () {
                    getElement.removeEventListener('mousemove', onMouseMove);
                    getElement.removeEventListener('mouseout', onMouseMove);
                    getElement.style.zIndex = 4;
                    //오브젝트를 해당위치에 PDFPage에 둔다.
                    self.appendIntoPDFPage(getElement, currentX, currentY);
                    //사이즈 재조정 이벤트를 준다.
                    self.makingResizeEvent(getElement);
                    //드래그 이벤트를 준다.
                    self.makingDragEvent(getElement);
                });
                getElement.addEventListener('mouseout', onMouseMove);
            },
            //오브젝트 배치이후 드래그시에 활성화되는 이벤트.
            makingDragEvent(getElement) {
                let currentX = 0;
                let currentY = 0;
                let self = this;
                //self.showObjectMenu(); getElement.removeEventListener('mousemove')
                getElement.onmousedown = function (event) {
                    event.stopPropagation();
                    self.DragDetailEvent(currentX, currentY, getElement, event)
                };
                getElement.ondragstart = function () {
                    return false;
                }
            },
            DragDetailEvent(currentX, currentY, getElement, event) {
                getElement.style.position = 'absolute';
                let self = this;
                getElement.style.zIndex = 4;
                let ElementID = getElement.getAttribute("id");
                let WantDeleteBtn = document.getElementById(ElementID + "Btn");
                if (WantDeleteBtn !== null) {
                    WantDeleteBtn.remove();
                }
                //각종 셋팅값들
                let DeleteBtn = document.createElement("button");
                const ThisWindow = document.getElementById("drawer");
                const containerWindow = document.getElementById("container");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedContainerStyle = window.getComputedStyle(containerWindow);
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                //초기 이동을 고려함.
                currentX = event.pageX - ThisWindow
                    .getBoundingClientRect()
                    .left;
                currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                    computedheaderStyle.height,
                    10
                );
                moveAt(currentX, currentY);
                ThisWindow.append(getElement);
                //해당위치로 오브젝트가 이동하도록 하는 함수입니다.
                function moveAt(currentX, currentY) {
                    let computed_Object_Style = window.getComputedStyle(getElement);
                    DeleteBtn.remove();
                    //버튼을 삭제했다가 다시 그려주는 형태 >> div를 따라다니는 버튼의 형태를 잡아주기 위해서.
                    DeleteBtn = document.createElement("button");
                    DeleteBtn.setAttribute("id", ElementID + "Btn");
                    self.DeleteBtnStyleSetting(
                        DeleteBtn,
                        computed_Object_Style,
                        currentX,
                        currentY
                    );
                    let selfSecond = self;
                    DeleteBtn.addEventListener("click", function () {
                        getElement.remove();
                        getElement.getAttribute("id");
                        selfSecond.popObjectInArray(getElement.getAttribute("id"))
                        let WantDeleteBtn = document.getElementById(ElementID + "Btn");
                        WantDeleteBtn.remove();
                    });
                    ThisWindow.append(DeleteBtn);
                    getElement.style.left = currentX - getElement
                        .getBoundingClientRect()
                        .width / 2 + 'px';
                    getElement.style.top = currentY - getElement
                        .getBoundingClientRect()
                        .height / 2 + 'px';
                }
                //마우스를 움직일때 활성화되는 함수입니다.
                function onMouseMove(event) {
                    currentX = event.pageX - ThisWindow
                        .getBoundingClientRect()
                        .left;
                    //패딩값만큼 빼고 계산하는 로직을 추가했다.
                    currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                        computedheaderStyle.height,
                        10
                    );
                    if (currentX < 0) {
                        currentX = 0;
                    }
                    if (currentY < 0) {
                        currentY = 0;
                    }
                    moveAt(currentX, currentY);
                }
                // mousemove로 오브젝트를 움직입니다.
                getElement.addEventListener('mousemove', onMouseMove);
                // 오브젝트를 드롭하고, 불필요한 핸들러를 제거합니다.
                getElement.addEventListener('mouseup', function () {
                    getElement.removeEventListener('mousemove', onMouseMove);
                    self.appendIntoPDFPage(getElement, currentX, currentY);
                });
                //클릭시에 간단하게 메뉴들이 나올수 있는 이벤트를 만들어야 합니다.
            },
            //완성시켜야하는 함수. 클릭시에 오브젝트 스타일 선택 메뉴가 나오도록.
            showObjectMenu() {},
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
            pushObjectInArray(offsetX, offsetY, objectID, ElementTitle, NewElementDiv) {
                let pushObject = {
                    id: "",
                    title: "",
                    width: "",
                    height: "",
                    x: "",
                    y: ""
                }
                pushObject.width = 100;
                pushObject.height = 100;
                pushObject.x = offsetX;
                pushObject.y = offsetY;
                //어떤 오브젝트인지를 검출해냅니다.
                if (objectID === "ShortTextObjectArea") {
                    ElementTitle.setAttribute("data-content", "짧은 글_" + String(this.STextObjectID));
                    NewElementDiv.setAttribute("id", objectID + String(this.STextObjectID));
                    pushObject.id = objectID + String(this.STextObjectID);
                    pushObject.title = "짧은 글_" + String(this.STextObjectID);
                    this
                        .STextObjectArray
                        .push(pushObject);
                    this.STextObjectCheck = true;
                    console.log(this.STextObjectArray);
                    this.STextObjectID++;
                } else if (objectID === "LongTextObjectArea") {
                    ElementTitle.setAttribute("data-content", "긴 글_" + String(this.LTextObjectID));
                    NewElementDiv.setAttribute("id", objectID + String(this.LTextObjectID));
                    pushObject.id = objectID + String(this.LTextObjectID);
                    pushObject.title = "긴 글_" + String(this.LTextObjectID)
                    this
                        .LTextObjectArray
                        .push(pushObject);
                    this.LTextObjectCheck = true;
                    console.log(this.LTextObjectArray);
                    this.LTextObjectID++;
                } else if (objectID === "CheckBoxObjectArea") {
                    ElementTitle.setAttribute(
                        "data-content",
                        "체크박스" + String(this.CheckBoxObjectID)
                    );
                    NewElementDiv.setAttribute("id", objectID + String(this.CheckBoxObjectID));
                    pushObject.id = objectID + String(this.CheckBoxObjectID);
                    pushObject.title = "체크박스_" + String(this.CheckBoxObjectID);
                    this
                        .CheckBoxObjectArray
                        .push(pushObject);
                    this.CheckBoxObjectCheck = true;
                    console.log(this.CheckBoxObjectArray);
                    this.CheckBoxObjectID++;
                } else if (objectID === "SignObjectArea") {
                    ElementTitle.setAttribute("data-content", "사인" + String(this.SignObjectID));
                    NewElementDiv.setAttribute("id", objectID + String(this.SignObjectID));
                    pushObject.id = objectID + String(this.SignObjectID);
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
                DeleteBtn.style.width = "50px";
                DeleteBtn.style.height = "50px";
                DeleteBtn.style.left = currentX + parseInt(computed_Object_Style.width, 10) / 2 + "px";
                DeleteBtn.style.top = currentY - parseInt(computed_Object_Style.height, 10) / 2 + "px";
                DeleteBtn.style.zIndex = 4;
                DeleteBtn.style.backgroundColor = "red"
                DeleteBtn.style.position = "absolute";
            },
            //크기조절 메소드.
            makingResizeEvent(getElement) {
                let ElementID = getElement.getAttribute("id");
                let resizer_R = document.createElement("div");
                resizer_R.setAttribute("class", "resizer resizer-r");
                let resizer_B = document.createElement("div");
                resizer_B.setAttribute("class", "resizer resizer-b");
                //getElement.style.position = "relative";
                getElement.append(resizer_R);
                getElement.append(resizer_B);
                // The current position of mouse
                let x = 0;
                let y = 0;

                // The dimension of the element
                let w = 0;
                let h = 0;

                //
                //let top = 0;
                let left = 0;
                const mouseDownHandler = function (e) {
                    e.stopPropagation();
                    // Get the current mouse position
                    x = e.clientX;
                    y = e.clientY;
                    let Element_DeleteBtn = document.getElementById(ElementID + "Btn");
                    if(Element_DeleteBtn !== null){
                        let DeleteBtnstyle = window.getComputedStyle(Element_DeleteBtn);
                        left = parseInt(DeleteBtnstyle.left, 10);
                        console.log(parseInt(DeleteBtnstyle.left, 10));
                    }
                    const styles = window.getComputedStyle(getElement);
                    w = parseInt(styles.width, 10);
                    h = parseInt(styles.height, 10);

                    // Attach the listeners to `document`
                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler);
                };

                const mouseMoveHandler = function (e) {
                    // How far the mouse has been moved
                    const dx = e.clientX - x;
                    const dy = e.clientY - y;
                    let Element_DeleteBtn = document.getElementById(ElementID + "Btn");
                    // Adjust the dimension of element
                    getElement.style.width = `${w + dx}px`;
                    getElement.style.height = `${h + dy}px`;
                    if(Element_DeleteBtn !== null){
                        Element_DeleteBtn.style.left = `${left + dx}px`;
                    }
                };

                const mouseUpHandler = function () {
                    // Remove the handlers of `mousemove` and `mouseup`
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);
                };

                // Query all resizers
                const resizers = getElement.querySelectorAll('.resizer');

                // Loop over them
                []
                    .forEach
                    .call(resizers, function (resizer) {
                        resizer.addEventListener('mousedown', mouseDownHandler);
                    });
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
    .resizer {
        position: absolute;
    }
    /* Placed at the right side */
    .resizer-r {
        z-index: 2000;
        position: absolute;
        cursor: col-resize;
        height: 100%;
        right: 0;
        top: 0;
        width: 5px;
    }
    /* Placed at the bottom side */
    .resizer-b {
        z-index: 2000;
        position: absolute;
        bottom: 0;
        cursor: row-resize;
        height: 5px;
        left: 0;
        width: 100%;
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
    .FileUploadArea {
        float: right;
        left: 200px;
        text-align: center;
        justify-content: center;
        min-height: 500px;
        width: 100%;
    }
    .file-upload {
        width: 70%;
        height: 500px;
        float: right;
        text-align: center;
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
            text-align: center;
            justify-content: center;
            padding: 20px;
            width: 100%;
            height: 500px;
            margin: 0 auto;
            box-shadow: 0 0.625rem 1.25rem #0000001a;
            border: 3px dashed #4c384a;
            border-radius: 20px;
        }
        &-input {
            display: none;
        }
        &-text {
            position: relative;
            top: 50%;
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
    .ShortTextObjectArea {
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
        width: 100px;
        height: 100px;
    }
    .LongTextObjectArea {
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
        width: 100px;
        height: 100px;
    }
    .CheckBoxObjectArea {
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
        width: 100px;
        height: 100px;
    }
    .SignObjectArea {
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
        width: 100px;
        height: 100px;
    }
</style>
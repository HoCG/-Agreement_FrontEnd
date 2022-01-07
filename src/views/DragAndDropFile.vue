<template>
    <v-card class="mainCard overflow-hidden">
        <div class="UserHeader" v-if="fileUploadCheck">
            <div class="navigation">
                <button @click="makeObject(STextObjectName , $event)" class="objectBtnStyle">
                    <svg
                        width="15"
                        height="21"
                        viewBox="0 0 15 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect y="1" width="14.8529" height="20" fill="url(#pattern0)"/>
                        <defs>
                            <pattern
                                id="pattern0"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1">
                                <use
                                    xlink:href="#image0_82_85"
                                    transform="translate(-0.0610562) scale(0.00393724 0.00292398)"/>
                            </pattern>
                            <image
                                id="image0_82_85"
                                width="285"
                                height="342"
                                xlink:href="data:image/png;base64,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"/>
                        </defs>
                    </svg>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <line
                            x1="0.853027"
                            y1="1.5"
                            x2="15.706"
                            y2="1.5"
                            stroke="#5C5C5C"
                            stroke-width="2"/>
                    </svg>
                    <p>짧은 글</p>
                </button>
                <button @click="makeObject(LTextObjectName, $event)" class="objectBtnStyle">
                    <svg
                        width="15"
                        height="21"
                        viewBox="0 0 15 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect y="1" width="14.8529" height="20" fill="url(#pattern0)"/>
                        <defs>
                            <pattern
                                id="pattern0"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1">
                                <use
                                    xlink:href="#image0_82_85"
                                    transform="translate(-0.0610562) scale(0.00393724 0.00292398)"/>
                            </pattern>
                            <image
                                id="image0_82_85"
                                width="285"
                                height="342"
                                xlink:href="data:image/png;base64,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"/>
                        </defs>
                    </svg>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <line
                            x1="0.853027"
                            y1="14"
                            x2="15.706"
                            y2="14"
                            stroke="#5C5C5C"
                            stroke-width="2"/>
                        <line
                            x1="0.853027"
                            y1="8"
                            x2="15.706"
                            y2="8"
                            stroke="#5C5C5C"
                            stroke-width="2"/>
                        <line
                            x1="0.853027"
                            y1="1.5"
                            x2="15.706"
                            y2="1.5"
                            stroke="#5C5C5C"
                            stroke-width="2"/>
                    </svg>
                    <p>긴 글</p>
                </button>
                <button @click="makeObject(CheckBoxObjectName, $event)" class="objectBtnStyle">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9286 18.5H3.07143C1.65127 18.5 0.5 17.3487 0.5 15.9286V3.07143C0.5 1.65127 1.65127 0.5 3.07143 0.5H15.9286C17.3487 0.5 18.5 1.65127 18.5 3.07143V15.9286C18.5 17.3487 17.3487 18.5 15.9286 18.5ZM3.07143 3.07143V15.9286H15.9286V3.07143H3.07143ZM8.21429 13.8226L4.74286 10.4193L6.54286 8.58071L8.21429 10.2149L12.4571 6.01443L14.2571 7.84271L8.21429 13.8213V13.8226Z" fill="#5C5C5C"/>
                    </svg>
                    <p>체크박스</p>
                </button>
                <button @click="makeObject(SignObjectName, $event)" class="objectBtnStyle">
                    <svg width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 21.5C11.9023 15.2071 20.664 -2.24755 11.7925 2.22375C2.92095 6.69505 3.03083 20.0923 8.3751 20.5064C13.7194 20.9204 26.3135 6.32027 19.2068 10.3141C15.4996 12.3974 12.1708 19.9458 16.4255 20.5064C18.5851 20.7909 21.6702 20.0817 30 15.5905" stroke="#5C5C5C" stroke-width="2"/>
                    </svg>
                    <p>서명</p>
                </button>
            </div>
        </div>
        <div class="sideBar">
            <div v-if="fileUploadCheck" class="ShowObjectInfo">
                <div class="objectInfo">
                    <h3 class="objectInfoText">오브젝트 리스트</h3>
                </div>
                <div class="objectList">
                    <ul>
                        <li v-if="this.STextObjectCheck">
                            <svg
                                width="15"
                                height="21"
                                viewBox="0 0 15 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                <rect y="1" width="14.8529" height="20" fill="url(#pattern0)"/>
                                <defs>
                                    <pattern
                                        id="pattern0"
                                        patternContentUnits="objectBoundingBox"
                                        width="1"
                                        height="1">
                                        <use
                                            xlink:href="#image0_82_85"
                                            transform="translate(-0.0610562) scale(0.00393724 0.00292398)"/>
                                    </pattern>
                                    <image
                                        id="image0_82_85"
                                        width="285"
                                        height="342"
                                        xlink:href="data:image/png;base64,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"/>
                                </defs>
                            </svg>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 3"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <line
                                    x1="0.853027"
                                    y1="1.5"
                                    x2="15.706"
                                    y2="1.5"
                                    stroke="#5C5C5C"
                                    stroke-width="2"/>
                            </svg>
                            <ol v-for="STextObject in STextObjectArray" :key="STextObject.id">
                                {{
                                    STextObject.id
                                }}
                            </ol>
                        </li>
                        <br>
                        <br>
                        <br>
                        <li v-if="this.LTextObjectCheck"> 
                            <svg
                                width="15"
                                height="21"
                                viewBox="0 0 15 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                <rect y="1" width="14.8529" height="20" fill="url(#pattern0)"/>
                                <defs>
                                    <pattern
                                        id="pattern0"
                                        patternContentUnits="objectBoundingBox"
                                        width="1"
                                        height="1">
                                        <use
                                            xlink:href="#image0_82_85"
                                            transform="translate(-0.0610562) scale(0.00393724 0.00292398)"/>
                                    </pattern>
                                    <image
                                        id="image0_82_85"
                                        width="285"
                                        height="342"
                                        xlink:href="data:image/png;base64,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"/>
                                </defs>
                            </svg>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <line
                                    x1="0.853027"
                                    y1="14"
                                    x2="15.706"
                                    y2="14"
                                    stroke="#5C5C5C"
                                    stroke-width="2"/>
                                <line
                                    x1="0.853027"
                                    y1="8"
                                    x2="15.706"
                                    y2="8"
                                    stroke="#5C5C5C"
                                    stroke-width="2"/>
                                <line
                                    x1="0.853027"
                                    y1="1.5"
                                    x2="15.706"
                                    y2="1.5"
                                    stroke="#5C5C5C"
                                    stroke-width="2"/>
                            </svg>
                            <ol v-for="LTextObject in LTextObjectArray" :key="LTextObject.id">
                                {{
                                    LTextObject.id
                                }}
                            </ol>
                        </li>
                        <br>
                        <br>
                        <br>
                        <li v-if="this.CheckBoxObjectCheck">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.9286 18.5H3.07143C1.65127 18.5 0.5 17.3487 0.5 15.9286V3.07143C0.5 1.65127 1.65127 0.5 3.07143 0.5H15.9286C17.3487 0.5 18.5 1.65127 18.5 3.07143V15.9286C18.5 17.3487 17.3487 18.5 15.9286 18.5ZM3.07143 3.07143V15.9286H15.9286V3.07143H3.07143ZM8.21429 13.8226L4.74286 10.4193L6.54286 8.58071L8.21429 10.2149L12.4571 6.01443L14.2571 7.84271L8.21429 13.8213V13.8226Z" fill="#5C5C5C"/>
                            </svg>
                            <ol v-for="CheckBoxObject in CheckBoxObjectArray" :key="CheckBoxObject.id">
                                {{
                                    CheckBoxObject.id
                                }}
                            </ol>
                        </li>
                        <br>
                        <br>
                        <br>
                        <li v-if="this.SignObjectCheck">
                            <svg width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 21.5C11.9023 15.2071 20.664 -2.24755 11.7925 2.22375C2.92095 6.69505 3.03083 20.0923 8.3751 20.5064C13.7194 20.9204 26.3135 6.32027 19.2068 10.3141C15.4996 12.3974 12.1708 19.9458 16.4255 20.5064C18.5851 20.7909 21.6702 20.0817 30 15.5905" stroke="#5C5C5C" stroke-width="2"/>
                            </svg>
                            <ol v-for="SignObject in SignObjectArray" :key="SignObject.id">
                                {{
                                    SignObject.id
                                }}
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else class="ShowDocumentInfo">
            </div>
        </div>
        <div id="container" class="container">
            <div v-if="fileUploadCheck" id="drawerScrollBox" class="pdfViewer">
                <div id="drawer">
                    <pdf v-for="i in numPages" :key="i" :page="i" style="width: 100%" :src="src"></pdf>
                </div>
                <!--
                <div id="deleteArea" class="justify-center">
                    <v-icon size="100">mdi-delete</v-icon>
                </div>
                -->
            </div>
            <div v-else class="FileUploadArea">
                <div
                    class="file-upload-container"
                    @dragenter="onDragenter"
                    @dragover="onDragover"
                    @dragleave="onDragleave"
                    @drop="onDrop"
                    @click="onClick">
                    <h3 class="file-upload-text">Drag & Drop Files</h3>
                </div>
                <!-- 파일 업로드 -->
                <input
                    type="file"
                    ref="fileInput"
                    class="file-upload-input"
                    @change="onFileChange"
                    multiple="multiple">
            </div>
        </div>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    let loadingTask = pdf.createLoadingTask(
        "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
    );
    export default {
        components: {
            pdf,
            SignDialog
        },
        data() {
            return {
                //오브젝트 관련 데이터
                STextObjectName: "ShortTextObjectArea",
                STextObjectArray: [],
                STextObjectCheck: false,

                LTextObjectName: "LongTextObjectArea",
                LTextObjectArray: [],
                LTextObjectCheck: false,

                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectArray: [],
                CheckBoxObjectCheck: false,

                SignObjectName: "SignObjectArea",
                SignObjectArray: [],
                SignObjectCheck: false,

                //이하 다른 데이터
                fileUploadCheck: false,
                isDragged: "",
                src: loadingTask,
                numPages: undefined,
                itemLength: 0
            }
        },
        methods: {
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
            async addFiles(files) {
                console.log(files);
                files[0].name
                if (files[0].name.includes(".pdf")) {
                    const src = await this.readFiles(files[0])
                    console.log(files[0])
                    console.log(src)
                    this.fileUploadCheck = true;
                    this.src = src;
                    this.src = pdf.createLoadingTask(src);
                    this
                        .src
                        .promise
                        .then(pdf => {
                            this.numPages = pdf.numPages;
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
            },
            makeObject(objectInfo, event){
                const NewElementDiv = document.createElement("div");
                const ThisWindow = document.getElementById("drawer");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                NewElementDiv.setAttribute("class", objectInfo);
                NewElementDiv.setAttribute("id", objectInfo + String(this.itemLength));
                NewElementDiv.setAttribute("width", 100);
                NewElementDiv.setAttribute("height", 100);
                this.itemLength = this.itemLength + 1;
                let offsetX = event.pageX - ThisWindow
                            .getBoundingClientRect()
                            .left - parseInt(NewElementDiv.getAttribute("width"), 10) / 2;
                let offsetY = event.pageY - parseInt(NewElementDiv.getAttribute("height"), 10) / 2 - parseInt(computedheaderStyle.height, 10);
                NewElementDiv.style.left = offsetX + "px";
                NewElementDiv.style.top = offsetY + "px";
                //데이터 넣는 부분
                let pushObject =  {
                        id: "",
                        width: "",
                        height: "",
                        x: "",
                        y: ""
                    }
                pushObject.id = objectInfo + String(this.itemLength);
                pushObject.width = 100;
                pushObject.height = 100;
                pushObject.x = offsetX;
                pushObject.y = offsetY;
                if(objectInfo === "ShortTextObjectArea"){
                    this.STextObjectArray.push(pushObject);
                    this.STextObjectCheck = true;
                    console.log(this.STextObjectArray);
                }
                else if(objectInfo === "LongTextObjectArea"){
                    this.LTextObjectArray.push(pushObject);
                    this.LTextObjectCheck = true;
                    console.log(this.LTextObjectArray);
                }
                else if(objectInfo === "CheckBoxObjectArea"){
                    this.CheckBoxObjectArray.push(pushObject);
                    this.CheckBoxObjectCheck = true;
                    console.log(this.CheckBoxObjectArray);
                }
                else if(objectInfo === "SignObjectArea"){
                    this.SignObjectArray.push(pushObject);
                    this.SignObjectCheck = true;
                    console.log(this.SignObjectArray);
                }
                //이벤트 넣기
                //this.makingDragEvent(NewElementDiv);
                this.makingFirstClickObject(NewElementDiv);
                ThisWindow.append(NewElementDiv);
            },
            //이벤트 모음
            makingFirstClickObject(getElement){
                getElement.style.position = 'absolute';
                getElement.style.zIndex = 6;
                const ThisWindow = document.getElementById("drawer");
                const containerWindow = document.getElementById("container");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedContainerStyle = window.getComputedStyle(containerWindow);
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                function moveAt(offsetX, offsetY) {
                    getElement.style.left = offsetX - getElement
                        .getBoundingClientRect()
                        .width / 2 + 'px';
                    getElement.style.top = offsetY - getElement
                        .getBoundingClientRect()
                        .height / 2 + 'px';
                    }
                function onMouseMove(event) {
                    let offsetX = event.pageX - ThisWindow.getBoundingClientRect().left;
                    //패딩값만큼 빼고 계산하는 로직을 추가했다.
                    let offsetY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(computedheaderStyle.height, 10);
                    moveAt(offsetX, offsetY);
                }
                getElement.addEventListener('mousemove', onMouseMove)
                let self = this;
                getElement.addEventListener('click', function (){
                    getElement.removeEventListener('mousemove', onMouseMove);
                    getElement.removeEventListener('mouseout', onMouseMove);
                    getElement.style.zIndex = 4;
                    self.makingDragEvent(getElement);
                });
                getElement.addEventListener('mouseout', onMouseMove);
            },
            makingDragEvent(getElement) {
                getElement.onmousedown = function () {
                    getElement.style.position = 'absolute';
                    getElement.style.zIndex = 4;
                    const ThisWindow = document.getElementById("drawer");
                    const containerWindow = document.getElementById("container");
                    const headerWindow = document.getElementsByTagName("header")[0];
                    let computedContainerStyle = window.getComputedStyle(containerWindow);
                    let computedheaderStyle = window.getComputedStyle(headerWindow);
                    ThisWindow.append(getElement);
                    // 초기 이동을 고려한 좌표 (pageX, pageY)에서 공을 이동합니다.
                    function moveAt(offsetX, offsetY) {
                        getElement.style.left = offsetX - getElement
                            .getBoundingClientRect()
                            .width / 2 + 'px';
                        getElement.style.top = offsetY - getElement
                            .getBoundingClientRect()
                            .height / 2 + 'px';
                    }
                    function onMouseMove(event) {
                        let offsetX = event.pageX - ThisWindow
                            .getBoundingClientRect()
                            .left;
                        //패딩값만큼 빼고 계산하는 로직을 추가했다.
                        let offsetY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(computedheaderStyle.height, 10);
                        moveAt(offsetX, offsetY);
                    }
                    function onMouseUp() {
                        getElement.removeEventListener('mousemove', onMouseMove);
                    }
                    function showObjectMenu() {}
                    // mousemove로 공을 움직입니다.
                    getElement.addEventListener('mousemove', onMouseMove);
                    getElement.addEventListener('mouseup', onMouseUp);
                    getElement.addEventListener('click', showObjectMenu);
                    // 공을 드롭하고, 불필요한 핸들러를 제거합니다.
                };
                getElement.ondragstart = function () {
                    return false;
                }
            }
        }
    }
</script>
<style lang="scss">
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
    .container{
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
    .objectInfo{
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        height: 10%;
        background-color: #767676;
        color: white;
    }
    .objectInfoText{
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
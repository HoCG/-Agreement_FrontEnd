<template>
    <v-card class="mainCard overflow-hidden">
        <header>
            <div class="navigation">
                <v-spacer></v-spacer>
                <v-btn
                    @click="makeElement(item.text, $event)"
                    v-for="(item, i) in items"
                    :key="i">
                    <v-icon v-text="item.icon"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>
            </div>
        </header>
        <div class="sideBar">
            <h1>Test</h1>
        </div>
        <div class="section">
            <div v-if="fileUploadCheck" id="drawerScrollBox" class="pdfViewer">
                <div id="drawer">
                    <pdf v-for="i in numPages" :key="i" :page="i" style="width: 100%" :src="src"></pdf>
                </div>
                <div id="deleteArea" class="justify-center">
                    <v-icon size="100">mdi-delete</v-icon>
                </div>
            </div>
            <div v-else class="container">
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
                fileUploadCheck: false,
                isDragged: "",
                src: loadingTask,
                numPages: undefined,
                itemLength: 0,
                selectedID: "",
                imageID: "",
                selectedItem: 1,
                selectedItemText: "",
                items: [
                    {
                        text: '도장',
                        icon: ' mdi-stamper'
                    }, {
                        text: '서명',
                        icon: 'mdi-pencil'
                    }, {
                        text: '텍스트',
                        icon: 'mdi-comment-text-outline '
                    }
                ]
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
            makeElement(itemText, event) {
                console.log(itemText);
                if (itemText === "서명") { //싸인하는거라면
                    const NewElementDiv = document.createElement("div");
                    const NewElement = document.createElement("img");
                    const ThisWindow = document.getElementById("drawer");
                    NewElement.setAttribute("class", "myImage");
                    NewElementDiv.setAttribute("class", "myImageArea");
                    this.itemLength = this.itemLength + 2;
                    NewElementDiv.setAttribute("id", "myImageArea" + String(this.itemLength));
                    NewElement.setAttribute("id", "myImage" + String(this.itemLength));
                    this.imageID = "myImage" + String(this.itemLength);
                    //console.log(event.clientX);
                    let offsetX = event.pageX;/* 기존 div내부에 pdf를 두는 형태를 취했을때: ThisWindow
                        .getBoundingClientRect()
                        .left + 20;
                        */
                    let offsetY = event.pageY + 100;/*기존 div내부에 pdf를 두는 형태를 취했을때: event.pageY - ThisWindow
                        .getBoundingClientRect()
                        .top + 100;
                        */
                    NewElementDiv.style.top = offsetY + "px";
                    NewElementDiv.style.left = offsetX + "px";
                    this.makingDragEvent(NewElementDiv);
                    NewElement.style.zIndex = 5;
                    NewElementDiv.append(NewElement);
                    ThisWindow.append(NewElementDiv);
                    this.openDialog(this.imageID);
                } else { //그게아니라 텍스트라면
                    const NewElementDiv = document.createElement("div");
                    const NewElement = document.createElement("input");
                    NewElementDiv.setAttribute("class", "mytextArea");
                    const ThisWindow = document.getElementById("drawer");
                    this.itemLength = this.itemLength + 2;
                    NewElementDiv.setAttribute("id", "mytextArea" + String(this.itemLength));
                    let offsetX = event.pageX;/*ThisWindow
                        .getBoundingClientRect()
                        .left + 20;
                        */
                    let offsetY = event.pageY + 100;/*- ThisWindow
                        .getBoundingClientRect()
                        .top + 100;
                        */
                    NewElementDiv.style.top = offsetY + "px";
                    NewElementDiv.style.left = offsetX + "px";
                    this.makingDragEvent(NewElementDiv);
                    NewElement.style.zIndex = 5;
                    NewElement.setAttribute("class", "mytext");
                    NewElement.setAttribute("id", "mytext" + String(this.itemLength));
                    NewElementDiv.append(NewElement);
                    ThisWindow.append(NewElementDiv);
                }
            },
            setElementAttribute(itemText) {
                this.selectedItemText = itemText;
                console.log(this.selectedItemText);
            },
            makingDragEvent(getElement) {
                getElement.onmousedown = function () {
                    getElement.style.position = 'absolute';
                    getElement.style.zIndex = 6;
                    const ThisWindow = document.getElementById("drawer");
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
                        let offsetX = event.pageX
                         - ThisWindow
                            .getBoundingClientRect()
                            .left;
                        let offsetY = event.pageY - ThisWindow
                            .getBoundingClientRect()
                            .top;
                        moveAt(offsetX, offsetY);
                    }
                    function onMouseUp(event) {
                        this.selectedID = getElement.getAttribute("id");
                        //let wantDeleteElement = document.getElementById(this.selectedID);
                        const deleteArea = document.getElementById("deleteArea");
                        const deleteAreaWidth = deleteArea.clientWidth;
                        const deleteAreaHeight = deleteArea.clientHeight;
                        const deleteAreaTop = deleteArea.offsetTop;
                        const deleteAreaLeft = deleteArea.offsetLeft;
                        if ((deleteAreaLeft < event.pageX && event.pageX < deleteAreaWidth + deleteAreaLeft) && (deleteAreaTop < event.pageY && event.pageY < deleteAreaTop + deleteAreaHeight)) {
                            getElement.remove();
                        }
                        getElement.removeEventListener('mousemove', onMouseMove);
                    }
                    // mousemove로 공을 움직입니다.
                    getElement.addEventListener('mousemove', onMouseMove);
                    getElement.addEventListener('mouseup', onMouseUp);
                    /*
                    getElement.addEventListener("click", function(){
                     this
                        .$store
                        .commit("OPEN_DIALOG", String(this.imageID));
                    });
                    */
                    // 공을 드롭하고, 불필요한 핸들러를 제거합니다.
                };
                getElement.ondragstart = function () {
                    return false;
                }
                /*
                getElement.dblclick = function () {
                    this.openDialog(this.imageID);
                };
                */
            }
            /*
            openDialog(imageID) {
                this
                    .$store
                    .commit('OPEN_DIALOG', imageID)
            }
            */
        }
    }
</script>
<style lang="scss">
    .mainCard {
        display: flex;
        align-items: center;
        position: relative;
    }
    .section{
        margin-top: 80px;
        margin-left: 15%;
        width: 85%;
    }
    .sideBar {
        top: 80px;
        width: 15%;
        height: 100%;
        z-index: 1999;
        position: fixed;
        background-color: wheat;
    }
    header {
        width: 100%;
        height: 80px;
        background-size: cover;
        position: fixed;
        background-color: wheat;
        z-index: 2000;
        left: 0;
        right: 0;
        top: 0;
    }
    .navigation {
        width: 100%;
        padding: 18px 0;
        text-align: center;
    }
    .container {
        float: right;
        left: 200px;
        text-align: center;
        justify-content: center;
        min-height: 500px;
        width: 70%;
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
            margin-top: 250px;
        }
    }
    .pdfViewer {
        height: 100%;
        width: 80%;
    }
    #drawer {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
    }
    #deleteArea {
        text-align: center;
        width: 100px;
        height: 100px;
    }
    .mytextArea {
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #C5CAE9;
        position: absolute;
        width: 100px;
        height: 100px;
    }
    .mytext {
        display: inline-block;
        font-weight: 800;
        font-size: large;
        text-align: center;
        width: 100px;
        height: 30px;
    }
    .myImageArea {
        align-items: center;
        box-shadow: 5px 5px 5px;
        border-radius: 8px;
        border: 3px solid #4c384a;
        position: absolute;
        width: 100px;
        height: 100px;
        resize: both;
    }
    .myImage {
        width: 96px;
        height: 96px;
        position: absolute;
    }
</style>
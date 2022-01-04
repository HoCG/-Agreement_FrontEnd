<template>
    <v-card class="mainCard">
        <v-list class="listTool" dense="dense" width="400">
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
                <!--클릭이벤트 여러개 주기 참고문헌 https://webruden.tistory.com/365-->
                <v-list-item
                    @click="makeElement(item.text, $event)"
                    v-for="(item, i) in items"
                    :key="i">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <div id="drawerScrollBox" class="pdfViewer">
            <div id="drawer">
                <pdf
                    v-for="i in numPages"
                    :key="i"
                    :page="i"
                    style="width: 70%"
                    src="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"></pdf>
            </div>
        </div>
        <div id="deleteArea" class="justify-center">
            <v-icon size="100">mdi-delete</v-icon>
        </div>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    let loadingTask = pdf.createLoadingTask("https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf");
    export default {
        components: {
            pdf,
            SignDialog
        },
        data() {
            return {
                src: loadingTask,
                numPages: undefined,
                itemLength: 0,
                selectedID: "",
                imageID: "",
                distX: "",
                distY: "",
                posX: "",
                posY: "",
                TestIMG: require("../assets/logo.png"),
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
        mounted() {
            this
                .src
                .promise
                .then(pdf => {
                    this.numPages = pdf.numPages;
                });
        },
        methods: {
            makeElement(itemText, event) {
                console.log(itemText);
                if (itemText === "서명") { //싸인하는거라면
                    const NewElement = document.createElement("img");
                    const ThisWindow = document.getElementById("drawer");
                    NewElement.setAttribute("class", "myImage");
                    this.itemLength = this.itemLength + 2;
                    NewElement.setAttribute("id", "myImage" + String(this.itemLength));
                    this.imageID = "myImage" + String(this.itemLength);
                    //console.log(event.clientX);
                    let offsetX = event.pageX - ThisWindow.getBoundingClientRect().left + 200;
                    let offsetY = event.pageY - ThisWindow.getBoundingClientRect().top;
                    NewElement.style.top = offsetY + "px";
                    NewElement.style.left = offsetX + "px";
                    this.makingDragEvent(NewElement);
                    ThisWindow.append(NewElement);
                    this.openDialog(this.imageID);
                } else { //그게아니라 텍스트라면
                    const NewElementDiv = document.createElement("div");
                    const NewElement = document.createElement("input");
                    NewElementDiv.setAttribute("class", "mytextArea");
                    const ThisWindow = document.getElementById("drawer");
                    this.itemLength = this.itemLength + 2;
                    NewElementDiv.setAttribute("id", "mytextArea" + String(this.itemLength));
                    let offsetX = event.pageX - ThisWindow.getBoundingClientRect().left + 200;
                    let offsetY = event.pageY - ThisWindow.getBoundingClientRect().top;
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
                        let offsetX = event.pageX - ThisWindow.getBoundingClientRect().left;
                        let offsetY = event.pageY - ThisWindow.getBoundingClientRect().top;
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
                getElement.dblclick = function () {
                    this.openDialog(this.imageID);
                };
            },
            openDialog(imageID) {
                this
                    .$store
                    .commit('OPEN_DIALOG', imageID)
            }

        }
    }
</script>
<style>
    .listTool {
        float: left;
    }
    .pdfViewer {
        overflow: scroll;
        height: 60%;
    }
    .myImage {
        border-radius: 8px;
        border-color: white;
        position: absolute;
        width: 100px;
        height: 100px;
    }
    #deleteArea {
        text-align: center;
        width: 100px;
        height: 100px;
    }
    html {
        width: 100%;
        height: 100%;
    }

    body {
        width: 100%;
        height: 100%;
    }

    #drawer {
        position: relative;
    }
    .mainCard {
        position: relative;
        width: 100%;
        height: 1000px;
    }
    .mytextArea {
        box-shadow: 5px 5px 5px;
        font-weight: 800;
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
    }
</style>
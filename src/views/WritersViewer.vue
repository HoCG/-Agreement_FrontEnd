<template>
    <v-card class="WritersArea">
        <div class="TitleDiv">
            <h1>
                제목:
                {{this.documentTitle}}
            </h1>
        </div>
        <div id="drawerScrollBox" class="pdfViewer">
            <div id="drawer">
                <pdf v-for="i in numPages" :key="i" :page="i" :src="src"></pdf>
            </div>
        </div>
        <div class="checkLayout">
            <button class="checkBtn">제출</button>
        </div>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import JsonFile from '../assets/testJsonFile.json';
    let loadingTask = pdf.createLoadingTask(
        "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
    );
    export default {
        mounted() {
            this
                .src
                .promise
                .then(pdf => {
                    this.numPages = pdf.numPages;
                });
            console.log(JsonFile);
            //this.documentTitle = JsonFile.documentInfo[0].title;
        },
        updated() {
            this.initWritersView(JsonFile);
        },
        components: {
            SignDialog,
            pdf
        },
        data() {
            return {
                //useForJsonFile
                documentTitle: JsonFile
                    .documentInfo[0]
                    .title,
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
            initWritersView(JsonFile) {
                for (let i = 0; i < JsonFile.object.length; i++) {
                    if (JsonFile.object[i].id === 1) {
                        this.drawingTextObject(JsonFile.object[i]);
                        console.log(JsonFile.object[i])
                    } else if (JsonFile.object[i].id === 2) {
                        this.drawingImgObject(JsonFile.object[i]);
                    }
                }
            },
            drawingTextObject(object) {
                const TextObjectDiv = document.createElement("div");
                //const TextObject = document.createElement("input");
                const ThisWindow = document.getElementById("drawer");
                TextObjectDiv.setAttribute("class", "textObjectDiv");
                TextObjectDiv.style.position = "absolute";
                TextObjectDiv.style.width = object.width + "px";
                TextObjectDiv.style.height = object.height + "px";
                TextObjectDiv.style.top = object.y + "px";
                TextObjectDiv.style.left = object.x + "px";
                //TextObject.setAttribute("class", "textObjectDiv");
                ThisWindow.append(TextObjectDiv);
            },
            drawingImgObject(object) {
                const ImgObjectDiv = document.createElement("div");
                const ImgObject = document.createElement("img");
                const ThisWindow = document.getElementById("drawer");
                ImgObjectDiv.setAttribute("class", "imgObjectDiv");
                //ImgObjectDiv.setAttribute("id", "ImgBox" + object.htmlID);
                ImgObjectDiv.style.position = "absolute";
                ImgObjectDiv.style.width = object.width + "px";
                ImgObjectDiv.style.height = object.height + "px";
                ImgObjectDiv.style.top = object.y + "px";
                ImgObjectDiv.style.left = object.x + "px";
               // ImgObjectDiv.style.zIndex = 9;
                ImgObject.setAttribute("class", "imgObject");
                ImgObject.setAttribute("id", "ImgBox" + object.htmlID);
                ImgObject.style.zIndex = 9;
                let self = this;
                ImgObjectDiv.addEventListener('click', 
                    function (event) {
                        self
                            .$store
                            .commit('OPEN_DIALOG', String("ImgBox" + object.htmlID));
                        self
                            .$store
                            .commit('GET_WIDTH', object.width);
                        self
                            .$store
                            .commit('GET_HEIGHT', object.height);
                        event.preventDefault();
                    }
                );
                ImgObjectDiv.append(ImgObject);
                ThisWindow.append(ImgObjectDiv);
            }
        }
    }
</script>
<style>
    .imgObjectDiv {
        background-color: burlywood;
        z-index: 9;
    }
    .textObjectDiv {
        background-color: blue;
    }
    .WritersArea {
        text-align: center;
        align-items: center;
    }
    .TitleDiv {
        text-align: center;
    }
    .pdfViewer {
        width: 70%;
        margin-left: 15%;
    }
    .checkLayout {
        margin-top: 5%;
        margin-bottom: 5%;
        width: 100%;
        text-align: center;
        align-items: center;
    }
    .checkBtn {
        font-size: 30;
        font-weight: 800;
        width: 200px;
        height: 50px;
        border-radius: 8px;
        border: 3px solid #4c384a;
    }
</style>
<template>
    <v-card class="WritersArea">
        <div class="WriterHeader">
            <div class="navigation"></div>
        </div>
        <div class="sideBar">
            <div class="ShowObjectInfo">
                <div class="objectInfo">
                    <h3 class="objectInfoText">오브젝트 리스트</h3>
                </div>
                <div class="objectList">
                    <ul>
                        <li>
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
                        <li>
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
                        <li>
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
                        <li>
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
        </div>
        <div id="drawerScrollBox" class="pdfViewer">
            <div id="drawer">
                <pdf v-for="i in numPages" :key="i" :page="i" :src="src"></pdf>
            </div>
        </div>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import JsonFile from '../assets/testJsonFile.json';
    /*
    let loadingTask = pdf.createLoadingTask(
        "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
    );
    */
    import ShortTextSVG from '../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../svgs/CheckBoxSVG.vue';
    import SignSVG from '../svgs/SignSVG.vue';
    export default {
        mounted() {
            this.src = pdf.createLoadingTask(this.pdfLink);
            this
                .src
                .promise
                .then(pdf => {
                    this.numPages = pdf.numPages;
                });
            //this.Loading(this.pdfLink);
            this.initWritersView(JsonFile);
            console.log(JsonFile);
            //this.documentTitle = JsonFile.documentInfo[0].title;
        },
        components: {
            CheckBoxSVG,
            SignSVG,
            SignDialog,
            ShortTextSVG,
            LongTextSVG,
            pdf
        },
        data() {
            return {
                //useForJsonFile 오브젝트 관련 데이터 짧은글
                pdfLink: require('../assets/샘플문서_2. 돌봄교실 응급처치 동의서 및 비상연락처.pdf'),
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
                SignObjectID: 1,

                isDragged: "",
                src: "",
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
                    if (JsonFile.object[i].title.includes("짧은 글")) {
                        this.makeShortTextObject(JsonFile.object[i]);
                        this
                            .STextObjectArray
                            .push(JsonFile.object[i]);
                        //console.log(this.STextObjectArray);
                    } else if (JsonFile.object[i].title.includes("사인")) {
                        this.makeSignObject(JsonFile.object[i]);
                        this
                            .SignObjectArray
                            .push(JsonFile.object[i]);
                    } else if (JsonFile.object[i].title.includes("체크박스")) {
                        this.makeCheckBoxObject(JsonFile.object[i]);
                        this
                            .CheckBoxObjectArray
                            .push(JsonFile.object[i]);
                    } else if (JsonFile.object[i].title.includes("긴 글")) {
                        this.makeLongTextObject(JsonFile.object[i]);
                        this
                            .LTextObjectArray
                            .push(JsonFile.object[i]);
                    }
                }
            },
            makeCheckBoxObject(object){
                const CheckBoxObjectDiv = document.createElement("div");
                //const TextObject = document.createElement("input");
                const ThisWindow = document.getElementById("drawer");
                CheckBoxObjectDiv.setAttribute("class", "CheckBoxObjectArea");
                CheckBoxObjectDiv.style.position = "absolute";
                CheckBoxObjectDiv.style.width = object.width + "px";
                CheckBoxObjectDiv.style.height = object.height + "px";
                CheckBoxObjectDiv.style.top = object.y + "px";
                CheckBoxObjectDiv.style.left = object.x + "px";
                //<input type="checkbox" name="xxx" value="yyy" checked>
                let checkBox = document.createElement("input");
                checkBox.style.width = "70%";
                checkBox.style.height = "70%";
                checkBox.type = "checkbox"
                //TextObject.setAttribute("class", "textObjectDiv");
                CheckBoxObjectDiv.append(checkBox);
                ThisWindow.append(CheckBoxObjectDiv);
            },
            makeLongTextObject(object){
                const LongTextObjectDiv = document.createElement("div");
                //const TextObject = document.createElement("input");
                const ThisWindow = document.getElementById("drawer");
                LongTextObjectDiv.setAttribute("class", "LongTextObjectArea");
                LongTextObjectDiv.style.position = "absolute";
                LongTextObjectDiv.style.width = object.width + "px";
                LongTextObjectDiv.style.height = object.height + "px";
                LongTextObjectDiv.style.top = object.y + "px";
                LongTextObjectDiv.style.left = object.x + "px";
                //TextObject.setAttribute("class", "textObjectDiv");
                ThisWindow.append(LongTextObjectDiv);
            },
            makeShortTextObject(object) {
                const ShortTextObjectDiv = document.createElement("div");
                //const TextObject = document.createElement("input");
                const ThisWindow = document.getElementById("drawer");
                ShortTextObjectDiv.setAttribute("class", "ShortTextObjectArea");
                ShortTextObjectDiv.style.position = "absolute";
                ShortTextObjectDiv.style.width = object.width + "px";
                ShortTextObjectDiv.style.height = object.height + "px";
                ShortTextObjectDiv.style.top = object.y + "px";
                ShortTextObjectDiv.style.left = object.x + "px";
                //TextObject.setAttribute("class", "textObjectDiv");
                ThisWindow.append(ShortTextObjectDiv);
            },
            makeSignObject(object) {
                const SignObjectDiv = document.createElement("div");
                const SignObject = document.createElement("img");
                const ThisWindow = document.getElementById("drawer");
                const SignText = document.createElement("p");
                SignObjectDiv.setAttribute("class", "SignObjectArea");
                //ImgObjectDiv.setAttribute("id", "ImgBox" + object.htmlID);
                SignObjectDiv.style.position = "absolute";
                SignObjectDiv.style.width = object.width + "px";
                SignObjectDiv.style.height = object.height + "px";
                SignObjectDiv.style.top = object.y + "px";
                SignObjectDiv.style.left = object.x + "px";
                SignText.innerHTML = "서명"
                // ImgObjectDiv.style.zIndex = 9;
                SignObject.setAttribute("class", "SignObject");
                SignObject.setAttribute("id", "Sign" + object.id);
                SignText.setAttribute("id", "SignObjectAreaText" + "Sign" + object.id);
                SignObject.style.zIndex = 4;
                let self = this;
                SignObjectDiv.addEventListener('click', function (event) {
                    self
                        .$store
                        .commit('OPEN_DIALOG', String("Sign" + object.id));
                    self
                        .$store
                        .commit('GET_WIDTH', object.width);
                    self
                        .$store
                        .commit('GET_HEIGHT', object.height);
                    event.preventDefault();
                });
                SignObjectDiv.append(SignText);
                SignObjectDiv.append(SignObject);
                ThisWindow.append(SignObjectDiv);
            },
            Loading(files) {
                this.addFiles(files)
            },
            async addFiles(files) {
                console.log(files);
                this
                    .$store
                    .commit("SET_DOCUMENT_TITLE", files[0].name);
                if (files[0].name.includes(".pdf")) {
                    const src = await this.readFiles(files[0])
                    console.log(files[0])
                    console.log(src)
                    this.fileUploadCheck = true;
                    this
                        .$store
                        .commit("SET_PDF_FILE_UPLOAD_CHECK_TRUE");
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
<style>
    header{
        z-index: 3000 !important;
    }
    ul {
        list-style: none;
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
    .WriterHeader {
        width: 100%;
        height: 15%;
        position: fixed;
        background-color: white;
        z-index: 10;
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
    .ShortTextObjectArea {
        z-index: 6;
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
    }
    .LongTextObjectArea {
        z-index: 6;
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
    }
    .CheckBoxObjectArea {
        z-index: 6;
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
    }
    .SignObjectArea {
        z-index: 6;
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
    }
    .WritersArea {
        text-align: center;
        align-items: center;
    }
    .pdfViewer {
        z-index: 2;
        width: 70%;
        margin-left: 15%;
    }
</style>
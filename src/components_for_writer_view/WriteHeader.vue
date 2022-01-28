<!--네비게이션 바에 위치하여 오브젝트의 axios처리와 페이지닫기를 도와주는 vue파일입니다.-->
<template>
    <div class="WriterHeader">
        <div class="navigation">
            <button class="control-button" @click="pdfPrint()">
                완료
            </button>
            <button class="control-button" @click="exit">
                닫기
            </button>
        </div>
    </div>
</template>
<script>
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";
    import axios from "axios";
    import pdf from 'vue-pdf';
    export default {
        props: ["document-name"],
        data() {
            return {
                SendJsonFile: {
                    student_name: this.$store.state.writer.currentWriter.name,
                    student_id: this.$store.state.writer.currentWriter.schoolID,
                    submittee_object_texts: [],
                    submittee_object_signs: [],
                    submittee_object_checkboxes: []
                }
            }
        },
        methods: {
            exit() {
                this.$router.push({path: `/WriterLoginPage/${this.documentName}`
                                }).catch();
            },
            pdfPrint() {
                let self = this;
                const dataURLtoFile = (dataurl, fileName) => {
                    let arr = dataurl.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new File([u8arr], fileName, {type: mime});
                }
                //Usage example:
                let files = [];
                let filesName = [];
                let SignIMGArr = document.getElementsByClassName("SignIMG");
                for (let SignIMG of SignIMGArr) {
                    if(SignIMG.src.length >= 2){
                        files.push(dataURLtoFile(SignIMG.src));
                    }
                    filesName.push(SignIMG.getAttribute("id"));
                }
                if (filesName.length === files.length) {
                    this.makeCheckBoxForm();
                    this.makeTextForm();
                    this.makeSignForm();
                    this.setCssNull();
                    html2canvas(document.getElementById("drawer")).then(function (canvas) {
                        //let drawerDiv = document.getElementById("drawer");
                        //let computed_drawerDiv_Style = window.getComputedStyle(drawerDiv);
                        let imgData = canvas.toDataURL('image/png');
                        let MinData = 4000;
                        let MinPage = 0;
                        for (let j = 0; j < self.$store.state.PDFScreenInfo.OriginalWidth.length; j++) {
                            if (self.$store.state.PDFScreenInfo.OriginalWidth[j] < MinData) {
                                MinData = self
                                    .$store
                                    .state
                                    .PDFScreenInfo
                                    .OriginalWidth[j];
                                MinPage = j + 1;
                            }
                        }
                        let DefaultPage = document.getElementById('page' + MinPage);
                        let computed_DefaultPage_Style = window.getComputedStyle(DefaultPage);
                        let imgWidth = self
                            .$store
                            .state
                            .PDFScreenInfo
                            .OriginalWidth[MinPage - 1];
                        let computed_Ratio = self
                            .$store
                            .state
                            .PDFScreenInfo
                            .OriginalWidth[MinPage - 1] / parseInt(computed_DefaultPage_Style.width, 10);
                        let position = 0;
                        let doc = new jsPDF('p', 'px', [
                            parseInt(computed_DefaultPage_Style.height, 10) * computed_Ratio,
                            imgWidth
                        ]);
                        for (let i = 1; i <= self.$store.state.PDFScreenInfo.PDFPageInfo; i++) {
                            let currentPage = document.getElementById('page' + i);
                            let computed_Page_Style = window.getComputedStyle(currentPage);
                            let pageHeight = parseInt(computed_Page_Style.height, 10) * computed_Ratio;
                            if (self.$store.state.PDFScreenInfo.OriginalWidth[i - 1] < pageHeight * 1.41) {
                                if (i === 1) {
                                    doc.addImage(
                                        imgData,
                                        'PNG',
                                        0,
                                        position,
                                        self.$store.state.PDFScreenInfo.OriginalWidth[i - 1],
                                        pageHeight
                                    );
                                } else {
                                    doc.addImage(
                                        imgData,
                                        'PNG',
                                        0,
                                        position,
                                        self.$store.state.PDFScreenInfo.OriginalWidth[i - 1],
                                        pageHeight
                                    );
                                    doc.addPage();
                                }
                            } else {
                                if (i === 1) {
                                    doc.addImage(
                                        imgData,
                                        'PNG',
                                        -90,
                                        position,
                                        self.$store.state.PDFScreenInfo.OriginalWidth[i - 1],
                                        pageHeight
                                    );
                                } else {
                                    doc.addImage(
                                        imgData,
                                        'PNG',
                                        -90,
                                        position,
                                        self.$store.state.PDFScreenInfo.OriginalWidth[i - 1],
                                        pageHeight
                                    );
                                    doc.addPage();
                                }
                            }
                            position = position + pageHeight;
                        }
                        let blob = new Blob([doc.output('blob')], {type: 'application/pdf'});
                        let jsonBlob = new Blob(
                            [JSON.stringify(self.SendJsonFile)],
                            {type: 'application/json'}
                        );
                        console.log(self.SendJsonFile);
                        let form = new FormData();
                        for (let count = 0; count < files.length; count++) {
                            let imageBlob = new Blob([files[count]], {type: 'image/png'});
                            form.append('sign_img', imageBlob, filesName[count] + '.png');
                        }
                        form.append(
                            'file_pdf',
                            blob,
                            self.$store.state.PDFScreenInfo.PDFTitle + '.pdf'
                        );
                        form.append('data', jsonBlob);
                        axios
                            .post(
                                `${process.env.VUE_APP_BASEURL}/api/submittees/projects/${self.$route.params.document_name}`,
                                form,
                                {
                                    responseType: "blob"
                                },
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data; boundary=" + form._boundary + ";"
                                    }
                                }
                            )
                            .then(function (response) {
                                let file = URL.createObjectURL(
                                    new Blob([response.data], {type: 'application/pdf'})
                                );
                                self
                                    .$store
                                    .commit("SET_DOCUMENT_FILE", file);
                                let src = pdf.createLoadingTask(file);
                                src
                                    .promise
                                    .then(pdf => {
                                        self
                                            .$store
                                            .commit("SET_DOCUMENT_SRC", src);
                                        self
                                            .$store
                                            .commit("SET_PDF_FILE_PAGE_INFO", pdf.numPages);
                                        self
                                            .$router
                                            .push({path: '/WriteOverPage'})
                                            .catch(() => {});
                                    });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    });
                } else {
                    this.$store.commit("OPEN_ALERT", "서명을 모두 입력해주세요!");
                }
            },
            /*
            setPDFsForm(){
                let drawerDiv = document.getElementById("drawer");
                drawerDiv.style.width = 1100 + "px";
                //let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = 1100 / this.$store.state.PDFScreenInfo.OriginalWidth[0];
                //데이터값에 저장되어있는 width, height, left, top값을 모두 적용시켜줍니다.
                for (let ShortTextObject of this.$store.state.ShortTextObject.ShortTextArr) {
                    const NewElementDiv = document.getElementById(ShortTextObject.htmlID);
                    NewElementDiv.style.width = ShortTextObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = ShortTextObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = ShortTextObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = ShortTextObject.y * computed_Ratio + "px";
                }
                for (let LongTextObject of this.$store.state.LongTextObject.LongTextArr) {
                    const NewElementDiv = document.getElementById(LongTextObject.htmlID);
                    NewElementDiv.style.width = LongTextObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = LongTextObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = LongTextObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = LongTextObject.y * computed_Ratio + "px";
                }
                for (let CheckBoxObject of this.$store.state.CheckBoxObject.CheckBoxArr) {
                    const NewElementDiv = document.getElementById(CheckBoxObject.htmlID);
                    NewElementDiv.style.width = CheckBoxObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = CheckBoxObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = CheckBoxObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = CheckBoxObject.y * computed_Ratio + 150 + "px";
                }
                for (let SignObject of this.$store.state.SignObject.SignArr) {
                    const NewElementDiv = document.getElementById(SignObject.htmlID);
                    NewElementDiv.style.width = SignObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = SignObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = SignObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = SignObject.y * computed_Ratio + "px";
                }
            },
            */
            setCssNull() {
                //this.setPDFsForm();
                let LongTextElements = document.getElementsByClassName("LongTextObjectArea");
                for (let LongTextElement of LongTextElements) {
                    LongTextElement.style.backgroundColor = "transparent";
                    LongTextElement.style.boxShadow = "unset";
                    LongTextElement.style.borderRadius = "0px";
                    LongTextElement
                        .childNodes[0]
                        .readOnly = true;
                }
                let ShortTextElements = document.getElementsByClassName("ShortTextObjectArea");
                for (let ShortTextElement of ShortTextElements) {
                    ShortTextElement.style.backgroundColor = "transparent";
                    ShortTextElement.style.boxShadow = "unset";
                    ShortTextElement.style.borderRadius = "0px";
                    ShortTextElement
                        .childNodes[0]
                        .readOnly = true;
                }
                let SignElements = document.getElementsByClassName("SignObjectArea");
                for (let SignElement of SignElements) {
                    SignElement.style.backgroundColor = "transparent";
                    SignElement.style.boxShadow = "unset";
                    SignElement.style.borderRadius = "0px";
                }
                let CheckBoxElements = document.getElementsByClassName("CheckBoxObjectArea");
                for (let CheckBoxElement of CheckBoxElements) {
                    CheckBoxElement.style.backgroundColor = "transparent";
                    CheckBoxElement.style.boxShadow = "unset";
                    CheckBoxElement.style.borderRadius = "0px";
                    CheckBoxElement
                        .childNodes[0]
                        .disabled = true;
                }
            },
            makeCheckBoxForm() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0] / parseInt(computed_Object_Style.width, 10);
                for (let CheckBoxObject of this.$store.state.CheckBoxObject.CheckBoxArr) {
                    let submittee_object_checkbox = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24,
                        checked: false
                    }
                    submittee_object_checkbox.name = CheckBoxObject.title;
                    submittee_object_checkbox.x_position = CheckBoxObject.x * computed_Ratio;
                    submittee_object_checkbox.y_position = CheckBoxObject.y * computed_Ratio;
                    submittee_object_checkbox.width = CheckBoxObject.width * computed_Ratio;
                    submittee_object_checkbox.height = CheckBoxObject.height * computed_Ratio;
                    submittee_object_checkbox.rotate = 0;
                    submittee_object_checkbox.page = CheckBoxObject.page;
                    submittee_object_checkbox.type = "DEFAULT";
                    submittee_object_checkbox.checked = CheckBoxObject.checked;
                    this
                        .SendJsonFile
                        .submittee_object_checkboxes
                        .push(submittee_object_checkbox);
                }
            },
            makeTextForm() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0] / parseInt(computed_Object_Style.width, 10);
                for (let ShortTextObject of this.$store.state.ShortTextObject.ShortTextArr) {
                    let submittee_object_text = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24,
                        content: ""
                    };
                    submittee_object_text.name = ShortTextObject.title;
                    submittee_object_text.x_position = ShortTextObject.x * computed_Ratio;
                    submittee_object_text.y_position = ShortTextObject.y * computed_Ratio;
                    submittee_object_text.width = ShortTextObject.width * computed_Ratio;
                    submittee_object_text.height = ShortTextObject.height * computed_Ratio;
                    submittee_object_text.rotate = 0;
                    submittee_object_text.page = ShortTextObject.page;
                    submittee_object_text.type = "SHORT_TEXT";
                    submittee_object_text.content = ShortTextObject.text;
                    this
                        .SendJsonFile
                        .submittee_object_texts
                        .push(submittee_object_text);
                }
                for (let LongTextObject of this.$store.state.LongTextObject.LongTextArr) {
                    let submittee_object_text = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24,
                        content: ""
                    };
                    submittee_object_text.name = LongTextObject.title;
                    submittee_object_text.x_position = LongTextObject.x * computed_Ratio;
                    submittee_object_text.y_position = LongTextObject.y * computed_Ratio;
                    submittee_object_text.width = LongTextObject.width * computed_Ratio;
                    submittee_object_text.height = LongTextObject.height * computed_Ratio;
                    submittee_object_text.rotate = 0;
                    submittee_object_text.page = LongTextObject.page;
                    submittee_object_text.type = "LONG_TEXT";
                    submittee_object_text.content = LongTextObject.text;
                    this
                        .SendJsonFile
                        .submittee_object_texts
                        .push(submittee_object_text);
                }
            },
            makeSignForm() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0] / parseInt(computed_Object_Style.width, 10);
                for (let SignObject of this.$store.state.SignObject.SignArr) {
                    let submittee_object_sign = {
                        name: "",
                        x_position: 0,
                        y_position: 0,
                        width: 0,
                        height: 0,
                        rotate: 0,
                        page: 0,
                        type: "DEFAULT",
                        color: "#000000",
                        font_size: 24
                    }
                    submittee_object_sign.name = SignObject.title;
                    submittee_object_sign.x_position = SignObject.x * computed_Ratio;
                    submittee_object_sign.y_position = SignObject.y * computed_Ratio;
                    submittee_object_sign.width = SignObject.width * computed_Ratio;
                    submittee_object_sign.height = SignObject.height * computed_Ratio;
                    submittee_object_sign.rotate = 0;
                    submittee_object_sign.page = SignObject.page;
                    submittee_object_sign.type = "DEFAULT";
                    this
                        .SendJsonFile
                        .submittee_object_signs
                        .push(submittee_object_sign);
                }
            },
            resizeEvent() {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this
                    .$store
                    .state
                    .PDFScreenInfo
                    .OriginalWidth[0];
                //데이터값에 저장되어있는 width, height, left, top값을 모두 적용시켜줍니다.
                for (let ShortTextObject of this.$store.state.ShortTextObject.ShortTextArr) {
                    const NewElementDiv = document.getElementById(ShortTextObject.htmlID);
                    NewElementDiv.style.width = ShortTextObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = ShortTextObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = ShortTextObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = ShortTextObject.y * computed_Ratio + "px";
                }
                for (let LongTextObject of this.$store.state.LongTextObject.LongTextArr) {
                    const NewElementDiv = document.getElementById(LongTextObject.htmlID);
                    NewElementDiv.style.width = LongTextObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = LongTextObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = LongTextObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = LongTextObject.y * computed_Ratio + "px";
                }
                for (let CheckBoxObject of this.$store.state.CheckBoxObject.CheckBoxArr) {
                    const NewElementDiv = document.getElementById(CheckBoxObject.htmlID);
                    NewElementDiv.style.width = CheckBoxObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = CheckBoxObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = CheckBoxObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = CheckBoxObject.y * computed_Ratio + "px";
                }
                for (let SignObject of this.$store.state.SignObject.SignArr) {
                    const NewElementDiv = document.getElementById(SignObject.htmlID);
                    NewElementDiv.style.width = SignObject.width * computed_Ratio + "px";
                    NewElementDiv.style.height = SignObject.height * computed_Ratio + "px";
                    NewElementDiv.style.left = SignObject.x * computed_Ratio + "px";
                    NewElementDiv.style.top = SignObject.y * computed_Ratio + "px";
                }
            }
        }
    }
</script>
<style>
    .WritingAlert {
        display: none;
    }
    .control-button {
        float: right;
        width: 82px;
        height: 48px;
        margin: 7px 20px 0 0;
        font-weight: bold;
        color: #ffffff;


        background: #767676;        
        border-radius: 5px;
    }
    .WriterHeader {
        width: 100%;
        height: 100px;
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
</style>
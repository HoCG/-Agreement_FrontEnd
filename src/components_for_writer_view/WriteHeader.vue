<!--네비게이션 바에 위치하여 오브젝트의 axios처리와 페이지닫기를 도와주는 vue파일입니다.-->
<template>
    <div class="WriterHeader">
        <div class="navigation">
            <button class="SaveEditPageButton" @click="pdfPrint()">
                완료
            </button>
            <button class="CloseEditPageButton">
                닫기
            </button>
        </div>
    </div>
</template>
<script>
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";
    import axios from "axios";
    export default {
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
            pdfPrint() {
                this.makeCheckBoxForm();
                this.makeTextForm();
                this.makeSignForm();
                this.setCssNull();
                // 현재 document.body의 html을 A4 크기에 맞춰 PDF로 변환
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
                for(let SignIMG of SignIMGArr){
                    console.log(SignIMG);
                    files.push(dataURLtoFile(SignIMG.src));
                    filesName.push(SignIMG.getAttribute("id"));
                }
                //const fs = require('fs');
                html2canvas(document.getElementById("drawer")).then(function (canvas) {
                    // let drawerDiv = document.getElementById("drawer"); let computed_Object_Style
                    // = window.getComputedStyle(drawerDiv); 캔버스를 이미지로 변환
                    let imgData = canvas.toDataURL('image/png');
                    let imgWidth = 200; // 이미지 가로 길이(mm) A4 기준
                    let pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
                    let imgHeight = canvas.height * imgWidth / canvas.width;
                    let heightLeft = imgHeight;
                    let doc = new jsPDF({'orientation': 'p', 'unit': 'mm', 'format': 'a4'});
                    let position = 0;

                    // 첫 페이지 출력
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    // 한 페이지 이상일 경우 루프 돌면서 출력
                    while (heightLeft >= 20) {
                        position = heightLeft - imgHeight;
                        doc.addPage();
                        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }
                    let blob = new Blob([doc.output('blob')], {type: 'application/pdf'});
                    let jsonBlob = new Blob([JSON.stringify(self.SendJsonFile)], {type: 'application/json'});
                    let form = new FormData();

                    //console.log(blob);
                    //console.log(self.SendJsonFile);
                    for(let count = 0; count < files.length; count++){
                        let imageBlob = new Blob([files[count]], {type: 'image/png'});
                        form.append('sign_img', imageBlob, filesName[count] +'.png');
                    }
                    form.append('file_pdf', blob, self.$store.state.PDFScreenInfo.PDFTitle + '.pdf');
                    form.append('data', jsonBlob);
                    axios
                        .post(
                            `${process.env.VUE_APP_BASEURL}/api/submittees/projects/${self.$route.params.document_name}`,
                            form,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data; boundary=" + form._boundary + ";"
                                }
                            }
                        )
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
                this
                    .$store
                    .commit("SHOW_WRITE_END_PAGE");
                let container = document.getElementById("container");
                container.style.marginLeft = "7.5%";
            },
            setCssNull() {
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
                console.log(this.$store.state.SignObject.SignArr);
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
            }
        }
    }
</script>
<style>
    .WritingAlert {
        display: none;
    }
    .SaveEditPageButton {
        float: right;
        width: 82px;
        height: 48px;
        /* gray_05 */
        background: #767676;
        border: 1px solid #000000;
        box-sizing: border-box;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
    }
    .CloseEditPageButton {
        width: 82px;
        height: 48px;
        float: right;
        color: #C4C4C4;
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
</style>
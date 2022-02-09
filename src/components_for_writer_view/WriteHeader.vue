<!--네비게이션 바에 위치하여 오브젝트의 axios처리와 페이지닫기를 도와주는 vue파일입니다.-->
<template>
    <div class="writer-header">
        <div class="navigation">
            <button class="control-button" @click="printPDF()">
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
    import {postSubmitteeProject} from "../apis/project_api";
    import pdf from 'vue-pdf';
    import DataProcess from '../DataProcess'
    export default {
        props: ["document-name"],
        data() {
            return {
                sendedPDFJson: {
                    student_name: this.$store.state.writer.currentWriter.name,
                    student_id: this.$store.state.writer.currentWriter.schoolID,
                    submittee_object_texts: [],
                    submittee_object_signs: [],
                    submittee_object_checkboxes: []
                }
            }
        },
        computed: {
            OriginalWidth() {
                return this.$store.state.PDFScreenInfo.OriginalWidth;
            },
            PDFTitle() {
                return this.$store.state.PDFScreenInfo.PDFTitle;
            },
            ShortTextArr() {
                return this.$store.state.ShortTextObject.ShortTextArr;
            },
            LongTextArr() {
                return this.$store.state.LongTextObject.LongTextArr;
            },
            CheckBoxArr() {
                return this.$store.state.CheckBoxObject.CheckBoxArr;
            },
            SignArr() {
                return this.$store.state.SignObject.SignArr;
            }
        },
        methods: {
            exit() {
                this
                    .$router
                    .push({path: `/WriterLoginPage/${this.documentName}`})
                    .catch();
            },
            printPDF() {
                let self = this;
                //이미지를 URL의 형태로
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
                let SignIMGArr = document.getElementsByClassName("sign-img");
                for (let SignIMG of SignIMGArr) {
                    if (SignIMG.src.length >= 2) {
                        files.push(dataURLtoFile(SignIMG.src));
                    }
                    filesName.push(SignIMG.getAttribute("id"));
                }
                //서명입력이 제대로 됐는지 확인한다.
                if (filesName.length === files.length) {
                    //Json파일의 형태로 데이터를 잡아주고
                    this.makeCheckBoxForm();
                    this.makeTextForm();
                    this.makeSignForm();
                    //html내에 잡혀있는 css를 모두 제거해준다.
                    this.setCSSNull();
                    //html을 이미지로 전환
                    html2canvas(document.getElementById("drawer")).then(function (canvas) {
                        //폼데이터의 형태를 잡아준다.
                        let form = self.makeFormData(canvas, files, filesName);
                        //최종적으로 form데이터를 axios로 서버에 보낸다.
                        self.postProject(form)
                    });
                } else {
                    this
                        .$store
                        .commit("OPEN_ALERT", "서명을 모두 입력해주세요!");
                }
            },
            makeFormData(canvas, files, filesName) {
                //doc의 값을 정의
                let doc = this.setPDF(canvas);
                //blob을 통해 pdf의 형태를 구성.
                let blob = new Blob([doc.output('blob')], {type: 'application/pdf'});
                //blob을 통해  json의 형태를 구성.
                let jsonBlob = new Blob(
                    [JSON.stringify(this.sendedPDFJson)],
                    {type: 'application/json'}
                );
                console.log(this.sendedPDFJson);
                let form = new FormData();
                for (let count = 0; count < files.length; count++) {
                    //이미지가 여러개이므로 각각의 이미지와 이미지의 이름을 잡아서 넣어준다.
                    let imageBlob = new Blob([files[count]], {type: 'image/png'});
                    form.append('sign_img', imageBlob, filesName[count] + '.png');
                }
                form.append(
                    'file_pdf',
                    blob,
                    this.$store.state.PDFScreenInfo.PDFTitle + '.pdf'
                );
                form.append('data', jsonBlob);
                return form;
            },
            setPDF(canvas) {
                // let drawerDiv = document.getElementById("drawer"); let
                // computed_drawerDiv_Style = window.getComputedStyle(drawerDiv);
                let imgData = canvas.toDataURL('image/png');
                let MinData = 4000;
                let MinPage = 0;
                //원본 가로길이중 가장 작은 값을 찾아냄
                for (let j = 0; j < this.OriginalWidth.length; j++) {
                    if (this.OriginalWidth[j] < MinData) {
                        MinData = this
                            .$store
                            .state
                            .PDFScreenInfo
                            .OriginalWidth[j];
                        MinPage = j + 1;
                    }
                }
                //가장 작은 길이를 가진 PDF를 기준으로 잡음.
                let DefaultPage = document.getElementById('page' + MinPage);
                let computed_DefaultPage_Style = window.getComputedStyle(DefaultPage);
                let imgWidth = this.OriginalWidth[MinPage - 1];
                // (원본길이 / html에 잡혀있는 pdf의 길이)를 통해 비율을 구하고 이 비율을 활용한다.
                let computed_Ratio = this.OriginalWidth[MinPage - 1] / parseInt(
                    computed_DefaultPage_Style.width,
                    10
                );
                let position = 0;
                let doc = new jsPDF('p', 'px', [
                    parseInt(computed_DefaultPage_Style.height, 10) * computed_Ratio,
                    imgWidth
                ]);
                for (let i = 1; i <= this.$store.state.PDFScreenInfo.PDFPageInfo; i++) {
                    let currentPage = document.getElementById('page' + i);
                    let computed_Page_Style = window.getComputedStyle(currentPage);
                    let pageHeight = parseInt(computed_Page_Style.height, 10) * computed_Ratio;
                    //정상범위의 PDF라면
                    if (this.OriginalWidth[i - 1] < pageHeight * 1.41) {
                        if (i === 1) {
                            doc.addImage(
                                imgData,
                                'PNG',
                                0,
                                position,
                                this.OriginalWidth[i - 1],
                                pageHeight
                            );
                        } else {
                            doc.addImage(
                                imgData,
                                'PNG',
                                0,
                                position,
                                this.OriginalWidth[i - 1],
                                pageHeight
                            );
                            doc.addPage() // 세로가 긴 형태의 PDF라면;
                        }
                    } else {
                        if (i === 1) {
                            //90도를 회전시켜준다.
                            doc.addImage(
                                imgData,
                                'PNG',
                                -90,
                                position,
                                this.OriginalWidth[i - 1],
                                pageHeight
                            );
                        } else {
                            //90도를 회전시켜준다.
                            doc.addImage(
                                imgData,
                                'PNG',
                                -90,
                                position,
                                this.OriginalWidth[i - 1],
                                pageHeight
                            );
                            doc.addPage();
                        }
                    }
                    //포지션값은 누적하여 저장.
                    position = position + pageHeight;
                }
                return doc;
            },
            postProject(form) {
                let self = this;
                postSubmitteeProject(this.$route.params.document_name, form)
                    //제대로 보내졌다면 서버로 부터 받은 PDF를 사용자에게 보여줘야 하므로 response로 받은 데이터를 store에 저장한다.
                    .then(function (response) {
                        let file = URL.createObjectURL(
                            new Blob([response.data], {type: 'application/pdf'})
                        );
                        self
                            .$store
                            .commit("SET_DOCUMENT_FILE", file);
                        self.setSRC(file)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            setSRC(file) {
                let src = pdf.createLoadingTask(file);
                src
                    .promise
                    .then(pdf => {
                        this
                            .$store
                            .commit("SET_DOCUMENT_SRC", src);
                        this
                            .$store
                            .commit("SET_PDF_FILE_PAGE_INFO", pdf.numPages);
                        this
                            .$router
                            .push({path: '/WriteOverPage'})
                            .catch(() => {});
                    });
            },
            setCSSNull() {
                //this.setPDFsForm();
                let LongTextElements = document.getElementsByClassName("long-text-object-area");
                for (let LongTextElement of LongTextElements) {
                    LongTextElement.style.backgroundColor = "transparent"; //배경색은 투명하게.
                    LongTextElement.style.boxShadow = "unset"; //div박스에 잡혀있는 그림자 제거.
                    LongTextElement.style.borderRadius = "0px"; //둥근형태를 잡아주는 css제거.
                    LongTextElement
                        .childNodes[0]
                        .readOnly = true; //css를 제거한 시점부터는 작성자체가 아예 안되도록.
                }
                let ShortTextElements = document.getElementsByClassName("short-text-object-area");
                for (let ShortTextElement of ShortTextElements) {
                    ShortTextElement.style.backgroundColor = "transparent";
                    ShortTextElement.style.boxShadow = "unset";
                    ShortTextElement.style.borderRadius = "0px";
                    ShortTextElement
                        .childNodes[0]
                        .readOnly = true;
                }
                let SignElements = document.getElementsByClassName("sign-object-area");
                for (let SignElement of SignElements) {
                    SignElement.style.backgroundColor = "transparent";
                    SignElement.style.boxShadow = "unset";
                    SignElement.style.borderRadius = "0px";
                }
                let CheckBoxElements = document.getElementsByClassName("checkbox-object-area");
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
                for (let CheckBoxObject of this.CheckBoxArr) {
                    this
                        .sendedPDFJson
                        .submittee_object_checkboxes
                        .push(DataProcess.makeCheckBox(CheckBoxObject, computed_Ratio));
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
                for (let ShortTextObject of this.ShortTextArr) {
                    this
                        .sendedPDFJson
                        .submittee_object_texts
                        .push(DataProcess.makeShortText(ShortTextObject, computed_Ratio));
                }
                for (let LongTextObject of this.LongTextArr) {
                    this
                        .sendedPDFJson
                        .submittee_object_texts
                        .push(DataProcess.makeLongText(LongTextObject, computed_Ratio));
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
                for (let SignObject of this.SignArr) {
                    this
                        .sendedPDFJson
                        .submittee_object_signs
                        .push(DataProcess.makeSign(SignObject, computed_Ratio));
                }
            }
        }
    }
</script>
<style>
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
    .writer-header {
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
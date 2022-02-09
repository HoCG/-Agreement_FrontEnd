<template>
    <div class="writer-header">
        <div class="navigation">
            <button class="close-edit-page-button" @click="printPDF">
                다운로드
            </button>
            <button class="close-edit-page-button" @click="backPage">
                닫기
            </button>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
            }
        },
        computed: {
            currentWriter(){
                return this.$store.state.writer.currentWriter;
            },
            PDFTitle(){
                return this.$store.state.PDFScreenInfo.PDFTitle;
            }
        },
        methods: {
            //PDF 다운을 돕는 함수입니다.
            printPDF() {
                let self = this;
                axios
                    .get(
                        `${process.env.VUE_APP_BASEURL}/api/projects/submittees/${self.currentWriter.name}/pdf`, {responseType: "blob"}
                    )
                    .then(function (response) {
                        let file = URL.createObjectURL(
                            new Blob([response.data], {type: 'application/pdf'})
                        );
                        const pdfTitle = self.PDFTitle.split('.')[0];
                        const writer = self.currentWriter;
                        const dateArr = writer.Date.split("T");
                        const date = dateArr[0] + " " + dateArr[1];
                        console.log(writer);
                        let fileName = `${pdfTitle}_${writer.writer}_${writer.StudentID}_${date}.pdf`
                        
                        let a = document.createElement("a");
                        a.href = file;
                        a.download = fileName; //한글 분해현상 방지.
                        document
                            .body
                            .appendChild(a);
                        a.click();
                        a.remove();
                    }
                );
            },
            backPage() {
                this
                    .$router
                    .push({path: '/UserPage'})
                    .catch(() => {});
            }
        }
    }
</script>
<style scoped>
    .close-edit-page-button {
        width: 82px;
        height: 48px;
        float: right;
        background-color: #5c5d5c;
        color: white;
        margin-right: 20px;
        border-radius: 10px;
        margin-top: 10px;
    }
    .writer-header {
        width: 100%;
        height: 100px;
        position: fixed;
        background-color: white;
        z-index: 10;
    }
    .navigation {
        position: relative;
        text-align: center;
        top: 25%;
    }
</style>
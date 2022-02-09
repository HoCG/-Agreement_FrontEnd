<!--AppBar에 위치하여(네비게이션 상단에 있는 Bar) PDF다운로드와 페이지 종료를 돕는 vue파일입니다.-->
<template>
    <div class="write-over-form">
        <button @click="closeBtn()">
            <h3 class="close-text">닫기</h3>
        </button>
        <button @click="saveDocumentBtn()">
            <svg
                width="108"
                height="40"
                viewBox="0 0 108 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" width="107" height="40" rx="5" fill="#F3F3F3"/>
                <path
                    d="M32.2588 12.916V29.638H34.6708V12.916H32.2588ZM34.1308 19.09V21.052H37.0828V19.09H34.1308ZM22.2508 23.644V25.624H23.6548C26.5528 25.624 28.8388 25.552 31.3588 25.102L31.1248 23.122C28.6768 23.554 26.4628 23.644 23.6548 23.644H22.2508ZM22.2508 14.464V24.598H24.6268V16.39H30.0268V14.464H22.2508ZM38.1614 21.034V22.924H53.2634V21.034H38.1614ZM44.6234 22.276V25.786H47.0534V22.276H44.6234ZM39.9254 27.388V29.314H51.6074V27.388H39.9254ZM39.9254 24.328V27.874H42.3374V24.328H39.9254ZM45.7034 13.24C42.1034 13.24 39.7094 14.59 39.7094 16.696C39.7094 18.82 42.1034 20.152 45.7034 20.152C49.2854 20.152 51.6974 18.82 51.6974 16.696C51.6974 14.59 49.2854 13.24 45.7034 13.24ZM45.7034 15.13C47.8094 15.13 49.1234 15.67 49.1234 16.696C49.1234 17.722 47.8094 18.244 45.7034 18.244C43.5974 18.244 42.2834 17.722 42.2834 16.696C42.2834 15.67 43.5974 15.13 45.7034 15.13ZM54.738 25.822V27.766H69.822V25.822H54.738ZM61.056 22.672V26.614H63.45V22.672H61.056ZM56.43 14.014V15.904H65.754V17.686H56.466V22.366H58.842V19.558H68.13V14.014H56.43ZM56.466 21.412V23.338H68.508V21.412H56.466ZM73.0426 20.62V22.528H84.7606V20.62H73.0426ZM71.2966 25.642V27.604H86.3806V25.642H71.2966ZM73.0426 14.302V21.412H75.4186V16.246H84.6346V14.302H73.0426Z"
                    fill="#5C5C5C"/>
            </svg>
        </button>
    </div>
</template>
<script>
    export default {
        computed:{
            writer(){
                return this.$store.state.writer.currentWriter;
            },
            PDFTitle(){
                return this.$store.state.PDFScreenInfo.PDFTitle;
            }
        },
        methods: {
            closeBtn() {
                window.close();
            },
            saveDocumentBtn() {
                console.log(this.writer);
                let a = document.createElement("a");
                a.href = this.$store.state.PDFScreenInfo.file;
                const fileName = `${this.PDFTitle}_${this.writer.name}_${this.writer.schoolID}.pdf`;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        }
    }
</script>
<style>
    .write-over-form {
        align-items: center;
        display: inline-flex;
    }
    .close-text {
        width: 150px;
        height: 30px;
    }
</style>
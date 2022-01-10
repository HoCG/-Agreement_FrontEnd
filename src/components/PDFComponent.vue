<template>
<div id="container" class="container">
        <div v-if="fileUploadCheck" id="drawerScrollBox" class="pdfViewer">
        <div id="drawer">
            <pdf
                v-for="i in numPages"
                :key="i"
                :page="i"
                style="width: 100%"
                class="pdf-page-Setting"
                :src="src"
                v-bind:id="'page'+i"></pdf>
        </div>
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
            multiple="multiple"/>
    </div>
</div>
</template>
<script>
    import pdf from 'vue-pdf';
    let loadingTask = pdf.createLoadingTask(
        "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
    );
    export default {
        components:{
            pdf
        },
        data(){
            return{
                fileUploadCheck: false,
                isDragged: "",
                src: loadingTask,
                numPages: undefined,
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
                this.$store.commit("SET_DOCUMENT_TITLE", files[0].name);
                if (files[0].name.includes(".pdf")) {
                    const src = await this.readFiles(files[0])
                    console.log(files[0])
                    console.log(src)
                    this.fileUploadCheck = true;
                    this.$store.commit("SET_PDF_FILE_UPLOAD_CHECK_TRUE");
                    this.src = src;
                    this.src = pdf.createLoadingTask(src);
                    this
                        .src
                        .promise
                        .then(pdf => {
                            this.numPages = pdf.numPages;
                            this.$store.commit("SET_PDF_FILE_PAGE_INFO", this.numPages);
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
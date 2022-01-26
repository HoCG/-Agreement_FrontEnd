<template>
    <div>
        <div
            class="file-upload-container"
            @dragenter="onDragenter"
            @dragover="onDragover"
            @dragleave="onDragleave"
            @drop="onDrop">
            <div class="file-upload-div">
                <svg
                    class="file-upload-img"
                    width="105"
                    height="70"
                    viewBox="0 0 105 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M82.8333 69.6666H26.5C12.9556 69.6746 1.67383 59.2833 0.570867 45.7839C-0.532097 32.2845 8.91323 20.1996 22.2793 18.0089C28.4314 7.10143 39.9771 0.348473 52.5 0.333009C60.3087 0.303493 67.8939 2.93889 74.002 7.80393C79.9997 12.5613 84.2638 19.1615 86.1353 26.5846C97.3322 28.305 105.314 38.3605 104.448 49.6557C103.582 60.9509 94.1616 69.6726 82.8333 69.6666ZM52.5 8.99988C43.104 9.01099 34.4415 14.079 29.828 22.2643L27.8 25.8999L23.6876 26.5716C14.8055 28.0597 8.54267 36.1019 9.27588 45.0779C10.0091 54.0539 17.4941 60.9731 26.5 60.9999H82.8333C89.6305 61.0069 95.2856 55.7765 95.8082 48.9995C96.3308 42.2224 91.5445 36.1868 84.8266 35.1516L79.124 34.2849L77.7286 28.6863C74.8482 17.1024 64.4365 8.97807 52.5 8.99988ZM58.7833 52.3333H46.2166V39.3333H35.1666L52.5 21.9999L69.8333 39.3333H58.7833V52.3333Z"
                        fill="#767676"/>
                </svg>
                <h2 class="file-upload-text">서명 받을 문서를 끌어오거나 <br/>오른쪽의 버튼을 눌러 업로드 해주세요.</h2>
                <button @click="onClick" class="file-upload-btn">문서 가져오기</button>
            </div>
        </div>
        <!-- 파일 업로드 -->
        <input
            type="file"
            ref="fileInput"
            class="file-upload-input"
            @change="onFileChange"
            multiple="multiple"/>
    </div>
</template>
<script>
    export default {
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
                this
                    .$store
                    .commit("SET_DOCUMENT_TITLE", files[0].name);
                if (files[0].name.includes(".pdf")) { //파일이 pdf의 형태인지 확인.
                    //const src = await this.readFiles(files[0]) 새로들어온 pdf를 store에 저장 및 서버에 전송.
                    this.$store.state.UsersDocument.Document.id = this
                        .$store
                        .state
                        .UsersDocument
                        .DocumentArr[0] + 1;
                    this.$store.state.UsersDocument.Document.documentTitle = files[0].name;
                    this.$store.state.UsersDocument.Document.Link = "";
                    this.$store.state.UsersDocument.Document.src = files[0];
                    this.$store.state.UsersDocument.Document.documentWritersCount = 0;
                    this.$store.state.UsersDocument.Document.State = 1;
                    this
                        .$store
                        .dispatch('POST_PROJECT', this.$store.state.UsersDocument.Document);
                } else {
                    alert("pdf만 올릴수있습니다. 다시 시도해주세요.");
                }
            }
        }
    }
</script>
<style lang="scss" scoped>

.file-upload {
        width: 70%;
        height: 184px;
        float: right;
        border: transparent;
        border-radius: 50px;
        font-size: 10;
        font-weight: 700;
        cursor: pointer;
        &.dragged {
            border: 1px dashed powderblue;
            opacity: 0.6;
        }
        &-container {
            padding: 25px;
            width: 100%;
            min-width: 777px;
            height: 184px;
            margin: 60px auto 40px auto;
            // box-shadow: 0 0.625rem 1.25rem #0000001a;
            background-color: white;
            border: 2px dashed #767676;
            border-radius: 50px;
        }
        &-input {
            display: none;
        }
        &-div {
            
            display: flex;
            justify-content: space-evenly;
            min-width: 750px;
            margin-top: 30px;
        }
        &-text {
            width: 420px;
            float: left;
        }
        &-img {
            float: left;
        }
        &-btn {
            text-align: center;
            width: 158px;
            height: 68px;
            float: left;
            /* Auto layout */
            // margin-left: 110px;
            align-items: flex-start;
            padding: 10px;
            /* gray_03 */

            background: #DADADA;
            box-sizing: border-box;
            border-radius: 24px;

            /* Inside auto layout */
            flex: none;
        }
    }
</style>
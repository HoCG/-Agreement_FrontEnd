<template>
    <div class="WriterHeader">
        <div class="navigation">
            <button class="SaveEditPageButton" @click="pdfPrint()">
                <svg
                    width="92"
                    height="48"
                    viewBox="0 0 92 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" width="91" height="48" rx="5" fill="#767676"/>
                    <path
                        d="M26.6745 17.092V31.956H28.8185V17.092H26.6745ZM28.3385 22.58V24.324H30.9625V22.58H28.3385ZM17.7785 26.628V28.388H19.0265C21.6025 28.388 23.6345 28.324 25.8745 27.924L25.6665 26.164C23.4905 26.548 21.5225 26.628 19.0265 26.628H17.7785ZM17.7785 18.468V27.476H19.8905V20.18H24.6905V18.468H17.7785ZM31.9213 24.308V25.988H45.3453V24.308H31.9213ZM37.6653 25.412V28.532H39.8253V25.412H37.6653ZM33.4893 29.956V31.668H43.8733V29.956H33.4893ZM33.4893 27.236V30.388H35.6333V27.236H33.4893ZM38.6253 17.38C35.4253 17.38 33.2973 18.58 33.2973 20.452C33.2973 22.34 35.4253 23.524 38.6253 23.524C41.8093 23.524 43.9533 22.34 43.9533 20.452C43.9533 18.58 41.8093 17.38 38.6253 17.38ZM38.6253 19.06C40.4973 19.06 41.6653 19.54 41.6653 20.452C41.6653 21.364 40.4973 21.828 38.6253 21.828C36.7533 21.828 35.5853 21.364 35.5853 20.452C35.5853 19.54 36.7533 19.06 38.6253 19.06ZM46.656 28.564V30.292H60.064V28.564H46.656ZM52.272 25.764V29.268H54.4V25.764H52.272ZM48.16 18.068V19.748H56.448V21.332H48.192V25.492H50.304V22.996H58.56V18.068H48.16ZM48.192 24.644V26.356H58.896V24.644H48.192ZM62.9268 23.94V25.636H73.3428V23.94H62.9268ZM61.3748 28.404V30.148H74.7828V28.404H61.3748ZM62.9268 18.324V24.644H65.0388V20.052H73.2308V18.324H62.9268Z"
                        fill="#F3F3F3"/>
                </svg>
            </button>
            <button class="CloseEditPageButton" @click="backPage">
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
        methods: {
            //PDF 다운을 돕는 함수입니다.
            pdfPrint() {
                let self = this;
                axios
                    .get(
                        `${process.env.VUE_APP_BASEURL}/api/projects/submittees/${self.$store.state.writer.currentWriter.name}/pdf`, {responseType: "blob"}
                    )
                    .then(function (response) {
                        let file = URL.createObjectURL(
                            new Blob([response.data], {type: 'application/pdf'})
                        );
                        let a = document.createElement("a");
                        a.href = file;
                        a.download = self.$store.state.PDFScreenInfo.PDFTitle.normalize('NFC'); //한글 분해현상 방지.
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
<style>
    .WritingAlert {
        display: none;
    }
    .SaveEditPageButton {
        height: 48px;
        float: right;        
        /* gray_05 */
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
    }
    .navigation {
        position: relative;
        text-align: center;
        top: 25%;
    }
</style>
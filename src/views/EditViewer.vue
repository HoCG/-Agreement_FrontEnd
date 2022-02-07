<template>
    <div class="mainCard">
        <EditHeader/>
        <!--네비게이션바 컴포넌트-->
        <PDFViewer v-bind:numPages="this.numPages" v-bind:src="this.src"/>
        <EditObjectList/>
        <ObjectBox/><!--오브젝트 생성부분--></div>
</template>
<script>
    import EditHeader from "../components_for_edit_page/EditHeader.vue"
    import EditObjectList from "../components_for_edit_page/EditObjectList.vue"
    import ObjectBox from "../objects/ObjectBox.vue"
    import PDFViewer from "../components/PDFViewer.vue"
    import DataProcess from "../DataProcess"
    import axios from "axios";
    import pdf from 'vue-pdf';
    export default {
        components: {
            ObjectBox,
            EditObjectList,
            EditHeader,
            PDFViewer
        },
        mounted() {
            this.$store.commit("SET_DOCUMENT_TITLE", this.$route.query.getDocumentData.documentTitle);
            console.log(this.$route.query.getDocumentData)
            let self = this;
            axios
                .get(`${process.env.VUE_APP_BASEURL}/api/projects/${self.$route.query.getDocumentData.name}`)
                .then(function (response) {
                    console.log(response.data);
                    self.src = pdf.createLoadingTask(
                        `${process.env.VUE_APP_BASEURL}` + String(response.data.pdf.url)
                    );
                    self.$store.state.UsersDocument.Document = self.$route.query.getDocumentData;
                    self
                        .src
                        .promise
                        .then(pdf => {
                            self.numPages = pdf.numPages;
                            self
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", self.numPages);
                            self.saveOriginalWidth(response.data);
                            DataProcess.readAllObject(response.data);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                }
            );
            window.addEventListener('resize', DataProcess.resizeEvent, true)
        },
        beforeDestroy(){
            this.$store.commit("SET_DOCUMENT_TITLE", "");
            window.removeEventListener('resize', DataProcess.resizeEvent)
        },
        data(){
            return{
                numPages: 0,
                src: ""
            }
        },
        methods: {
             //서버에서 넘겨준 PDF의 원래 가로값을 가지고와서 전역으로 사용할 수 있도록 돕는 함수입니다.
            saveOriginalWidth(responseData){
                this.$store.commit("FORMAT_ORIGINAL_WIDTH"); //기존에 store에서 담고있을 원래 가로값을 초기화 시켜줍니다.
                for(let OW of responseData.pdf.original_width){
                    this.$store.commit("SAVE_ORIGINAL_WIDTH", OW); //원래 가로값을 store에 저장합니다.
                }
            }
            //서버를 통해 읽은 모든 데이터를 store에 저장합니다.
        }
    }
</script>
<style>
    .mainCard {
        display: flex;
        align-items: center;
        position: relative;
    }
    .sideBar {
        top: 152px;
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
    .EditHeader {
        width: 100%;
        height: 88px;
        position: fixed;
        background-color: white;
        z-index: 5;
        left: 0;
        right: 0;
        top: 64px;
    }
    .navigation {
        position: relative;
        text-align: center;
        top: 25%;
        height: 60%;
    }
    .objectBtnStyle {
        margin-left: 2%;
        margin-right: 2%;
    }
</style>
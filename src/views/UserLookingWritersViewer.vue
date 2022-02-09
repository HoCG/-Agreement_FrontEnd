<template>
    <v-card class="WritersArea overflow-hidden">
        <LookingWriterHeader/>
        <WriteList/>
        <PDFViewer v-bind:numPages="this.numPages" v-bind:src="this.src"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import WriteList from '../components_for_writer_view/WriteList.vue';
    import LookingWriterHeader from '../components_for_looking_writer/LookingWriterHeader.vue';
    import {getSubmitteePdf, getSubmitteeProject} from '../apis/project_api'
    import PDFViewer from "../components/PDFViewer.vue"
    import DataProcess from "../DataProcess"
    export default {
        components: {
            WriteList,
            LookingWriterHeader,
            PDFViewer
        },
        mounted() {
            this
                .$store
                .commit("FORMAT_ALL_CHECKBOX_OBJECTS");
            this
                .$store
                .commit("FORMAT_ALL_SHORTTEXT_OBJECTS");
            this
                .$store
                .commit("FORMAT_ALL_LONGTEXT_OBJECTS");
            this
                .$store
                .commit("FORMAT_ALL_SIGN_OBJECTS");
            let self = this;
            getSubmitteePdf(this.$store.state.writer.currentWriter.name)
                .then(function (response) {
                    console.log(response.data);
                    let file = URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    console.log(file);
                    self.src = pdf.createLoadingTask(file);
                    self
                        .src
                        .promise
                        .then(pdf => {
                            self.numPages = pdf.numPages;
                            self
                                .$store
                                .commit("SET_PDF_FILE_PAGE_INFO", self.numPages);
                        }
                    );  
                })
                .catch(function (error) {
                console.log(error);
            });
            getSubmitteeProject(this.$store.state.writer.currentWriter.name)
                .then(function (response) {
                    self
                        .$store
                        .commit("SET_DOCUMENT_TITLE", response.data.pdf.original_name);
                    DataProcess.readAllObject(response.data);
                })
                .catch(function (error) {
                console.log(error);
            });
        },
        computed: {
            writer(){
                return this.$store.state.writer.currentWriter
            }
        },
        data() {
            return {
                //useForJsonFile 오브젝트 관련 데이터 짧은글
                src: "",
                numPages: undefined
            }
        },
        beforeDestroy() {
            this.$store.commit("removeCurrentWriter");
            this.$store.commit("SET_DOCUMENT_TITLE", "");
        }
    }
</script>
<style>
    body {
        background-color: transparent;
    }
    header {
        z-index: 3000 !important;
    }
    .writer-header {
        width: 100%;
        height: 15%;
        position: fixed;
        background-color: white;
        z-index: 5;
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
    .WritersArea {
        display: flex;
        align-items: center;
        position: relative;
        height: 100%;
    }
    .sidebar {
        top: 20%;
        width: 15%;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
</style>
<template>
    <div id="mainWrapper">
        <WriterListComponent/>
    </div>
</template>
<script>
    import WriterListComponent from './WriterListComponent.vue';
    export default {
        components: {
            WriterListComponent
        },
        computed: {
            DocumentArr(){
                return this.$store.state.UsersDocument.DocumentArr;
            }
        },
        mounted(){
            for(let Document of this.DocumentArr){
                this.$store.commit("FORMAT_ALL_WRITERS", Document.name);
                this.$store.dispatch("REQUEST_PROJECT_WRITER", Document.name);
            }
        },
        methods: {
            downloadPDF(){
                
            },
            showWriterDocument(documentWriter){
                this.$store.commit("SET_CURRENT_WRITER", documentWriter)
                this
                    .$router
                    .push({path: '/WritersPDF'})
                    .catch(() => {});
            },
            showWritersDocumentList(Document) {
                let documentName = Document.name
                let WritersList = document.getElementsByClassName(documentName);
                for (let WL of WritersList) {
                    WL.style.display = "block";
                }
                let getCloseBtn = document.getElementById('closeBtn' + documentName);
                getCloseBtn.style.display = "inline";
                let getOpenBtn = document.getElementById('openBtn' + documentName);
                getOpenBtn.style.display = "none";
            },
            closeWritersDocumentList(Document) {
                let documentName = Document.name
                let WritersList = document.getElementsByClassName(documentName);
                for (let WL of WritersList) {
                    WL.style.display = "none";
                }
                let getCloseBtn = document.getElementById('closeBtn' + documentName);
                getCloseBtn.style.display = "none";
                let getOpenBtn = document.getElementById('openBtn' + documentName);
                getOpenBtn.style.display = "inline";
            }
        }
    }
</script>
<style scoped>

    .MainFrame {
        padding: 0 20px;
    }
    #mainWrapper {
        min-width: 1100px;
        margin-top: 20px;
        background-color: white;
        width: 100%;
        min-height: 1000px;
    }
    #mainWrapper > ul > li:first-child {
        text-align: center;
        font-size: 14px;
        height: 40px;
        vertical-align: middle;
        line-height: 30px;
    }
    .UlTitleSetting > li {
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 23px;
    }
    #ulTable{
        padding: 0;
    }
    #ulTable > li:first-child > ul > li {
        font-weight: bold;
        text-align: center;
    }
    #ulTable > li > ul {
        text-align: center;
        clear: both;
        position: relative;
        min-width: 40px;
    }
    #ulTable > li > ul > li {
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: center;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 23px;
        float: left;
        font-size: 10pt;
        vertical-align: baseline;
    }

    #ulTable > li > ul > li:first-child {
        width: calc(100% - 430px);
    }
    #ulTable > li > ul > li:first-child +li {
        width: 80px;
    }
    /*No 열 크기*/
    #ulTable > li > ul > li:first-child +li+li {
        width: 80px;
    }
    /*제목 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li {
        width: 80px;
    }
    /*작성일 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li {
        width: 120px;
    }
    /*작성자 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li+li {
        width: 70px;
    }

    .closeBtn {
        display: none;
    }
    .WritersList {
        width: 100%;
        display: none;
    }
    .WritersList > li {
        display: block;
        height: 53px;
        background: #F3F3F3;
        box-sizing: border-box;
    }
    .WritersList > div > li {
        display: inline-block;
        height: 60px;
    }
    .WritersDocumentTitle {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .WritersList > div > li:first-child {
        width: 45%;
        height: 100%;
    }
    /*No 열 크기*/
    .WritersList > div > li:first-child +li {
        width: 11%;
        height: 60px;
    }
    /*제목 열 크기*/
    .WritersList > div > li:first-child +li+li {
        width: 11%;
    }
    /*작성일 열 크기*/
    .WritersList > div > li:first-child +li+li+li {
        width: 11%;
    }
    /*작성자 열 크기*/
    .WritersList > div > li:first-child +li+li+li+li {
        width: 11%;
    }
    .WritersList > div > li:first-child +li+li+li+li {
        width: 11%;
    }
    .WritersAllDownLoadBtn {
        background: #DADADA;
        /* gray_05 */

        border: 1px solid #767676;
        box-sizing: border-box;
        border-radius: 20px;
        width: 100px;
        height: 23px;
    }
    .WritersBtn {
        background: #DADADA;
        /* gray_05 */

        border: 1px solid #767676;
        box-sizing: border-box;
        border-radius: 20px;
        width: 60px;
        height: 23px;
    }
</style>
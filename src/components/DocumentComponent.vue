<!--작성자 기준에서 PDF전체 화면을 구성해주는 파일입니다.-->
<template>
    <div id="container" class="container">
        <!--편집화면으로 넘어갈때-->
        <div class="FileUploadArea">
            <div v-if="Show_UserDocumentList">
                <DocumentUploadView />
                <div id="mainWrapper">
                    <ProjectListComponent />
                </div>
            </div>
            <div v-else>
                <DocumentForWriterList/>
            </div>
        </div>
    </div>
</template>
<script>
    import DocumentForWriterList from '../components_for_document/DocumentForWriterList.vue';
    
    import DocumentUploadView from '../components_for_document/DocumentUploadView.vue';
    import ProjectListComponent from './ProjectListComponent.vue';
    export default {
        mounted() {
            this
                .$store
                .dispatch('REQUEST_PROJECT');
            this
                .$store
                .commit("SET_WRITER_DOCUMENT_LIST_FALSE");
            this
                .$store
                .commit("SET_USER_DOCUMENT_LIST_TRUE");
        },
        computed: {
            ShortText(){
                return this.$store.state.ShortTextObject.ShortText;
            },
            LongText(){
                return this.$store.state.LongTextObject.LongText;
            },
            CheckBox(){
                return this.$store.state.CheckBoxObject.CheckBox;
            },
            Sign(){
                return this.$store.state.SignObject.Sign;
            },
            Show_UserDocumentList(){
                return this.$store.state.DocumentSideBarData.Show_UserDocumentList;
            }
        },
        components: {
            
            DocumentForWriterList,
            DocumentUploadView,
            ProjectListComponent
        },
        data() {
            return {
                MenuDocument: {},
                OpenWritersDocument: false,
                src: "",
                numPages: undefined
            }
        },
        methods: {
            //문서 오른쪽에 있는 ...버튼을 눌렀을때에 이벤트 처리를 돕는 함수.
            showDocumentMenu(Document, event) {
                let Menu = document.getElementById("DocumentMenu");
                this.MenuDocument = Document;
                Menu.style.display = "block";
                Menu.style.left = event.pageX - Menu
                    .getBoundingClientRect()
                    .width / 2 + "px";
                Menu.style.top = event.pageY - Menu
                    .getBoundingClientRect()
                    .height / 2 + "px";
                console.log(this.MenuDocument);
            },
            //편집화면으로 넘어가도록 돕는 함수.
            goEditScreen(Document) {
                if (Document.State === 1) {
                    this
                        .$router
                        .push({
                            //name: "EditPage로 가는 데이터",
                            path: '/EditView',
                            query: {
                                getDocumentData: Document
                            }
                        }
                    ).catch();
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .TitleAndItemsUl {
        border: 2px solid #767676;
    }
    .ItemsUl {
        border: 1px solid #DADADA;
    }
    .FileUploadArea {
        float: right;
        left: 200px;
        text-align: center;
        justify-content: center;
        min-height: 184px;
        width: 100%;
    }
    .file-upload {
        width: 70%;
        height: 184px;
        float: right;
        border: transparent;
        border-radius: 20px;
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
            border: 2px dashed #4c384a;
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
    .pdfViewer {
        margin-top: 200px;
        margin-left: 10%;
        text-align: center;
        height: 100%;
        width: 80%;
    }
    #drawer {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        overflow: hidden;
    }
    li,
    ul {
        list-style: none;
        text-align: center;
        padding: 0;
        margin: 0;
    }

    #mainWrapper {
        // padding-right: 50px;
        min-width: 1000px;
        margin-top: 20px;
        background-color: white;
        width: 100%;
        min-height: 1000px;
    }
    
    .left {
        text-align: left;
    }
    .switch-button {
        position: relative;
        display: inline-block;
        width: 55px;
        height: 30px;
    }
    .switch-button input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .onoff-switch {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        background-color: #ccc;
        box-shadow: inset 1px 5px 1px #999;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .onoff-switch:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 4px;
        bottom: 4px;
        background-color: #fff;
        -webkit-transition: 0.5s;
        transition: 0.4s;
        border-radius: 20px;
    }
    .switch-button input:checked + .onoff-switch {
        background-color: #F2D522;
        box-shadow: inset 1px 5px 1px #E3AE56;
    }
    .switch-button input:checked + .onoff-switch:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>
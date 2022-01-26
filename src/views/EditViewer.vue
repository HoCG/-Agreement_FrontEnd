<template>
    <div>
        <EditHeader/>
        <!--네비게이션바 컴포넌트-->
        <div id="container" class="container">
            <!--편집화면으로 넘어갈때-->
            <div id="drawerScrollBox" class="pdfViewer">
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
        </div>
        <div class="sideBar">
            <EditObjectList/>
            <!--왼쪽 사이드바-->
        </div>
        <ObjectBox/><!--오브젝트 생성부분--></div>
</template>
<script>
    import EditHeader from "../components_for_edit_page/EditHeader.vue"
    import EditObjectList from "../components_for_edit_page/EditObjectList.vue"
    import ObjectBox from "../objects/ObjectBox.vue"
    import axios from "axios";
    import pdf from 'vue-pdf';
    export default {
        components: {
            ObjectBox,
            EditObjectList,
            EditHeader,
            pdf
        },
        mounted() {
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
                            self.readAllObject(response.data);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                }
            );
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
            },
            //서버를 통해 읽은 모든 데이터를 store에 저장합니다.
            readAllObject(responseData) {
                //가지고 온 데이터에서
                this.readTextObject(responseData.project_object_texts); //텍스트들만 따로 처리.
                this.readCheckBoxObject(responseData.project_object_checkboxes); //체크박스만 따로 처리.
                this.readSignObject(responseData.project_object_signs); //사인값만 따로 처리.
            },
            //아래 모든 함수들은 데이터를 저장하는 과정입니다.
            readTextObject(project_object_texts) {
                let drawerDiv = document.getElementById("drawer"); 
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this.$store.state.PDFScreenInfo.OriginalWidth[0]; // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
                for (let TextObject of project_object_texts) {
                    if (TextObject.type === "SHORT_TEXT") {
                        this.$store.state.ShortTextObject.ShortText.htmlID = "ShortTextObjectArea"
                        this.$store.state.ShortTextObject.ShortText.title = "짧은 글_"
                        this.$store.state.ShortTextObject.ShortText.width = TextObject.width*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.height = TextObject.height*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.x = TextObject.x_position*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.y = TextObject.y_position*computed_Ratio;
                        this.$store.state.ShortTextObject.ShortText.page = TextObject.page;
                        this.$store.state.ShortTextObject.ShortText.push_or_readCheck = false;
                        this
                            .$store
                            .commit("ADD_SHORTTEXT_OBJECT", this.$store.state.ShortTextObject.ShortText);
                    } else {
                        this.$store.state.LongTextObject.LongText.htmlID = "LongTextObjectArea"
                        this.$store.state.LongTextObject.LongText.title = "긴 글_"
                        this.$store.state.LongTextObject.LongText.width = TextObject.width*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.height = TextObject.height*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.x = TextObject.x_position*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.y = TextObject.y_position*computed_Ratio;
                        this.$store.state.LongTextObject.LongText.page = TextObject.page;
                        this.$store.state.LongTextObject.LongText.push_or_readCheck = false;
                        this
                            .$store
                            .commit("ADD_LONGTEXT_OBJECT", this.$store.state.LongTextObject.LongText);
                    }
                }
            },
            readCheckBoxObject(project_object_checkboxes) {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this.$store.state.PDFScreenInfo.OriginalWidth[0];// 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
                for (let CheckBoxObject of project_object_checkboxes) {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = "CheckBoxObjectArea"
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_"
                    this.$store.state.CheckBoxObject.CheckBox.width = CheckBoxObject.width*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.height = CheckBoxObject.height*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.x = CheckBoxObject.x_position*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.y = CheckBoxObject.y_position*computed_Ratio;
                    this.$store.state.CheckBoxObject.CheckBox.page = CheckBoxObject.page;
                    this.$store.state.CheckBoxObject.CheckBox.push_or_readCheck = false;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.$store.state.CheckBoxObject.CheckBox);
                }
            },
            readSignObject(project_object_signs) {
                let drawerDiv = document.getElementById("drawer");
                let computed_Object_Style = window.getComputedStyle(drawerDiv);
                let computed_Ratio = parseInt(computed_Object_Style.width, 10) / this.$store.state.PDFScreenInfo.OriginalWidth[0]; // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
                for (let SignObject of project_object_signs) {
                    this.$store.state.SignObject.Sign.htmlID = "SignObjectArea"
                    this.$store.state.SignObject.Sign.title = "사인_"
                    this.$store.state.SignObject.Sign.width = SignObject.width*computed_Ratio;
                    this.$store.state.SignObject.Sign.height = SignObject.height*computed_Ratio;
                    this.$store.state.SignObject.Sign.x = SignObject.x_position*computed_Ratio;
                    this.$store.state.SignObject.Sign.y = SignObject.y_position*computed_Ratio;
                    this.$store.state.SignObject.Sign.page = SignObject.page;
                    this.$store.state.SignObject.Sign.push_or_readCheck = false;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.$store.state.SignObject.Sign);
                }
            }
        }
    }
</script>
<style>
    .sideBar {
        top: 20%;
        width: 15%;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
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
    .EditHeader {
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
    .objectBtnStyle {
        margin-left: 2%;
        margin-right: 2%;
    }
</style>
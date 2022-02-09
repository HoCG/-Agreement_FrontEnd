<template>
    <div class="edit-header">
        <div class="navigation">
            <button @click="makeObject(STextObjectName , $event)" class="object-btn-style">
                <ShortTextSVG/>
                <p>짧은 글</p>
            </button>
            <button @click="makeObject(LTextObjectName, $event)" class="object-btn-style">
                <LongTextSVG/>
                <p>긴 글</p>
            </button>
            <button @click="makeObject(CheckBoxObjectName, $event)" class="object-btn-style">
                <CheckBoxSVG/>
                <p>체크박스</p>
            </button>
            <button @click="makeObject(SignObjectName, $event)" class="object-btn-style">
                <SignSVG/>
                <p>서명</p>
            </button>
            <EditAction/>
        </div>
    </div>
</template>
<script>
    import ShortTextSVG from '../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../svgs/CheckBoxSVG.vue';
    import SignSVG from '../svgs/SignSVG.vue';
    import EditAction from '../components_for_edit_page/EditAction.vue'
    export default {
        data(){
            return{
                //짧은글
                STextObjectName: "short-text-object-area",
                STextObjectID: 1,

                //긴글
                LTextObjectName: "long-text-object-area",
                LTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "checkbox-object-area",
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "sign-object-area",
                SignObjectID: 1
            }
        },
        computed:{
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
            }
        },
        components: {
            CheckBoxSVG,
            SignSVG,
            ShortTextSVG,
            LongTextSVG,
            EditAction,
        },
        mounted() {
            this.$store.commit("leaveObject");
        }
        ,
        methods: {
            makeObject(objectID, event) {
                if(this.$store.state.object.isObjectHangOnMouse) return;

                this.$store.commit("takeObject");
                //forTest
                for (let i = 1; i <= this.$store.state.PDFScreenInfo.PDFPageInfo; i++) {
                    const PDF_Pages = document.getElementById("page" + String(i));
                    PDF_Pages.style.position = "relative";
                }
                //MainSource
                const ThisWindow = document.getElementById("drawer");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                let offsetX = event.pageX - ThisWindow
                    .getBoundingClientRect()
                    .left;
                let offsetY = event.pageY - parseInt(computedheaderStyle.height, 10);
                this.pushObjectInArray(objectID, offsetX, offsetY);
            },
            //배열에 데이터를 넣는 과정. 새로운 오브젝트를 넣는다.
            //x, y의 값은 그대로여도 상관이 없지만 width height는 비율에 맞게 줄거나 커져야하므로 computed_Ratio를 곱해준다.
            pushObjectInArray(objectID, x, y) {
                let drawerDiv = document.getElementById("drawer"); 
                let computed_Object_Style = window.getComputedStyle(drawerDiv); 
                let computed_Ratio = this.$store.state.PDFScreenInfo.OriginalWidth[0] / parseInt(computed_Object_Style.width, 10);
                if (objectID === "short-text-object-area") {
                    this.ShortText.htmlID = objectID;
                    this.ShortText.title = "짧은 글_";
                    this.ShortText.width = 100 * computed_Ratio;
                    this.ShortText.height = 30 * computed_Ratio;
                    this.ShortText.x = x;
                    this.ShortText.y = y;
                    this.ShortText.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SHORTTEXT_OBJECT", this.ShortText);
                    this.STextObjectID++;
                } else if (objectID === "long-text-object-area") {
                    this.LongText.htmlID = objectID;
                    this.LongText.title = "긴 글_";
                    this.LongText.width = 100 * computed_Ratio;
                    this.LongText.height = 100 * computed_Ratio;
                    this.LongText.x = x;
                    this.LongText.y = y;
                    this.LongText.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_LONGTEXT_OBJECT", this.LongText);
                    this.LTextObjectID++;
                } else if (objectID === "checkbox-object-area") {
                    this.CheckBox.htmlID = objectID;
                    this.CheckBox.title = "체크박스_";
                    this.CheckBox.width = 30 * computed_Ratio;
                    this.CheckBox.height = 30 * computed_Ratio;
                    this.CheckBox.x = x;
                    this.CheckBox.y = y;
                    this.CheckBox.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.CheckBox);
                    this.CheckBoxObjectID++;
                } else if (objectID === "sign-object-area") {
                    this.Sign.htmlID = objectID;
                    this.Sign.title = "사인_";
                    this.Sign.width = 100 * computed_Ratio;
                    this.Sign.height = 100 * computed_Ratio;
                    this.Sign.x = x;
                    this.Sign.y = y;
                    this.Sign.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.Sign);
                    this.SignObjectID++;
                }
            }
        }
    }
</script>
<style>
    .edit-header {
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
    .object-btn-style {
        margin-left: 2%;
        margin-right: 2%;
    }
</style>
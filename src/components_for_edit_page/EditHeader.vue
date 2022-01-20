<template>
    <div>
        <div class="navigation">
            <button @click="makeObject(STextObjectName , $event)" class="objectBtnStyle">
                <ShortTextSVG/>
                <p>짧은 글</p>
            </button>
            <button @click="makeObject(LTextObjectName, $event)" class="objectBtnStyle">
                <LongTextSVG/>
                <p>긴 글</p>
            </button>
            <button @click="makeObject(CheckBoxObjectName, $event)" class="objectBtnStyle">
                <CheckBoxSVG/>
                <p>체크박스</p>
            </button>
            <button @click="makeObject(SignObjectName, $event)" class="objectBtnStyle">
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
                STextObjectName: "ShortTextObjectArea",
                STextObjectID: 1,

                //긴글
                LTextObjectName: "LongTextObjectArea",
                LTextObjectID: 1,

                //체크박스
                CheckBoxObjectName: "CheckBoxObjectArea",
                CheckBoxObjectID: 1,

                //싸인
                SignObjectName: "SignObjectArea",
                SignObjectID: 1
            }
        },
        components: {
            CheckBoxSVG,
            SignSVG,
            ShortTextSVG,
            LongTextSVG,
            EditAction,
        },
        methods: {
            makeObject(objectID, event) {
                //forTest
                for (let i = 1; i <= this.$store.state.PDFInfo.PDFPageInfo; i++) {
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
            //배열내에 해당 오브젝트를 제거.
            pushObjectInArray(objectID, x, y) {
                if (objectID === "ShortTextObjectArea") {
                    this.$store.state.ShortTextObject.ShortText.htmlID = objectID;
                    this.$store.state.ShortTextObject.ShortText.title = "짧은 글_";
                    this.$store.state.ShortTextObject.ShortText.width = 100;
                    this.$store.state.ShortTextObject.ShortText.height = 30;
                    this.$store.state.ShortTextObject.ShortText.x = x;
                    this.$store.state.ShortTextObject.ShortText.y = y;
                    this.$store.state.ShortTextObject.ShortText.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SHORTTEXT_OBJECT", this.$store.state.ShortTextObject.ShortText);
                    console.log(this.$store.state.ShortTextObject.ShortTextArr)
                    this.STextObjectID++;
                } else if (objectID === "LongTextObjectArea") {
                    this.$store.state.LongTextObject.LongText.htmlID = objectID;
                    this.$store.state.LongTextObject.LongText.title = "긴 글_";
                    this.$store.state.LongTextObject.LongText.width = 100;
                    this.$store.state.LongTextObject.LongText.height = 100;
                    this.$store.state.LongTextObject.LongText.x = x;
                    this.$store.state.LongTextObject.LongText.y = y;
                    this.$store.state.LongTextObject.LongText.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_LONGTEXT_OBJECT", this.$store.state.LongTextObject.LongText);
                    this.LTextObjectID++;
                } else if (objectID === "CheckBoxObjectArea") {
                    this.$store.state.CheckBoxObject.CheckBox.htmlID = objectID;
                    this.$store.state.CheckBoxObject.CheckBox.title = "체크박스_";
                    this.$store.state.CheckBoxObject.CheckBox.width = 30;
                    this.$store.state.CheckBoxObject.CheckBox.height = 30;
                    this.$store.state.CheckBoxObject.CheckBox.x = x;
                    this.$store.state.CheckBoxObject.CheckBox.y = y;
                    this.$store.state.CheckBoxObject.CheckBox.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_CHECKBOX_OBJECT", this.$store.state.CheckBoxObject.CheckBox);
                    this.CheckBoxObjectID++;
                } else if (objectID === "SignObjectArea") {
                    this.$store.state.SignObject.Sign.htmlID = objectID;
                    this.$store.state.SignObject.Sign.title = "사인_";
                    this.$store.state.SignObject.Sign.width = 100;
                    this.$store.state.SignObject.Sign.height = 100;
                    this.$store.state.SignObject.Sign.x = x;
                    this.$store.state.SignObject.Sign.y = y;
                    this.$store.state.SignObject.Sign.push_or_readCheck = true;
                    this
                        .$store
                        .commit("ADD_SIGN_OBJECT", this.$store.state.SignObject.Sign);
                    this.SignObjectID++;
                }
            }
        }
    }
</script>
<style>
    .UserHeader {
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
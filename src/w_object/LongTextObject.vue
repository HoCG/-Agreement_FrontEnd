<template>
    <div class="LongTextObjectArea" v-bind:id="getLTData.htmlID">
        <div
            class="longtext-area"
            v-bind:id="'longtext-area '+getLTData.htmlID"
            style="width: 85%; height: 85%; ime-mode:auto; resize: none; text-align: left"
            contenteditable="true"
            lang="ko"
            v-bind:maxlength="textLimit"
            @keydown="limitText">{{getLTData.text}}</div>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getLTData: Object
        },
        data() {
            return {textLimit: 0, textCounter: 0}
        },
        mounted() {
            ObjectEvent.myFunction(this.getLTData);
            let tBox = document.getElementById('longtext-area ' + this.getLTData.htmlID);
            let computedTextBoxStyle = window.getComputedStyle(tBox);
            let textArea = parseInt(computedTextBoxStyle.width, 10) * parseInt(
                computedTextBoxStyle.height,
                10
            );
            let font = parseInt(computedTextBoxStyle.lineHeight, 10) * 21;
            this.textLimit = textArea / font;
            console.log(this.textLimit);
            /*
            let s = window.getSelection(),
                r = document.createRange();
            r.setStart(tBox, 0);
            r.setEnd(tBox, 0);
            s.removeAllRanges();
            s.addRange(r);
            */
            // 18px let self = this; tBox.addEventListener("change",  function(e){
            // self.limitText(e) }); tBox.addEventListener("keydown",  function(e){
            // self.limitText(e) });

        },
        methods: {
            limitText(event) {
                //엔터기능 살리는 방법: 변수를 주고
                //키가 눌릴때마다 변수의 값이 오르도록.
                //가로축 최대 글자입력 길이를 
                //단, event.keyCode값이 13이면 
                let tBox = document.getElementById('longtext-area ' + this.getLTData.htmlID);
                event = event || window.event;
                console.log(event.target.innerText.length);
                console.log(event.target.innerText);
                //한국어 감지
                if (event.target.innerText.length > this.textLimit && event.keyCode != 8) {
                    /*
                    const regExp = /[^0-9a-zA-Z]/g;
                    const ele = event.target;
                    if (regExp.test(ele.innerText)) {
                        tBox.focus();
                        ele.innerText = ele
                            .innerText
                            .slice(0, this.textLimit);
                    }
                    */
                    const ele = event.target;
                    ele.innerText = ele
                            .innerText
                            .slice(0, this.textLimit);
                    const newRange = document.createRange();
                    newRange.setStart(tBox.childNodes[0], this.textLimit);
                    newRange.setEnd(tBox.childNodes[0], this.textLimit);
                    const selection = document.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                }
                if (event.keyCode === 13) { //Enter key's keycode
                    event.preventDefault();
                }
            }
        }
    }
</script>
<style>
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .LongTextObjectArea {
        align-items: center;
        /* box-shadow: 5px 5px 5px; */
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 2px;
        background-color: #DADADA;
        position: absolute;
    }
    .longtext-area {
        overflow-y: hidden;
        resize: none;
    }
</style>
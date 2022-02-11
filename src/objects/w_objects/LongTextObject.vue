<template>
    <div class="long-text-object-area" v-bind:id="getLTData.htmlID">
        <span
            class="long-text-area"
            v-bind:id="'long-text-area '+getLTData.htmlID"
            contenteditable="true"
            lang="ko"
            @keydown="limitText"></span>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getLTData: Object
        },
        data() {
            return { //textLimit: 0, textCounter: 0
            }
        },
        mounted() {
            ObjectEvent.myFunction(this.getLTData);
            /*
            let tBox = document.getElementById('longtext-area ' + this.getLTData.htmlID);
            let computedTextBoxStyle = window.getComputedStyle(tBox);
            let textArea = parseInt(computedTextBoxStyle.width, 10) * parseInt(
                computedTextBoxStyle.height,
                10
            );
            let font = parseInt(computedTextBoxStyle.lineHeight, 10) * 21;
            this.textLimit = textArea / font;
            console.log(this.textLimit);
            */
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
                let longTextArea = document.getElementById(this.getLTData.htmlID);
                let longTextAreaHeight = window.getComputedStyle(longTextArea);
                let tBox = document.getElementById('long-text-area ' + this.getLTData.htmlID);
                let tBoxHeight = tBox.scrollHeight;
                event = event || window.event;
                if (parseInt(longTextAreaHeight.height, 10) < tBoxHeight && event.keyCode != 8) {
                    if (event.keyCode === 13) { //Enter key's keycode
                        event.preventDefault();
                    } else {
                        const ele = event.target;
                        ele.innerText = ele
                            .innerText
                            .slice(0, ele.innerText.length - 2);
                        const newRange = document.createRange();
                        console.log(tBox.childNodes);
                        newRange.setStart(tBox.childNodes[tBox.childNodes.length - 1], tBox.childNodes[tBox.childNodes.length - 1].length);
                        newRange.setEnd(tBox.childNodes[tBox.childNodes.length - 1], tBox.childNodes[tBox.childNodes.length - 1].length);
                        const selection = document.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    }
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
                    /*
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
                    */
                }
            }
        }
    }
</script>
<style>
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .long-text-object-area {
        /* box-shadow: 5px 5px 5px; */
        font-weight: 800;
        display: flex;
        font-size: large;
        border-radius: 2px;
        background-color: #DADADA;
        position: absolute;
        /* overflow: hidden;*/
    }
    .long-text-area {
        -ms-ime-mode: active;
        ime-mode: active;
        display: inline-block;
        width: 85%;
        height: 40px;
        margin-left: 7.5%;
        text-align: left;
        outline: 0 solid transparent;
    }
</style>
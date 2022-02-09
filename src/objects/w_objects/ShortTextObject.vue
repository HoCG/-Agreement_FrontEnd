<template>
    <div class="short-text-object-area" v-bind:id="getSTData.htmlID">
        <input v-bind:id="'short-text-area ' + this.getSTData.htmlID" 
        style="width: 85%;" 
        v-bind:maxlength="textLimit" 
        v-model="getSTData.text"/>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getSTData: Object
        },
        data(){
            return{
                textLimit: 0
            }
        },
        mounted() {
            ObjectEvent.myFunction(this.getSTData);
            let tBox = document.getElementById('shorttext-area ' + this.getSTData.htmlID);
            let computedTextBoxStyle = window.getComputedStyle(tBox);
            let textArea = parseInt(computedTextBoxStyle.width, 10)
            let font = 20;
            this.textLimit = textArea / font;
        }
    }
</script>
<style>
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .short-text-object-area {
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
</style>
<template>
    <div class="LongTextObjectArea" v-bind:id="getLTData.htmlID">
        <div class="longtext-area" style="width: 85%; height: 85%; max-height: 400px; overflow-y: auto; resize: none; text-align: left" contenteditable="true">{{getLTData.text}}</div>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getLTData: Object
        },
        mounted() {
            ObjectEvent.myFunction(this.getLTData);
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
</style>
<template>
    <div class="ShortTextObjectArea" v-bind:id="getSTData.htmlID">
        <input style="width: 100%" v-model="getSTData.text"/>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getSTData: Object
        },
        mounted() {
            ObjectEvent.myFunction(this.getSTData);
        }
    }
</script>
<style>
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .ShortTextObjectArea {
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
    }
</style>
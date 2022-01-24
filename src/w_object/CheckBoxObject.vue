<template>
    <div class="CheckBoxObjectArea" v-bind:id="getCBData.htmlID">
        <input class="CheckBox" type="checkbox" v-model="getCBData.checked"/>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getCBData: Object
        },
        mounted() {
            ObjectEvent.myFunction(this.getCBData);
        }
    }
</script>
<style>
    .CheckBox {
        width: 70%;
        height: 70%;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .CheckBoxObjectArea {
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
        width: 30px;
        height: 30px;
    }
</style>
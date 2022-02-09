<template>
    <div class="checkbox-object-area" v-bind:id="getCBData.htmlID">
        <input class="checkbox" type="checkbox" v-model="getCBData.checked"/>
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
    .checkbox {
        width: 70%;
        height: 70%;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .checkbox-object-area {
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
        width: 30px;
        height: 30px;
    }
</style>
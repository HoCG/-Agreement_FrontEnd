<template>
    <div class="LongTextObjectArea" v-bind:id="getLTData.htmlID">
        <textarea v-bind="getLTData.text" maxlength="50" style="width: 85%; height: 85%" cols="30" rows="5"></textarea>
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
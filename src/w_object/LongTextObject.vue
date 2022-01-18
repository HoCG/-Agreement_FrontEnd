<template>
    <div class="LongTextObjectArea" v-bind:id="getLTData.htmlID">
        <textarea v-bind="getLTData.text" id="" cols="30" rows="5"></textarea>
    </div>
</template>
<script>
    export default {
        props: {
            getLTData: Object
        },
        mounted() {
            const ThisWindow = document.getElementById("drawer");
            const ObjectDiv = document.getElementById(this.getLTData.htmlID);
            if (ObjectDiv != null) {
                ObjectDiv.style.width = this.getLTData.width + "px";
                ObjectDiv.style.height = this.getLTData.height + "px";
                ObjectDiv.style.top = this.getLTData.y + "px";
                ObjectDiv.style.left = this.getLTData.x + "px";
                ThisWindow.append(ObjectDiv);
            }
        }
    }
</script>
<style>
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .LongTextObjectArea {
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: none;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
    }
</style>
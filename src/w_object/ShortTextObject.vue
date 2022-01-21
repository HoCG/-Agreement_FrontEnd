<template>
    <div class="ShortTextObjectArea" v-bind:id="getSTData.htmlID">
        <input type="text" v-bind="getSTData.text"/>
    </div>
</template>
<script>
    export default {
        props: {
            getSTData: Object
        },
        mounted() {
            const ThisWindow = document.getElementById("drawer");
            const ObjectDiv = document.getElementById(this.getSTData.htmlID);
            if (ObjectDiv != null) {
                ObjectDiv.style.width = this.getSTData.width + "px";
                ObjectDiv.style.height = this.getSTData.height + "px";
                ObjectDiv.style.top = this.getSTData.y + "px";
                ObjectDiv.style.left = this.getSTData.x + "px";
                ThisWindow.append(ObjectDiv);
            }
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
        width: 100px;
        height: 30px;
    }
</style>
<template>
    <div class="SignObjectArea" @click="openSignDialog(getSOData)" v-bind:id="getSOData.htmlID">
        <p v-bind:id="'SignObjectAreaTextSign'+getSOData.id">
            서명
        </p>
        <img v-bind:id="'Sign'+getSOData.id">
    </div>
</template>
<script>
    export default {
        props: {
            getSOData: Object
        },
        mounted() {
            const ThisWindow = document.getElementById("drawer");
            const ObjectDiv = document.getElementById(this.getSOData.htmlID);
            if (ObjectDiv != null) {
                ObjectDiv.style.width = this.getSOData.width + "px";
                ObjectDiv.style.height = this.getSOData.height + "px";
                ObjectDiv.style.top = this.getSOData.y + "px";
                ObjectDiv.style.left = this.getSOData.x + "px";
                ThisWindow.append(ObjectDiv);
            }
        },
        methods: {
            openSignDialog(SignObject) {
                this
                    .$store
                    .commit('OPEN_DIALOG', 'Sign'+String(SignObject.id));
                this
                    .$store
                    .commit('GET_WIDTH', SignObject.width);
                this
                    .$store
                    .commit('GET_HEIGHT', SignObject.height);
            },
        }
    }
</script>
<style>
    #SignText{
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .SignObjectArea {
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
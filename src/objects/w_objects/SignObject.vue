<template>
    <div class="sign-object-area" @click="openSignDialog(getSOData)" v-bind:id="getSOData.htmlID">
        <p v-bind:id="'sign-object-area-text 사인_'+getSOData.id">
            서명
        </p>
        <img class="sign-img" v-bind:id="'사인_'+getSOData.id">
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getSOData: Object
        },
        mounted() {
            ObjectEvent.myFunction(this.getSOData);
        },
        methods: {
            openSignDialog(SignObject) {
                this
                    .$store
                    .commit('OPEN_DIALOG', '사인_'+String(SignObject.id));
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
    #sign-object-area-text{
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .sign-object-area {
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
<template>
    <div class="DocumentMenu" @mouseleave="DisPlayOut">
        <button class="MenuBtn" @click="CopyDocument">복사</button>
        <button class="MenuBtn" @click="DeleteDocument">삭제</button>
        <button class="MenuBtn" v-if="MenuDocument.State===3" @click="ReShareMode">다시공유</button>
        <button class="MenuBtn" v-else-if="MenuDocument.State===2" @click="StopShareMode">공유중단</button>
    </div>
</template>
<script>
    export default {
        props: {
            MenuDocument: Object
        },
        mounted(){
            console.log(this.MenuDocument)
        },
        methods: {
            DisPlayOut(){
                let Menu = document.getElementById("DocumentMenu");
                Menu.style.display = "none"
            },
            ReShareMode(){
                this.MenuDocument.State = 2;              
                this.$store.dispatch('STATE_CHANGE', this.MenuDocument);
            },
            StopShareMode(){
                this.MenuDocument.State = 3;              
                this.$store.dispatch('STATE_CHANGE', this.MenuDocument);
            },
            DeleteDocument(){

            },
            CopyDocument(){

            }
        }
    }
</script>
<style>
    .MenuBtn {
        width: 100%;
    }
    .DocumentMenu {
        position: absolute;
        background-color: white;
        width: 150px;
        height: 150px;
        display: none;
        border: 3px dashed #4c384a;
        border-radius: 20px;
    }
</style>
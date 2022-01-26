<template>
    <div class="DocumentMenu" >
        <button class="MenuBtn" @click="CopyDocument">복사</button>
        <button class="MenuBtn" @click="DeleteDocument">삭제</button>
        <button class="MenuBtn" v-if="menuDocument.State===3" @click="ReShareMode">다시공유</button>
        <button class="MenuBtn" v-else-if="menuDocument.State===2" @click="StopShareMode">공유중단</button>
    </div>
</template>
<script>
    export default {
        emits:['toggle'],
        props: {
            menuDocument: Object
        },
        mounted(){
            console.log(this.menuDocument)
        },
        methods: {
            DisPlayOut(){
                let Menu = document.getElementById("DocumentMenu");
                Menu.style.display = "none"
                this.$emit('toggle', false);
            },
            ReShareMode(){
                this.menuDocument.State = 2;              
                this.$store.dispatch('STATE_CHANGE', this.menuDocument);
                this.$emit('toggle', false);
            },
            StopShareMode(){
                this.menuDocument.State = 3;              
                this.$store.dispatch('STATE_CHANGE', this.menuDocument);
                this.$emit('toggle', false);
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
        right: 0px;
        background-color: white;
        width: 150px;
        height: 150px;
        display: block;
        border: 3px dashed #4c384a;
        border-radius: 20px;
    }
</style>
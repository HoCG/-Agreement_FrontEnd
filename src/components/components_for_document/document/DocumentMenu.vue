<template>
    <div class="document-menu" >
        <button class="menu-btn" @click="copyDocument">복사</button>
        <button class="menu-btn" @click="deleteDocument">삭제</button>
        <button class="menu-btn" v-if="menuDocument.State===3" @click="reShareMode">다시공유</button>
        <button class="menu-btn" v-else-if="menuDocument.State===2" @click="stopShareMode">공유중단</button>
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
            disPlayOut(){
                let Menu = document.getElementById("DocumentMenu");
                Menu.style.display = "none"
                this.$emit('toggle', false);
            },
            reShareMode(){
                this.menuDocument.State = 2;              
                this.$store.dispatch('STATE_CHANGE', this.menuDocument);
                this.$emit('toggle', false);
            },
            stopShareMode(){
                this.menuDocument.State = 3;              
                this.$store.dispatch('STATE_CHANGE', this.menuDocument);
                this.$emit('toggle', false);
            },
            deleteDocument(){

            },
            copyDocument(){

            }
        }
    }
</script>
<style>
    .menu-btn {
        width: 100%;
    }
    .document-menu {
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
<template>
    <div>
        <div v-if="StateInfo===0 || StateInfo===1" class="Ready">
            대기
        </div>
        <div v-else-if="StateInfo===2" class="Share">
            공유중
        </div>
        <div v-else-if="StateInfo===3" class="ShareStop">
            공유중단
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            StateInfo: Number
        }
    }
</script>
<style>
    .Ready{
        background-color: gray;
    }
    .Share{
        background-color: greenyellow;
    }
    .ShareStop{
        background-color: red;
    }
</style>
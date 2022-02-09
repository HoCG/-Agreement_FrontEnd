<template>
    <div
    class="state-button">
        <div 
        v-if="StateInfo===1"
        class="state-default wait">
            대기
        </div>
        <div 
        v-if="StateInfo===2"
        class="state-default share">
            공유
        </div>
        <div 
        v-if="StateInfo===3"
        class="state-default stop">
            중단
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            StateInfo: Number
        }
    }
</script>
<style lang="scss" scoped>
    .state-button{
        margin: 0;
    }

    .state-default{
        width: 60px;
        height: 24px;
        border-radius: 28px;
        line-height: 24px;
        font-size: 14px;
        font-weight: bold;
        margin: 0 auto;

        &.wait{
            color: #ADADAD;
            border: 1px solid #ADADAD; 
        }

        &.share{
            color: white;
            background-color: #74DF7F;
        }

        &.stop{
            color: white;
            background-color: #FF6363; 
        }
    }

</style>
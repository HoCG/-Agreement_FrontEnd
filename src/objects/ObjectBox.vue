<template>
    <div>
        <div>
            <SignObject
                v-for="SignObject in this.$store.state.SignObject.SignArr"
                :key="SignObject.id"
                v-bind:getSOData="SignObject"
                v-bind:id="SignObject.htmlID"/>
        </div>
        <div>
            <CheckBoxObject
                v-for="CheckBoxObject in this.$store.state.CheckBoxObject.CheckBoxArr"
                :key="CheckBoxObject.id"
                v-bind:getCBData="CheckBoxObject"
                v-bind:id="CheckBoxObject.htmlID"/>
        </div>
        <div>
            <LongTextObject
                v-for="LTextObject in this.$store.state.LongTextObject.LongTextArr"
                :key="LTextObject.id"
                v-bind:getLTData="LTextObject"
                v-bind:id="LTextObject.htmlID"/>
        </div>
        <div>
            <ShortTextObject
                v-for="STextObject in this.$store.state.ShortTextObject.ShortTextArr"
                :key="STextObject.id"
                v-bind:getSTData="STextObject"
                v-bind:id="STextObject.htmlID"/>
        </div>
    </div>
</template>
<script>
    import SignObject from '../objects/SignObject.vue'
    import CheckBoxObject from '../objects/CheckBoxObject.vue'
    import LongTextObject from '../objects/LongTextObject.vue'
    import ShortTextObject from '../objects/ShortTextObject.vue'
    export default {
        components: {
            SignObject,
            CheckBoxObject,
            LongTextObject,
            ShortTextObject,
        }
    }
</script>
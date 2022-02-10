<template>
    <div>
        <div>
            <SignObject
            v-for="SignObject in SignArr"
            :key="SignObject.id"
            v-bind:getSOData="SignObject"
            v-bind:id="SignObject.htmlID"/>
        </div>
        <div>
            <CheckBoxObject
            v-for="CheckBoxObject in CheckBoxArr"
            :key="CheckBoxObject.id"
            v-bind:getCBData="CheckBoxObject"
            v-bind:id="CheckBoxObject.htmlID"/>
        </div>
        <dir>
            <LongTextObject
            v-for="LTextObject in LongTextArr"
            :key="LTextObject.id"
            v-bind:getLTData="LTextObject"
            v-bind:id="LTextObject.htmlID"/>
        </dir>
        <div>
            <ShortTextObject
            v-for="STextObject in ShortTextArr"
            :key="STextObject.id"
            v-bind:getSTData="STextObject"
            v-bind:id="STextObject.htmlID"/>
        </div>
    </div>
</template>
<script>
    import SignObject from '../w_objects/SignObject.vue'
    import CheckBoxObject from '../w_objects/CheckBoxObject.vue'
    import LongTextObject from '../w_objects/LongTextObject.vue'
    import ShortTextObject from '../w_objects/ShortTextObject.vue'
    export default {
        components: {
            SignObject,
            CheckBoxObject,
            LongTextObject,
            ShortTextObject
        },
        computed: {
            ShortTextArr() {
                return this.$store.state.ShortTextObject.ShortTextArr;
            },
            LongTextArr() {
                return this.$store.state.LongTextObject.LongTextArr;
            },
            CheckBoxArr() {
                return this.$store.state.CheckBoxObject.CheckBoxArr;
            },
            SignArr() {
                return this.$store.state.SignObject.SignArr;
            }
        }
    }
</script>
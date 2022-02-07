<!--오브젝트들을 임시적으로 담아두는 vue파일입니다.-->
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
        <div>
            <LongTextObject
                v-for="LTextObject in LongTextArr"
                :key="LTextObject.id"
                v-bind:getLTData="LTextObject"
                v-bind:id="LTextObject.htmlID"/>
        </div>
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
        },
        computed: {
            ShortTextArr(){
                return this.$store.state.ShortTextObject.ShortTextArr;
            },
            LongTextArr(){
                return this.$store.state.LongTextObject.LongTextArr;
            },
            CheckBoxArr(){
                return this.$store.state.CheckBoxObject.CheckBoxArr;
            },
            SignArr(){
                return this.$store.state.SignObject.SignArr;
            }
        }
    }
</script>
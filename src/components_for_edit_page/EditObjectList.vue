<template>
    <div class="sideBar">
        <div class="ShowObjectInfo">
            <div class="objectInfo">
                <h3 class="objectInfoText">오브젝트 리스트</h3>
            </div>
            <div class="objectList">
                <ul>
                    <li v-if="this.$store.state.ShortTextObject.ShortTextDefineCheck">
                        <div style="width:100%; height: 28px;">
                            <ShortTextSVG style="float: left" height="15%"/>
                            <div style="float: left">({{this.$store.state.ShortTextObject.ShortTextArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="this.$store.state.ShortTextObject.ShortTextArr"/>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <li v-if="this.$store.state.LongTextObject.LongTextDefineCheck">
                        <div style="width:100%; height: 28px;">
                            <LongTextSVG style="float: left" height="15%"/>
                            <div style="float: left">({{this.$store.state.LongTextObject.LongTextArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="this.$store.state.LongTextObject.LongTextArr"/>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <li v-if="this.$store.state.CheckBoxObject.CheckBoxDefineCheck">
                        <div style="width:100%; height: 28px;">
                            <CheckBoxSVG style="float: left" height="15%"/>
                            <div style="float: left">({{this.$store.state.CheckBoxObject.CheckBoxArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="this.$store.state.CheckBoxObject.CheckBoxArr"/>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <li v-if="this.$store.state.SignObject.SignDefineCheck">
                        <div style="width:100%; height: 28px;">
                            <SignSVG style="float: left" height="15%"/>
                            <div style="float: left">({{this.$store.state.SignObject.SignArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="this.$store.state.SignObject.SignArr"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import ShortTextSVG from '../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../svgs/CheckBoxSVG.vue';
    import SignSVG from '../svgs/SignSVG.vue';
    import ObjectListItem from './ObjectListItem.vue'
    export default {
        components: {
            ShortTextSVG,
            LongTextSVG,
            CheckBoxSVG,
            SignSVG,
            ObjectListItem
        }
    }
</script>
<style>
    .ShowObjectInfo {
        height: 100%;
        overflow-y: scroll;
    }
    .sideBar {
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
    .objectInfo {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        height: 10%;
        background-color: #767676;
        color: white;
    }
    .objectInfoText {
        position: relative;
        top: 45%;
    }
    .sideBar {
        top: 20%;
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
</style>
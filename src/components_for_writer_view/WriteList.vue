<!--작성자가 작성해야하는 오브젝트의 정보를 SideBar의 형태로 만들어서 보여주는 vue파일입니다.-->
<template>
    <div class="sideBar">
        <div class="objectInfo">
            <h3 class="objectInfoText">오브젝트 리스트</h3>
        </div>
        <div class="objectList">
            <ul>
                <li>
                    <div style="width:100%; height: 28px;">
                        <ShortTextSVG style="float: left" height="15%"/>
                        <div style="float: left">({{this.$store.state.ShortTextObject.ShortTextArr.length}})</div>
                    </div>
                    <ol
                        style="width:100%;"
                        v-for="STextObject in this.$store.state.ShortTextObject.ShortTextArr"
                        :key="STextObject.id">
                        {{
                            STextObject.title
                        }}
                    </ol>
                </li>
                <br/>
                <br/>
                <br/>
                <li>
                    <div style="width:100%; height: 28px;">
                        <LongTextSVG style="float: left" height="15%"/>
                        <div style="float: left">({{this.$store.state.LongTextObject.LongTextArr.length}})</div>
                    </div>
                    <ol
                        style="width:100%;"
                        v-for="LTextObject in this.$store.state.LongTextObject.LongTextArr"
                        :key="LTextObject.id">
                        {{
                            LTextObject.title
                        }}
                    </ol>
                </li>
                <br/>
                <br/>
                <br/>
                <li>
                    <div style="width:100%; height: 28px;">
                        <CheckBoxSVG style="float: left" height="15%"/>
                        <div style="float: left">({{this.$store.state.CheckBoxObject.CheckBoxArr.length}})</div>
                    </div>
                    <ol
                        v-for="CheckBoxObject in this.$store.state.CheckBoxObject.CheckBoxArr"
                        :key="CheckBoxObject.id">
                        {{
                            CheckBoxObject.title
                        }}
                    </ol>
                </li>
                <br/>
                <br/>
                <br/>
                <li>
                    <div style="width:100%; height: 28px;">
                        <SignSVG style="float: left" height="15%"/>
                        <div style="float: left">({{this.$store.state.SignObject.SignArr.length}})</div>
                    </div>
                    <ol
                        v-for="SignObject in this.$store.state.SignObject.SignArr"
                        :key="SignObject.id">
                        {{
                            SignObject.title
                        }}
                    </ol>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import ShortTextSVG from '../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../svgs/CheckBoxSVG.vue';
    import SignSVG from '../svgs/SignSVG.vue';
    export default {
        components: {
            ShortTextSVG,
            LongTextSVG,
            CheckBoxSVG,
            SignSVG
        }
    }
</script>
<style>
    .sideBar {
        top: 20%;
        width: 15%;
        height: 100%;
        z-index: 4;
        position: fixed;
        background-color: white;
    }
    .ShowObjectInfo {
        height: 80%;
        overflow-y: scroll;
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
        top: 50%;
    }
    ul {
        list-style: none;
    }
</style>
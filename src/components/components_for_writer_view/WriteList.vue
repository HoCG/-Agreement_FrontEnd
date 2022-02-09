<!--작성자가 작성해야하는 오브젝트의 정보를 SideBar의 형태로 만들어서 보여주는 vue파일입니다.-->
<template>
    <div class="sidebar">
        <div class="object-list-box">
            <h3 class="object-list-box-text">오브젝트 리스트</h3>
        </div>
        <div class="object-list">
            <ul>
                <li>
                    <div style="width:100%; height: 28px;">
                        <ShortTextSVG style="float: left" height="15%"/>
                        <div style="float: left">({{ShortTextArr.length}})</div>
                    </div>
                    <ol
                        style="width:100%;"
                        v-for="STextObject in ShortTextArr"
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
                        <div style="float: left">({{LongTextArr.length}})</div>
                    </div>
                    <ol
                        style="width:100%;"
                        v-for="LTextObject in LongTextArr"
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
                        <div style="float: left">({{CheckBoxArr.length}})</div>
                    </div>
                    <ol
                        v-for="CheckBoxObject in CheckBoxArr"
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
                        <div style="float: left">({{SignArr.length}})</div>
                    </div>
                    <ol
                        v-for="SignObject in SignArr"
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
    import ShortTextSVG from '../../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../../svgs/CheckBoxSVG.vue';
    import SignSVG from '../../svgs/SignSVG.vue';
    export default {
        components: {
            ShortTextSVG,
            LongTextSVG,
            CheckBoxSVG,
            SignSVG
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
<style scoped>
    .sidebar {
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        top: 150px;
        background-color: white;
    }
    .object-list-box {
        position: relative;
        align-items: center;
        text-align: center;
        justify-content: center;
        height: 88px;
        background-color: #767676;
        color: white;
    }
    .object-list-box-text {
        position: relative;
        line-height: 88px;
    }
    ul{
        list-style: none;
        padding-left: 0px;
        margin: 30px 0 0 40px;
    }
</style>
<template>
    <div class="sidebar">
        <div class="object-list">
            <div class="object-list-box">
                <h3 class="object-list-box-text">오브젝트 리스트</h3>
            </div>
            <div>
                <ul>
                    <li>
                        <div style="width:100%; height: 28px;">
                            <ShortTextSVG style="float: left; margin-right: 10px" height="15%"/>
                            <div style="float: left">({{ShortTextArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="ShortTextArr"/>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <li>
                        <div style="width:100%; height: 28px;">
                            <LongTextSVG style="float: left; margin-right: 10px" height="15%"/>
                            <div style="float: left">({{LongTextArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="LongTextArr"/>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <li>
                        <div style="width:100%; height: 28px;">
                            <CheckBoxSVG style="float: left; margin-right: 10px" height="15%"/>
                            <div style="float: left">({{CheckBoxArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="CheckBoxArr"/>
                    </li>
                    <br/>
                    <br/>
                    <br/>
                    <li>
                        <div style="width:100%; height: 28px;">
                            <SignSVG style="float: left; margin-right: 10px" height="15%"/>
                            <div style="float: left">({{SignArr.length}})</div>
                        </div>
                        <ObjectListItem v-bind:ObjectArr="SignArr"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import ShortTextSVG from '../../svgs/ShortTextSVG.vue';
    import LongTextSVG from '../../svgs/LongTextSVG.vue';
    import CheckBoxSVG from '../../svgs/CheckBoxSVG.vue';
    import SignSVG from '../../svgs/SignSVG.vue';
    import ObjectListItem from './ObjectListItem.vue'
    export default {
        components: {
            ShortTextSVG,
            LongTextSVG,
            CheckBoxSVG,
            SignSVG,
            ObjectListItem
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
<style lang="scss" scoped>
    ul{
        list-style: none;
        padding-left: 0px;
        margin: 30px 0 0 40px;
    }
    .object-list {
        width: 100%;
        height: calc(100% - 150px);
        overflow-y: auto;
        &-box{
            position: relative;
            align-items: center;
            text-align: center;
            justify-content: center;
            height: 88px;
            background-color: #767676;
            color: white;
            &-text{
                position: relative;
                line-height: 88px;
            }
        }
    }
    .sidebar {
        width: 280px;
        height: 100%;
        z-index: 4;
        position: fixed;
        top: 150px;
        background-color: white;
    }
</style>
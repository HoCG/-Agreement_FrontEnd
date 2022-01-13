<template>
    <div id="mainWrapper">
        <ul class="MainFrame">
            <li>
                <ul id="ulTable">
                    <li>
                        <ul class="UlTitleSetting">
                            <li>&nbsp;</li>
                            <li>문서제목</li>
                            <li>수정</li>
                            <li>제출수</li>
                            <li>링크</li>
                            <li>공유</li>
                            <li>&nbsp;</li>
                        </ul>
                    </li>
                    <!-- 게시물이 출력될 영역 -->
                    <li
                        v-for="Document in this.UsersDocumentListInfo.documentInfo"
                        :key="Document.id">
                        <ul v-if="IsFirstDocument()" class="TitleAndItemsUl">
                            <li>
                                <DocumentState v-bind:StateInfo="Document.State"/>
                            </li>
                            <li>{{Document.documentTitle}}</li>
                            <li>{{Document.Link}}</li>
                            <li>{{Document.documentWritersCount}}</li>
                            <li>
                                <label class="switch-button">
                                    <input type="checkbox"/>
                                    <span class="onoff-switch"></span>
                                </label>
                            </li>
                            <li>&nbsp;</li>
                        </ul>
                        <ul v-else class="ItemsUl">
                            <li>
                                <DocumentState v-bind:StateInfo="Document.State"/>
                            </li>
                            <li>{{Document.documentTitle}}</li>
                            <li>{{Document.Link}}</li>
                            <li>{{Document.documentWritersCount}}</li>
                            <li>{{Document.documentWritersCount}}</li>
                            <li>
                                <label class="switch-button">
                                    <input type="checkbox"/>
                                    <span class="onoff-switch"></span>
                                </label>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul class="ItemsUl"></ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import DocumentState from "../components/DocumentState.vue";
    import UsersDocumentListInfo from "../assets/UsersDocumentListInfo.json";
    export default {
        data() {
            return {UsersDocumentListInfo: UsersDocumentListInfo}
        },
        methods: {
            EditDocument(){
                this.$store.commit("SET_PDF_FILE_UPLOAD_CHECK_TRUE");
            },
            IsFirstDocument() {
                if (this.FirstDocumentCheck) {
                    this.FirstDocumentCheck = false;
                    return true;
                } else if (!this.FirstDocumentCheck) {
                    return false;
                }
            }
        },
        components: {
            DocumentState
        }
    }
</script>
<style>
    li,
    ul {
        list-style: none;
        text-align: center;
        padding: 0;
        margin: 0;
    }

    #mainWrapper {
        padding-right: 50px;
        margin-top: 20px;
        background-color: white;
        width: 100%;
        height: 3000px;
    }
    #mainWrapper > ul > li:first-child {
        text-align: center;
        font-size: 14px;
        height: 40px;
        vertical-align: middle;
        line-height: 30px;
    }
    .UlTitleSetting > li {
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 23px;
    }
    #ulTable > li:first-child > ul > li {
        font-weight: bold;
        text-align: center;
    }
    #ulTable > li > ul {
        text-align: center;
        clear: both;
        position: relative;
        min-width: 40px;
    }
    #ulTable > li > ul > li {
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: center;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 23px;
        float: left;
        font-size: 10pt;
        vertical-align: baseline;
    }

    #ulTable > li > ul > li:first-child {
        width: 11%;
    }
    #ulTable > li > ul > li:first-child +li {
        width: 45%;
    }
    /*No 열 크기*/
    #ulTable > li > ul > li:first-child +li+li {
        width: 11%;
    }
    /*제목 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li {
        width: 11%;
    }
    /*작성일 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li {
        width: 11%;
    }
    /*작성자 열 크기*/
    #ulTable > li > ul > li:first-child +li+li+li+li+li {
        width: 11%;
    }
    #ulTable > li > ul > li:first-child +li+li+li+li+li+li {
        width: 11%;
    }
    .switch-button {
        position: relative;
        display: inline-block;
        width: 55px;
        height: 30px;
    }
    .switch-button input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .onoff-switch {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        background-color: #ccc;
        box-shadow: inset 1px 5px 1px #999;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .onoff-switch:before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 4px;
        bottom: 4px;
        background-color: #fff;
        -webkit-transition: 0.5s;
        transition: 0.4s;
        border-radius: 20px;
    }
    .switch-button input:checked + .onoff-switch:before {
        background-color: #F2D522;
        box-shadow: inset 1px 5px 1px #E3AE56;
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>
<template >
    <div class="backGroundInLogin">
        <div class="LoginRow">
            <input id="InputID" placeholder="학번" type="text" v-model="writer.schoolID"/>
            <input
                id="InputPassword"
                placeholder="학생이름"
                v-model="writer.name"
                type="text"/>
            <p class="MessageForm">{{this.Message}}</p>
            <button @click="goWritingPage" class="LoginBtn">작성시작</button>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            writer() {
                return this.$store.state.writer.currentWriter;
            }
        },
        data() {
            return {validationErrors: [], Message: "", documentName: this.$route.params.document_name};
        },
        methods: {
            goWritingPage() {
                if (typeof(parseInt(this.writer.schoolID)) === 'number' && typeof(this.writer.name) === 'string') {
                    if (this.writer.schoolID.length <= 2 && this.writer.name.length <= 4) {
                        this
                            .$router
                            .push({
                                path: "/WriterPage/" + this.documentName,
                                query: {}
                            })
                    } else {
                        this.Message = "학번 또는 이름이 너무 깁니다. 다시 작성해주세요."
                    }
                } else {
                    this.Message = "학번에는 숫자만 이름에는 문자만 작성해주세요."
                }
            },
            backStartPage() {
                this
                    .$router
                    .push({path: "/", query: {}})
            }
        }
    };
</script>
<style>
    .MessageForm {
        position: static;
        width: 255px;
        height: 18px;
        left: 4px;
        top: 0;
        font-family: Noto Sans KR;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        display: flex;
        align-items: center;

        /* Red_01 Alert */

        color: #FF0000;

        /* Inside auto layout */
        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 1;
        margin: 0 10px;
    }
    .LoginBtn {
        /* Auto layout */

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;

        position: static;
        width: 263px;
        height: 50px;
        left: 20px;
        top: 150px;

        /* gray_03 */

        background: #DADADA;
        font-family: Noto Sans CJK KR;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;

        /* gray_01 */

        color: #FFFFFF;
        /* Inside auto layout */

        flex: none;
        order: 1;
        flex-grow: 0;
        margin: 20px 0;
    }
    .backGroundInLogin {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #F3F3F3;
    }
    #InputID {
        padding-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        position: static;
        width: 263px;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #9F9F9F;
        box-sizing: border-box;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 5px 0;
    }
    #InputPassword {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        position: static;
        width: 263px;
        height: 50px;
        border: 1px solid #9F9F9F;
        box-sizing: border-box;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 5px 0;
    }
    .LoginRow {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: absolute;
        width: 303px;
        height: 240px;
        left: 40%;
        top: 40%;
        background: #FFFFFF;
        border-radius: 15px;
    }
    .BtnTextSetting {
        color: white;
        border: 900;
    }
    .LoginToolbar {
        text-align: center !important;
    }
    .fontSetting {
        color: black;
        border: 900;
    }
    .link {
        width: 100% !important;
        height: 100% !important;
        color: white !important;
        text-decoration: none !important;
    }
</style>
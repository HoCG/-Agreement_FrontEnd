<template >
    <div>
        <div class="login-backGround">
            <div v-if="state == 2" class="login-Row">
                <input class="login-input" placeholder="학번" type="text" v-model="writer.schoolID"/>
                <input
                    class="login-input"
                    placeholder="학생이름"
                    v-model="writer.name"
                    type="text"
                    @keyup.enter="goWritingPage"/>
                <div class="message">
                    {{this.Message}}
                </div>
                <button @click="goWritingPage" class="login-Btn">작성시작</button>
            </div>
            <div class="login-stop-row" v-else>
                <h3>공유되지 않은 문서입니다.</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import {getSubmittee} from '../apis/writer_api'
    export default {
        computed: {
            writer() {
                return this.$store.state.writer.currentWriter;
            }
        },
        mounted(){
            let self = this;
            getSubmittee(this.$route.params.document_name)
                .then(function (response) {
                    console.log(response.data);
                    self.state = response.data.state;
                    self.$store.commit("SET_DOCUMENT_TITLE", response.data.title);
                })
                .catch(function (error) {
                    console.log(error);
                    self.state = 0;
                }
            );
        },
        data() {
            return {validationErrors: [], Message: "", documentName: this.$route.params.document_name, state: 1};
        },
        methods: {
            goWritingPage() {
                //정규식으로 유효성 검사 실시.
                if (/^[0-9_-]{1,10}$/.test(this.writer.schoolID) && typeof(this.writer.name) === 'string') {
                    if (this.writer.schoolID.length <= 8 && this.writer.name.length <= 4) {
                        if(this.writer.name.length <= 1){
                            this.Message = "이름이 너무 짧습니다. 다시 입력해주세요."
                        }
                        else{
                            this
                                .$router
                                .push({
                                    path: "/WriterPage/" + this.documentName,
                                    query: {}
                                }
                            );
                        }
                    } else {
                        this.Message = "학번 또는 이름이 너무 깁니다. 다시 작성해주세요."
                    }
                } else {
                    this.Message = "학번에는 숫자만 이름에는 문자만 작성해주세요."
                }
            },
            backStartPage() {
                self.close();
            }
        }
    };
</script>
<style scoped>

    .message{
        color: red;
        font-size: 12px;
        margin: 0 auto;
        text-align: center;
        height: 12px;
    }
    .login-Btn {
        /* Auto layout */        
        
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

        margin-top:20px;

        /* gray_01 */

        color: #FFFFFF;
    }
    .login-backGround {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #F3F3F3;
    }
    .login-input {
        padding: 20px;
        margin-bottom: 10px;
        width: 263px;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #9F9F9F;
    }
    .login-Row {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: absolute;
        width: 303px;
        height: 240px;
        left: calc(50% - 151px);
        top: calc(50% - 120px);
        background: #FFFFFF;
        border-radius: 15px;
    }
    .login-stop-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: absolute;
        width: 303px;
        height: 240px;
        left: calc(50% - 150px);
        top: calc(50% - 120px);
        color: rgb(113, 113, 113);
    }
</style>
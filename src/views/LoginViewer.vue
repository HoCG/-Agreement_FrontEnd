<!--로그인 페이지-->
<template >
    <div class="backGroundInLogin">
        <div class="LoginRow">
            <input id="InputID" placeholder="ID" type="text" v-model="admin.id"/>
            <input
                id="InputPassword"
                placeholder="비밀번호"
                v-model="admin.password"
                type="password"/>
            <p class="MessageForm">{{this.Message}}</p>
            <button @click="findAdmin" class="LoginBtn">로그인</button>
            <Alert :dialog="true"/>
        </div>
    </div>
</template>

<script>
    import Alert from "../components/AlertForm.vue";
    export default {
        mounted() {
            if (!this.$store.state.admin.AllUsersInfo.map(u => u.id).includes("hostid")) {
                this.pushUserData();
            }
        },
        components: {
            Alert
        },
        computed: {
            admin() {
                return this.$store.state.admin.currentUser;
            }
        },
        data() {
            return {email: null, password: null, validationErrors: [], Message: ""};
        },
        methods: {
            pushUserData() {
                this.$store.state.admin.TheUser_usedByData.id = "hostid"
                this.$store.state.admin.TheUser_usedByData.password = "1234"
                this.$store.state.admin.TheUser_usedByData.userName = "관리자"
                this.$store.state.admin.TheUser_usedByData.userBirthDay = "2020-12-12"
                this.$store.state.admin.TheUser_usedByData.startDay = "0000-00-00"
                this.$store.state.admin.TheUser_usedByData.profileImage = require(
                    "../assets/Initial_account.png"
                );
                this
                    .$store
                    .commit("ADD_NEW_USER", this.$store.state.admin.TheUser_usedByData);
                this.$store.state.admin.TheUser_usedByData.id = "hostid2"
                this.$store.state.admin.TheUser_usedByData.password = "1234"
                this.$store.state.admin.TheUser_usedByData.userName = "관리자2"
                this.$store.state.admin.TheUser_usedByData.userBirthDay = "2020-12-12"
                this.$store.state.admin.TheUser_usedByData.startDay = "0000-00-00"
                this.$store.state.admin.TheUser_usedByData.profileImage = require(
                    "../assets/Initial_account.png"
                );
                this
                    .$store
                    .commit("ADD_NEW_USER", this.$store.state.admin.TheUser_usedByData);
            },
            findAdmin() {
                this
                    .$store
                    .commit('FIND_USER', this.admin);
                if (this.$store.state.admin.AllClear) {
                    this.Message = this
                        .$store
                        .commit('CURRENT_USER_SETTING', this.admin);
                    this
                        .$store
                        .commit("OPEN_ALERT_PAGE_OVER_MODE", "로그인 성공!");
                } else if (this.$store.state.admin.ID_or_PasswordError) {
                    this.Message = "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
                } else {
                    this.Message = "아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요."
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
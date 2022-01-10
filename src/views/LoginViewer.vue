<!--로그인 페이지-->
<template>
    <v-list justify-center="justify-center">
        <v-toolbar
            class="LoginToolbar"
            justify-center="justify-center"
            dark="dark"
            color="mainColor">
            <v-spacer></v-spacer>
            <h2 class="fontSetting">
                로그인 해주세요.
            </h2>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout justify-center="justify-center">
            <v-spacer></v-spacer>
            <v-form>
                <div class="LoginTextForm">
                    <v-text-field
                        prepend-icon="mdi-account"
                        name="login"
                        label="Login"
                        type="text"
                        v-model="admin.id"></v-text-field>
                    <v-text-field
                        prepend-icon="mdi-lock"
                        id="password"
                        name="password"
                        label="Password"
                        v-model="admin.password"
                        type="password"></v-text-field>
                </div>
            </v-form>
            <v-spacer></v-spacer>
        </v-layout>
        <v-layout justify-center="justify-center">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="mainColor" @click="findAdmin">
                   <h3 lass="BtnTextSetting">
                       로그인
                    </h3>
                </v-btn>
                <v-btn color="mainColor">
                    <router-link to="/CreateAdminPage" class="link">
                        <h3 class="fontSetting">
                            회원가입
                        </h3>
                    </router-link>
                </v-btn>
                <v-btn color="mainColor" @click="backStartPage">
                    <h3 class="BtnTextSetting">
                        뒤로가기
                    </h3>
                </v-btn>
            </v-card-actions>
        </v-layout>
        <Alert :dialog="true" />
    </v-list>
</template>

<script>
    import Alert from "../components/AlertForm.vue";
    export default {
        mounted() {
            if (!this.$store.state.admin.AllUsersInfo.map(u => u.id).includes("hostid")) {
                this.pushUserData();
            }
        },
        components:{
            Alert
        },
        computed: {
            admin() {
                return this.$store.state.admin.currentUser;
            }
        },
        data() {
            return {
                email: null, 
                password: null, 
                validationErrors: []};
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
                    this
                        .$store
                        .commit('CURRENT_USER_SETTING', this.admin);
                    this
                        .$store
                        .commit("OPEN_ALERT_PAGE_OVER_MODE", "로그인 성공!");
                    } else if (this.$store.state.admin.ID_or_PasswordError) {
                    this.$store.commit("OPEN_ALERT", "비밀번호가 틀렸습니다. 다시 입력해주세요.");
                } else {
                    this.$store.commit("OPEN_ALERT", "아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.");
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
    .BtnTextSetting {
        border: 900;
    }
    .LoginTextForm {
        margin-top: 5%;
        width: 700px;
    }
    .LoginToolbar {
        text-align: center !important;
    }
    .fontSetting {
        color: black;
        border: 900;
    }
    .LoginForm {
        width: 500px;
    }
    .link {
        width: 100% !important;
        height: 100% !important;
        color: white !important;
        text-decoration: none !important;
    }
</style>
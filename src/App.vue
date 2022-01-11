<template>
    <v-app>
        <v-app-bar color="#5C5C5C" app="app" height="50%">
            <div class="d-flex align-center">
                <h2 class="appbarColor">서비스 로고</h2>
            </div>
            <v-spacer></v-spacer>
            <input v-model="this.$store.state.PDFInfo.PDFTitle" class="appbarColor">
            <v-spacer></v-spacer>
            <button v-if="this.$store.state.admin.LoginMode" @click="Logout" class="appbarColor" id="LogoutBtn">로그아웃</button>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data: () => ({
            //
        }),
        methods:{
            Logout(){
                this
                    .$router
                    .push({path: '/LoginPage'})
                    .catch(() => {})
            }
        }
    };
</script>
<style>
    .LogoutBtn  {
        font-size: 40px;
        color: white;
    }
    .appbarColor {
        font-size: 30px;
        color: white;
    }
</style>
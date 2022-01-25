<template>
    <v-app>
        <v-app-bar class="AppBarSet" color="#5C5C5C" app="app">
            <div class="d-flex align-center">
                <h2 class="appbarColor">서비스 로고</h2>
            </div>
            <v-spacer></v-spacer>
            <h2 v-if="this.$store.state.PDFScreenInfo.PDFWriteComplete"><u>{{this.$store.state.PDFScreenInfo.PDFTitle}}</u></h2>
            <h3 v-if="this.$store.state.PDFScreenInfo.PDFWriteComplete">    
                이 작성이 완료되었습니다.
            </h3>     
            <input v-else v-model="this.$store.state.PDFScreenInfo.PDFTitle" class="appbarColor">       
            <v-spacer></v-spacer>
            <button v-if="this.$store.state.admin.LoginMode" @click="Logout" class="appbarColor" id="LogoutBtn">로그아웃</button>
            <WriteAction v-if="this.$store.state.PDFScreenInfo.PDFWriteComplete"/>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
    import WriteAction from './components_for_writer_view/WriteAction'
export default {
        name: 'App',
        components: {
            WriteAction
        },
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
    .AppBarSet{
        z-index: 3000;
        height: 84px;
    }
    .LogoutBtn  {
        font-size: 40px;
        color: white;
    }
    .appbarColor {
        font-size: 32px;
        min-width: 147px;
        color: white;
    }
</style>
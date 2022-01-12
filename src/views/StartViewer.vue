<template>
    <v-card justify-center="justify-center" class="StartView">
        <h1 id="textTitleEffect">
            Welcome To Our Project.
        </h1>
        <v-layout class="btnLayout" justify-center="justify-center">
            <v-spacer></v-spacer>
            <v-btn color="BtnColor1" @click="goUserPage" class="goPageBtn" width="300px" height="300px">
                <p class="btnText">작성자</p>
            </v-btn>
            <v-btn color="BtnColor2" @click="goWriterPage" class="goPageBtn" width="300px" height="300px">
                <p class="btnText">제출자</p>
            </v-btn>
            <v-spacer></v-spacer>
        </v-layout>
    </v-card>
</template>
<script>
    export default {
        mounted() {
            if(!this.$store.state.admin.LoginMode){
                this
                    .$router
                    .push({path: '/LoginPage'})
                    .catch(() => {});
            }
        },
        data() {
            return {
                TextCounter: 0
            }
        },
        methods: {
            goUserPage(){
                this
                    .$router
                    .push({path: '/UserPage'})
                    .catch(() => {})
            },
            goWriterPage(){             
                this.$store.commit("LOGOFF_USER");
                this
                    .$router
                    .push({path: '/WriterPage'})
                    .catch(() => {})
            }
        }
    }
</script>
<style>
    .btnText    {
        font-size: 40px;
        font-weight: 800;
    }
    .StartView  { 
        width: 100%;
        height: 100%;
    }
    #textTitleEffect { 
        text-align: center;
        font-size: 60px;
        background: linear-gradient(to right top, #861657, #ffa69e);
        color: transparent;
        -webkit-background-clip: text;
    }
    .btnLayout{
        text-align: center;
        display: flex;
        align-items: center;
    }
    .goPageBtn{
        margin-left: 2%;
        margin-top: 2%;
        text-align: center;
        font-size: 14;
        font-weight: 800;
    }
</style>
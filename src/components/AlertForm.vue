<!--사용자에게 알람을 띄어주는 vue파일입니다.-->
<template>
    <v-row justify="center">
        <v-dialog width="400" persistent v-model="alert">
            <v-card>
                <v-spacer></v-spacer>
                <div class="alert-margin ml-5 font-weight-light">
                    <span class="alert-margin">
                        {{
                            this.$store.state.Alert.alertText
                        }}
                    </span>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="close()" color="red darken-1" text>OK!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        name: "EventDetail",
        computed: {
            alert() {
                //이렇게 다이얼로그라는 매체로 연결하여 vuex에서 false가 되더라도 그 내용이 반영될 수 있도록 수정.
                return this.$store.state.Alert.alertShow;
            },
            alertText() {
                return this.$store.state.Alert.alertText;
            }
        },
        methods: {
            close() {
                this.$store.state.Alert.alertShow = false;
                if(this.$store.state.Alert.pageOverMode === true){
                    this.$store.state.Alert.pageOverMode = false;
                    this
                        .$router
                        .push({path: '/', params: {}})
                        .catch(() => {})
                }
            }
        }
    }
</script>
<style>
    .alert-margin{
        padding-top: 5%;
    }
</style>
<template>
    <v-app>
        <v-app-bar app="app" height="50%">
            <div class="d-flex align-center">
                <h2>서비스 로고</h2>
            </div>
            <v-spacer></v-spacer>
            <h2>
                {{
                    this.$store.state.PDFInfo.PDFTitle
                }}
            </h2>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
    //import DragAndDropFile from './views/DragAndDropFile.vue';

    export default {
        name: 'App',
        components: {},
        data: () => ({
            //
        })
    };
</script>
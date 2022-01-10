<template>
    <div>
        <v-img :src="this.$store.state.admin.currentUser.profileImage"></v-img>
        <button class="documentShowBtn">내 문서 리스트</button>
        <button class="documentShowBtn">제출받은 문서 리스트</button>
    </div>
</template>
<script>
    export default {

    }
</script>
<style>
    .documentShowBtn {
        width: 100%;
        text-align: center;
    }
</style>
<template>
  <div class="list-wrapper">
      <div class="list-header">
          <div class="list-header-status">
              공유 상태
          </div>
          <div class="list-header-title">
              문서 제목
          </div>
          <div class="list-header-submittees">
              제출 수
          </div>
          <div class="list-header-sharing">
              링크 공유
          </div>
          <div class="list-header-etc">
              기타
          </div>
      </div>

      <div class="list-em">


      </div>
  </div>
</template>

<script>
export default {

    props: [

    ],

    methods: {

    },



}
</script>

<style lang="scss">

    .list-wrapper{
        width: 80%;
        margin: 0 auto;
    }

    .list-header{
        display: flex;
        font-size: 16px;
        font-weight: bold;
        justify-content: space-between;

        &.title{

        }
    }

</style>
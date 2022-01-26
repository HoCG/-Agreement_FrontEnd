<template>
  <div>
      <div class="list-em">
          <div class="list-em-title">{{project.documentTitle}}</div>
          <div class="list-em-count">{{project.documentWriter.length}}</div>
          <div class="list-em-date">-</div>
          <div class="list-em-name">-</div>
          <div class="list-em-download">-</div>
          <div class="list-em-etc">open</div>
      </div>
      <div
      v-for="projectWriter in project.documentWriter"
      :key="projectWriter.id"
      :writer="projectWriter"
      >
        zz
      </div>
  </div>
</template>

<script>
export default {

    props: [
        "project"
    ],

    mounted() {
        console.log(this.project);
    }
}
</script>

<style lang="scss" scoped>

    .list-em{
        display: flex;
        font-size: 15px;
        color: #5C5C5C;
        justify-content: space-between;
        height: 43px;
        line-height: 43px;
        border: 1px solid #DADADA;
        border-radius: 5px;
        margin-top: 10px;

        &-title{
            width: 200px;
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &-count{
            min-width: 80px;
        }
        &-date{
            min-width: 200px;
        }
        &-name{
            min-width: 120px;
        }
        &-download{
            min-width: 120px;
        }
        &-etc{
            min-width: 80px;
        }
    }

</style>
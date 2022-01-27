<template>
  <div class="list-em-wrapper">
      <div class="list-em">
          <div class="list-em-title">{{project.documentTitle}}</div>
          <div class="list-em-count">{{project.documentWriter.length}}</div>
          <div class="list-em-date">-</div>
          <div class="list-em-name">-</div>
          <div class="list-em-download">-</div>
          <div class="list-em-etc">
            <arrow-button
            :toggle="toggleOn"
            @click.native="toggle"
            />
          </div>
      </div>
      <submittee
      v-for="projectWriter in project.documentWriter"
      :style="toggleOn ? {display: 'flex'} : {display: 'none'}"
      :key="projectWriter.id"
      :writer="projectWriter"
      :project-title="project.documentTitle"
      />
      <div class="division-line"></div>
  </div>
</template>

<script>
import ArrowButton from '../components/ArrowButton.vue';
import Submittee from './Submittee.vue';
export default {
  components: { Submittee, ArrowButton },

    props: [
        "project"
    ],

    data: () => {
        return {
            toggleOn: false,
        }
    },

    methods: {
        toggle(){
            this.toggleOn = !this.toggleOn;
        }

    },

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
            padding: 0 10px;
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

    .division-line{
        margin-top: 10px;
        border-bottom: 1px solid #f3f3f3;
    }


</style>
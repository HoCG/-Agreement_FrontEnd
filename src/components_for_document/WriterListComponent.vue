<template>
    <div>
        <div class="list-wrapper">
            <div class="list-header">
                <div class="list-header-title">
                    문서 제목
                </div>
                <div class="list-header-count">
                    제출 수
                </div>
                <div class="list-header-date">
                    제출 일시
                </div>
                <div class="list-header-name">
                    제출자
                </div>
                <div class="list-header-download">
                    다운로드
                </div>
                <div class="list-header-etc">
                </div>      
            </div>
            <writer-list-element-component
            v-for="project in this.$store.state.UsersDocument.DocumentArr"
            :key="project.id"
            :project="project"
            />
        </div>
    </div>
</template>

<script>
import WriterListElementComponent from './WriterListElementComponent.vue'
export default {
  components: { WriterListElementComponent },

}
</script>

<style lang="scss" scoped>
    .list-wrapper{
        width: calc(100% - 80px);
        margin: 0 auto;
        padding: 30px 0 0 0;
    }
    .list-header{
        display: flex;
        font-size: 15px;
        font-weight: bold;
        color: #5C5C5C;
        justify-content: space-between;
        height: 43px;
        border-bottom: 2px solid #767676;

        &-title{
            min-width: 200px;
            flex-grow: 1;
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
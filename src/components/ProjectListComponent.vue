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
                <document-state-action v-bind:DocumentInfo="Document"/>
            </div>
            <div class="list-header-etc">
                
            </div>      
      </div>

        <div class="list-em">
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
                공유중
            </div>
            <div class="list-header-etc">
            기타
            </div>
        </div>  
  </div>
</template>

<script>
import DocumentStateAction from '../components_for_document/DocumentStateAction.vue'
export default {
  components: { DocumentStateAction },

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
        padding: 30px 0;
    }

    .list-header{
        display: flex;
        font-size: 15px;
        font-weight: bold;
        color: #5C5C5C;
        justify-content: space-between;
        height: 43px;
        border-bottom: 2px solid #767676;

        &-status{
            width: 84px;
        }
        &-title{
            width: 480px;
            flex-grow: 1;
        }
        &-submittees{
            width: 60px;
        }
        &-sharing{
            width: 120px;
        }
        &-etc{
            width: 43px;
        }
    }


    .list-em{
        display: flex;
        font-size: 15px;
        justify-content: space-between;
        height: 44px;
        line-height: 44px;

        border-bottom: 1px solid #DADADA;

    }

</style>
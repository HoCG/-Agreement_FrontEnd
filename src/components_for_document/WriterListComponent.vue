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

            <div class="button-wrapper">
                <button 
                @click="setPage(isNext = false)"
                class="page-button">이전</button> 
                <button 
                @click="setPage(isNext = true)"
                class="page-button">다음</button>
            </div>
        </div>
    </div>
</template>

<script>
import WriterListElementComponent from './WriterListElementComponent.vue'
export default {
    data: () => {
        return {
            page: 0,
            totalPage: 0,
        }
    },
    components: { WriterListElementComponent },

    mounted() {
            this.$store.dispatch('REQUEST_PROJECT', 0);
    },

    methods: {
        setPage(isNext){
                if(isNext){
                    this.totalPage = this.$store.state.UsersDocument.projectTotalPage;
                    if(this.page < this.totalPage){
                        this.$store.dispatch('REQUEST_PROJECT', this.page + 1);
                        this.page +=1;
                    }else{
                        alert("마지막 페이지 입니다.");
                    }
                }else{
                    if(this.page == 0){
                        alert("첫번째 페이지 입니다.");
                        return;
                    }
                    this.$store.dispatch('REQUEST_PROJECT', this.page - 1);
                    this.page -=1;
                }
            },
    }

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

    .button-wrapper{
        height: 60px;

        .page-button{
            margin: 5px 5px 0 0;
            float: left;
            width: 50px;
            height: 50px;
            line-height: 50px;
            background-color: #c2c2c2;
            font-weight: bold;
            color: white;
            border-radius: 5px;
            &:hover{
                background-color: #838383;
            }
        }   
    }
</style>
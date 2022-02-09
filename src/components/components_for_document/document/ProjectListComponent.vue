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
            <div class="list-header-sharing"></div>
            <div class="list-header-etc"></div>
        </div>
        <ProjectListElementComponent
            v-for="Document in this.$store.state.UsersDocument.DocumentArr"
            :key="Document.id"
            :document="Document"/>

        <button 
        @click="setPage(isNext = false)"
        class="page-button">이전</button> 
        <button 
        @click="setPage(isNext = true)"
        class="page-button">다음</button>
    </div>
</template>

<script>
    import ProjectListElementComponent from './ProjectListElementComponent.vue'
    export default {
        data: () => {
            return {
                menuDocument: {},
                page: 0,
                totalPage: 0,
            }
        },
        components: {
            ProjectListElementComponent
        },
        props: [],
        mounted() {
            this.$store.dispatch('REQUEST_PROJECT', 0);
            console.log(this.$store.state.UsersDocument.projectTotalPage);
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
            goEditScreen(Document) {
                if (Document.State === 1) {
                    this
                        .$router
                        .push({
                            path: '/EditView',
                            query: {
                                getDocumentData: Document
                            }
                        })
                        .catch();
                }
            },
            showDocumentMenu(Document, event) {
                let Menu = document.getElementById("DocumentMenu");
                this.MenuDocument = Document;
                Menu.style.display = "block";
                Menu.style.left = event.pageX - Menu
                    .getBoundingClientRect()
                    .width / 2 + "px";
                Menu.style.top = event.pageY - Menu
                    .getBoundingClientRect()
                    .height / 2 + "px";
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">

    .list-wrapper {
        width: calc(100% - 80px);
        margin: 0 auto;
        padding: 30px 0;
    }

    .list-header {
        display: flex;
        font-size: 15px;
        font-weight: bold;
        color: #5C5C5C;
        justify-content: space-between;
        height: 43px;
        border-bottom: 2px solid #767676;

        &-status {
            min-width: 84px;
        }
        &-title {
            min-width: 200px;
            flex-grow: 1;
        }
        &-submittees {
            min-width: 60px;
        }
        &-sharing {
            min-width: 120px;
        }
        &-etc {
            min-width: 43px;
        }
    }

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
</style>
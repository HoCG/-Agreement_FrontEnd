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
                
            </div>
            <div class="list-header-etc">
                
            </div>      
      </div>
        <project-list-element-component
        v-for="Document in this.$store.state.UsersDocument.DocumentArr"
        :key="Document.id"
        :document="Document"
        />
  </div>
</template>

<script>
import ProjectListElementComponent from './ProjectListElementComponent.vue'
export default {
    components: { ProjectListElementComponent },
    props: [
        
    ],
    methods: {
        goEditScreen(Document) {
            if (Document.State === 1) {
                this
                    .$router
                    .push({
                        //name: "EditPage로 가는 데이터",
                        path: '/EditView',
                        query: {
                            getDocumentData: Document
                        }
                    }
                ).catch();
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
            console.log(this.MenuDocument);
        },
    },
}
</script>

<style lang="scss" scoped>

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
            min-width: 84px;
        }
        &-title{
            min-width: 200px;
            flex-grow: 1;
        }
        &-submittees{
            min-width: 60px;
        }
        &-sharing{
            min-width: 120px;
        }
        &-etc{
            min-width: 43px;
        }
    }

</style>
<template>
    <div>
        <div class="list-em">
            <div class="list-em-status">
                <DocumentStateShow
                    class="list-em-status-button"
                    v-bind:StateInfo="document.State"
                    v-bind:WritersCountInfo="document.documentWritersCount"/>
            </div>
            <div class="list-em-title">
                <button @click="goEditScreen(document)">
                    {{document.documentTitle}}
                </button>
            </div>
            <div class="list-em-submittees">
                {{document.documentWritersCount}}
            </div>
            <div class="list-em-sharing">
                <DocumentStateAction
                class="list-em-sharing-button"
                v-bind:DocumentInfo="document"/>
            </div>
            <div class="list-em-etc">
                <button 
                class="list-em-etc-button"
                @click="showDocumentMenu(document, $event)">
                    <DotsBtn/>
                </button>
            </div>
        </div>  
        <DocumentMenu
            v-if="this.isMenuOn"
            v-bind:menu-document="document"
            @toggle="menuToggle"
            id="DocumentMenu"/>
    </div>
</template>

<script>
import DocumentMenu from '../components_for_document/DocumentMenu.vue';
import DocumentStateAction from '../components_for_document/DocumentStateAction.vue';
import DocumentStateShow from '../components_for_document/DocumentStateShow.vue';
import DotsBtn from '../svgs/DotsSVG.vue';


export default {
    components: { DocumentStateShow, DocumentStateAction, DotsBtn, DocumentMenu },
    name: "ProjectListElementComponent",

    data: () => {
        return {
            isMenuOn: false,
        }
    },

    props: [
        "document"
    ],

    methods:{
        menuToggle(toggle) {
            this.isMenuOn = toggle;
        },
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
        showDocumentMenu() {
            if(this.isMenuOn == true)
                this.isMenuOn = false;
            else
                this.isMenuOn = true;
            // let Menu = document.getElementById("DocumentMenu");
            // Menu.style.display = "block";
            // Menu.style.left = event.pageX - Menu
            //     .getBoundingClientRect()
            //     .width / 20 + "px";
            // Menu.style.top = event.pageY - Menu
            //     .getBoundingClientRect()
            //     .height / 2 + "px";
        },
    }

}
</script>

<style lang="scss" scoped>

    .list-em{
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        height: 60px;
        line-height: 44px;
        border-bottom: 1px solid #DADADA;

        &-status{
            min-width: 84px;
            
            &-button{
                margin-top: 18px;//요소 가운데정렬 다른방법 찾아야함
            }
        }
        &-title{
            flex-grow: 1;
            min-width: 200px;
            white-space: nowrap;
            line-height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;

        }
        &-submittees{
            min-width: 60px;
            line-height: 60px;
        }
        &-sharing{
            min-width: 120px;

            &-button {
                margin-top: 15px; //요소 가운데정렬 다른방법 찾아야함
            }
        }
        &-etc{
            min-width: 43px;

            &-button {
                margin-top: 7px; //요소 가운데정렬 다른방법 찾아야함
            }
        }
    }

</style>
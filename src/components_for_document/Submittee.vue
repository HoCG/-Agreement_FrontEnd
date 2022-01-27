<template>
    <div class="submittee-em">
        <div class="submittee-em-title">{{this.projectTitle}}</div>
        <div class="submittee-em-count">-</div>
        <div class="submittee-em-date">{{this.date}}</div>
        <div class="submittee-em-name">{{writer.writer}}</div>
        <div class="submittee-em-download">다운로드</div>
        <div class="submittee-em-etc"
        @click="ShowWriterDocument" >
            문서보기
        </div>
    </div>
</template>

<script>
export default {

    data: () => {
        return {
            date: "",
        }
    },

    props: ["writer", "project-title"],
    methods: {
        ShowWriterDocument(){
            this.$store.commit("SET_CURRENT_WRITER", this.writer)
            this
                .$router
                .push({path: '/WritersPDF'})
                .catch(() => {});
        }
    },
    mounted() {
        console.log(this.writer);
        const dateArr = this.writer.date.split("T");
        this.date = dateArr[0] + " " + dateArr[1];
    }

}
</script>

<style lang="scss" scoped>
    .submittee-em{
        display: flex;
        font-size: 15px;
        color: #5C5C5C;
        background-color: #F3F3F3;
        justify-content: space-between;
        height: 43px;
        line-height: 43px;
        border: 1px solid #DADADA;
        border-radius: 5px;
        margin-top: 1px;

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
            &:hover{
                cursor: pointer;
            }
        }
    }

</style>
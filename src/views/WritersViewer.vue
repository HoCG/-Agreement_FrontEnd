<template>
    <v-card>
        <div>
            <h1></h1>
        </div>
        <div id="drawerScrollBox" class="pdfViewer">
            <div id="drawer">
                <pdf v-for="i in numPages" :key="i" :page="i" style="width: 70%" :src="src"></pdf>
            </div>
        </div>
        <div class="checkLayout">
            <button class="checkBtn">제출</button>
        </div>
        <SignDialog :dialog="true"/>
    </v-card>
</template>
<script>
    import pdf from 'vue-pdf';
    import SignDialog from '../components/SignDialog.vue';
    import JsonFile from '../assets/testJsonFile.json'
    let loadingTask = pdf.createLoadingTask(
        "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"
    );
    export default {
        mounted(){
             this.src.promise.then(pdf => {
                this.numPages = pdf.numPages;
            });
        },
        data() {
            return {
                //useForJsonFile
                documentTitle: "",
                isDragged: "",
                src: loadingTask,
                numPages: undefined,
                itemLength: 0,
                selectedID: "",
                imageID: "",
                selectedItem: 1,
                selectedItemText: "",
                items: [
                    {
                        text: '도장',
                        icon: ' mdi-stamper'
                    }, {
                        text: '서명',
                        icon: 'mdi-pencil'
                    }, {
                        text: '텍스트',
                        icon: 'mdi-comment-text-outline '
                    }
                ]
            }
        },
        methods: {
            initWritersView(){
                for(let object of JsonFile.objects){
                    if(object.id === 1){
                        this.drawingTextObject(object)
                    }
                    else if(object.id === 2){
                        this.drawingImgObject(object)
                    }
                }
            },
            drawingTextObject(){

            },
            drawingImgObject(){

            }
        },
        components: {
            SignDialog,
            pdf
        }
    }
</script>
<style>
    .pdfViewer {
        overflow: scroll;
        height: 60%;
    }
    .checkLayout{
        margin-top: 5%;
        margin-bottom: 5%;
        width: 100%;
        text-align: center;
        align-items: center;
    }
    .checkBtn{
        font-size: 30;
        font-weight: 800;
        width: 200px;
        height: 50px;
        border-radius: 8px;
        border: 3px solid  #4c384a;
    }
</style>
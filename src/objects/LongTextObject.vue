<template>
    <div class="LongTextObjectArea">
        <p id="textForm">
            긴 글{{getLTData.id}}
        </p>
        <svg
            v-bind:id="getLTData.htmlID+'DeleteBtn'+getLTData.id"
            @mousedown="DeleteElement"
            class="CloseBtn"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#767676"/>
            <path
                d="M14.5111 5.18555L10.3704 9.32629L6.22963 5.18555L5.18518 6.22999L9.32592 10.3707L5.18518 14.5115L6.22963 15.5559L10.3704 11.4152L14.5111 15.5559L15.5556 14.5115L11.4148 10.3707L15.5556 6.22999L14.5111 5.18555Z"
                fill="white"/>
        </svg>
        <div class="resizer-r"></div>
        <div @mousedown="mouseDownHandler" class="resizePoint"></div>
        <div class="resizer-b"></div>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getLTData: Object
        },
        data() {
            return {resizeX: 0, resizeY: 0, resizeW: 0, resizeH: 0}
        },

        mounted() {
            ObjectEvent.myFunction(this.getLTData);
        }, 
        /*  
        updated() { 
            if(document.getElementById("page" + 1)!==null){
                ObjectEvent.myFunction(this.getLTData);
            }
        },
        */
        methods: {
            mouseDownHandler(e) {
                e.stopPropagation();
                // Get the current mouse position
                const Element = document.getElementById(this.getLTData.htmlID);
                const styles = window.getComputedStyle(Element);
                this.resizeX = e.clientX;
                this.resizeY = e.clientY;
                this.resizeW = parseInt(styles.width, 10);
                this.resizeH = parseInt(styles.height, 10);
                // Attach the listeners to `document`
                document.addEventListener('mousemove', this.mouseMoveHandler);
                document.addEventListener('mouseout', this.mouseMoveHandler);
                document.addEventListener('mouseup', this.mouseUpHandler);
            },
            mouseMoveHandler(e) {
                const Element = document.getElementById(this.getLTData.htmlID);
                // How far the mouse has been moved
                const dx = e.clientX - this.resizeX;
                const dy = e.clientY - this.resizeY;
                // Adjust the dimension of element
                Element.style.width = `${this.resizeW + dx}px`;
                Element.style.height = `${this.resizeH + dy}px`;
            },
            mouseUpHandler() {
                document.removeEventListener('mousemove', this.mouseMoveHandler);
                document.removeEventListener('mouseout', this.mouseMoveHandler);
                document.removeEventListener('mouseup', this.mouseUpHandler);
            },
            DeleteElement(e){
                e.stopPropagation();
                const Element = document.getElementById(this.getLTData.htmlID);
                Element.remove();
                this.$store.commit("DELETE_LONGTEXT_OBJECT", this.getLTData.htmlID);
            }
        }
    }
</script>
<style>
    .CloseBtn {
        bottom: 100%;
        left: 90%;
        position: absolute;
    }
    #textForm {
        z-index: 10;
        width: 100%;
        height: 25px;
        bottom: 100%;
        position: absolute;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .LongTextObjectArea {
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: none;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
        width: 100px;
        height: 100px;
    }
    /* Placed at the right side */
    .resizePoint{
        z-index: 2000;
        position: absolute;
        cursor: se-resize;
        height: 10px;
        right: 0;
        bottom: 0;
        width: 10px;
    }
    .resizer-r {
        z-index: 2000;
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        width: 5px;
    }
    /* Placed at the bottom side */
    .resizer-b {
        z-index: 2000;
        position: absolute;
        bottom: 0;
        height: 5px;
        left: 0;
        width: 100%;
    }
</style>
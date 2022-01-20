<template>
    <div class="SignObjectArea">
        <p id="textForm">
            사인{{getSOData.id}}
        </p>
        <p id="SignText">
            서명
        </p>
        <svg
            @mousedown="DeleteElement"
            v-bind:id="getSOData.htmlID+'DeleteBtn'+getSOData.id"
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
            getSOData: Object
        },
        data() {
            return {resizeX: 0, resizeY: 0, resizeW: 0, resizeH: 0}
        },
        mounted() {
            ObjectEvent.myFunction(this.getSOData)
        },
        methods: {
            DeleteElement(e) {
                e.stopPropagation();
                const Element = document.getElementById(this.getSOData.htmlID);
                Element.remove();
                this.$store.commit("DELETE_SIGN_OBJECT", this.getSOData.htmlID);            
            },
            mouseDownHandler(e) {
                e.stopPropagation();
                // Get the current mouse position
                let Element = document.getElementById(this.getSOData.htmlID)
                this.resizeX = e.clientX;
                this.resizeY = e.clientY;
                const styles = window.getComputedStyle(Element);
                this.resizeW = parseInt(styles.width, 10);
                this.resizeH = parseInt(styles.height, 10);
                // Attach the listeners to `document`
                document.addEventListener('mousemove', this.mouseMoveHandler);
                document.addEventListener('mouseout', this.mouseMoveHandler);
                document.addEventListener('mouseup', this.mouseUpHandler);
            },
            mouseMoveHandler(e) {
                let Element = document.getElementById(this.getSOData.htmlID);
                // How far the mouse has been moved
                const dx = e.clientX - this.resizeX;
                const dy = e.clientY - this.resizeY;
                // Adjust the dimension of element
                Element.style.width = `${this.resizeW + dx}px`;
                Element.style.height = `${this.resizeH + dy}px`;
                this.$store.commit("SET_SIGN_WIDTH", parseInt(this.resizeW + dx));
                this.$store.commit("SET_SIGN_HEIGHT", parseInt(this.resizeH + dy));
                this.$store.commit("FIND_AND_SETTING_W_H_SIGN_OBJECT", this.getSOData.htmlID);
            },
            mouseUpHandler() {
                document.removeEventListener('mousemove', this.mouseMoveHandler);
                document.removeEventListener('mouseout', this.mouseMoveHandler);
                document.removeEventListener('mouseup', this.mouseUpHandler);
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
    #SignText{
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .SignObjectArea {
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
    .resizePoint{
        z-index: 2000;
        position: absolute;
        cursor: se-resize;
        height: 15px;
        right: 0;
        bottom: 0;
        width: 15px;
        border-radius: 50%;
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
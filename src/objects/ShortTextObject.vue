<template>
    <div v-bind:id="getData.id" class="ShortTextObjectArea">
        <p id="textForm">
            "짧은 글_"{{getData.id}}
        </p>
        <div @mousedown="mouseDownHandler" class="resizer resizer-b"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                getData: Array,
                resizeX: 0,
                resizeW: 0,
                Element: document.getElementById(this.getData.id)
            }
        },
        methods: {
            mouseDownHandler(e) {
                    e.stopPropagation();
                    // Get the current mouse position
                    this.resizeX = e.clientX;
                    const styles = window.getComputedStyle(this.Element);
                    this.resizeW = parseInt(styles.width, 10);
                    // Attach the listeners to `document`
                    document.addEventListener('mousemove', this.mouseMoveHandler);
                    document.addEventListener('mouseout', this.mouseMoveHandler);
                    document.addEventListener('mouseup', this.mouseUpHandler);
            },
            mouseMoveHandler(e){
                    // How far the mouse has been moved
                    const dx = e.clientX - this.resizeX;
                    // Adjust the dimension of element
                    this.Element.style.width = `${this.resizeW + dx}px`;
            },
            mouseUpHandler(){
                    document.removeEventListener('mousemove', this.mouseMoveHandler);
                    document.removeEventListener('mouseout', this.mouseMoveHandler);
                    document.removeEventListener('mouseup', this.mouseUpHandler);
            }
        }
    }
</script>
<style>
    .textForm {
        z-index: 10;
        width: 100%;
        height: 25px;
        bottom: 100%;
        position: absolute;
    }
    .ShortTextObjectArea {
        align-items: center;
        box-shadow: 5px 5px 5px;
        font-weight: 800;
        display: flex;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #DADADA;
        position: absolute;
        width: 100px;
        height: 100px;
    }
    .resizer {
        position: absolute;
    }
    /* Placed at the bottom side */
    .resizer-b {
        z-index: 2000;
        position: absolute;
        bottom: 0;
        cursor: row-resize;
        height: 5px;
        left: 0;
        width: 100%;
    }
</style>
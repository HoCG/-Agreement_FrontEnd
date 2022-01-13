<template>
    <div class="CheckBoxObjectArea">
        <!-- <p id="textForm"> 체크박스{{getCBData.id}} </p> -->
        <svg
            v-bind:id="getCBData.htmlID+'DeleteBtn'+getCBData.id"
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
        <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"><path
            d="M15.9286 18.5H3.07143C1.65127 18.5 0.5 17.3487 0.5 15.9286V3.07143C0.5 1.65127 1.65127 0.5 3.07143 0.5H15.9286C17.3487 0.5 18.5 1.65127 18.5 3.07143V15.9286C18.5 17.3487 17.3487 18.5 15.9286 18.5ZM3.07143 3.07143V15.9286H15.9286V3.07143H3.07143Z"
            fill="#5C5C5C"/></svg>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getCBData: Object
        },
        mounted() {
            setTimeout(ObjectEvent.myFunction(this.getCBData), 5000);
        },
        methods: {
            DeleteElement(e){
                e.stopPropagation();
                const Element = document.getElementById(this.getCBData.htmlID);
                Element.remove();
            }
        }
    }
</script>
<style>
    .CloseBtn {
        bottom: 90%;
        left: 80%;
        position: absolute;
    }
    .CheckBoxObjectArea {
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
        width: 30px;
        height: 30px;
    }
    #textForm {
        z-index: 10;
        width: 100px;
        height: 25px;
        bottom: 100%;
        position: absolute;
    }
</style>
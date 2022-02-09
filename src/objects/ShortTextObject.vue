<template>
    <div class="short-text-object-area">
        <p id="text-form">
            짧은 글{{getSTData.id}}
        </p>
        <svg
            @mousedown="deleteElement"
            v-bind:id="getSTData.htmlID+'DeleteBtn'+getSTData.id"
            class="ShortTextCloseBtn"
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
        <!--
        <div class="styleSetting" v-bind:id="'ShortTextStyleSetter'+getSTData.id">
            <div @click=""></div>
            <div @click="">
                <svg
                    width="39"
                    height="20"
                    viewBox="0 0 39 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_128_4731)">
                        <rect width="39" height="20" rx="2" fill="#F3F3F3"/>
                        <path
                            d="M9.812 12.15H10.904V4.758H9.812V7.782H8.146V8.72H9.812V12.15ZM8.636 10.246C7.32 10.512 6.2 10.568 4.422 10.568V8.818H7.572V7.922H4.422V6.298H8.062V5.374H3.316V11.492H4.114C6.116 11.492 7.292 11.45 8.734 11.156L8.636 10.246ZM4.884 13.774H12.192V17.036H13.34V12.85H4.884V13.774ZM12.234 4.492V12.262H13.34V4.492H12.234ZM26.4429 10.792C24.2449 10.372 21.8649 8.468 21.8649 6.326V5.36H20.6609V6.326C20.6609 8.468 18.2949 10.358 16.0969 10.792L16.6149 11.744C18.5049 11.296 20.4649 9.952 21.2629 8.118C22.0609 9.966 24.0209 11.31 25.9249 11.744L26.4429 10.792ZM15.6209 14.404V15.356H27.0029V14.404H15.6209ZM38.5798 11.254H31.1178V9.266H38.1738V8.356H31.1178V6.494H38.4538V5.57H29.9558V12.178H38.5798V11.254ZM28.4858 14.474V15.412H39.8818V14.474H28.4858ZM50.1707 6.676H42.8347V9.364H51.5287V8.538H43.9687V7.46H51.3047V4.842H42.8067V5.654H50.1707V6.676ZM43.8987 14.88H51.3467V12.206H42.7367V13.032H50.2127V14.082H42.7647V16.868H51.7387V16.042H43.8987V14.88ZM41.3787 10.316V11.184H52.7607V10.316H41.3787ZM66.5445 4.492V11.226H67.6925V4.492H66.5445ZM59.6005 11.842V16.868H67.6925V11.842H66.5585V13.382H60.7345V11.842H59.6005ZM60.7345 14.278H66.5585V15.944H60.7345V14.278ZM60.9445 5.08C59.0545 5.08 57.6825 6.256 57.6825 7.964C57.6825 9.7 59.0545 10.862 60.9445 10.862C62.8485 10.862 64.2345 9.7 64.2345 7.964C64.2345 6.256 62.8485 5.08 60.9445 5.08ZM60.9445 6.032C62.2185 6.032 63.1145 6.83 63.1145 7.964C63.1145 9.112 62.2185 9.91 60.9445 9.91C59.6985 9.91 58.8025 9.112 58.8025 7.964C58.8025 6.83 59.6985 6.032 60.9445 6.032ZM76.9034 10.4C75.4474 10.638 74.2434 10.694 71.9194 10.694V8.79H76.1754V5.234H70.7574V6.172H75.0554V7.908H70.7994V11.632H71.6954C74.2014 11.632 75.4754 11.59 77.0154 11.324L76.9034 10.4ZM72.1994 13.816H79.4514V17.05H80.6134V12.878H72.1994V13.816ZM79.4514 4.492V6.34H77.0014V7.278H79.4514V8.958H77.0014V9.882H79.4514V12.206H80.6134V4.492H79.4514ZM86.2543 13.172C85.2743 13.172 84.5883 12.374 84.5883 11.254C84.5883 10.162 85.2743 9.364 86.2543 9.364C87.2203 9.364 87.9203 10.162 87.9203 11.254C87.9203 12.374 87.2203 13.172 86.2543 13.172ZM86.2543 8.398C84.7003 8.398 83.5663 9.574 83.5663 11.254C83.5663 12.962 84.7003 14.124 86.2543 14.124C87.8083 14.124 88.9423 12.962 88.9423 11.254C88.9423 9.574 87.8083 8.398 86.2543 8.398ZM86.8143 4.842H85.6803V6.62H83.1323V7.558H89.3623V6.62H86.8143V4.842ZM92.6803 4.464V9.77H91.0703V4.758H89.9923V16.42H91.0703V10.708H92.6803V17.022H93.7863V4.464H92.6803ZM97.1452 10.582C99.0912 10.246 100.939 9.196 101.709 7.712C102.465 9.196 104.327 10.246 106.273 10.582L106.721 9.672C104.509 9.35 102.339 7.908 102.339 6.256V6.186H106.273V5.262H97.1032V6.186H101.065V6.256C101.065 7.908 98.8952 9.35 96.7112 9.672L97.1452 10.582ZM107.379 11.632H96.0392V12.57H101.107V17.036H102.255V12.57H107.393L107.379 11.632ZM112.628 5.668H111.522V8.062C111.522 10.218 110.486 12.472 108.764 13.48L109.478 14.334C110.724 13.564 111.634 12.15 112.082 10.484C112.53 12.01 113.37 13.34 114.56 14.068L115.218 13.172C113.566 12.164 112.628 10.036 112.628 8.02V5.668ZM115.932 8.986H113.86V9.938H115.932V16.42H117.01V4.758H115.932V8.986ZM118.48 4.478V17.036H119.572V4.478H118.48ZM125.717 11.52C126.235 11.646 126.837 11.716 127.453 11.716C128.083 11.716 128.685 11.646 129.217 11.52V14.474H125.717V11.52ZM127.453 6.172C129.469 6.172 130.925 7.096 130.925 8.496C130.925 9.896 129.469 10.82 127.453 10.82C125.437 10.82 123.995 9.896 123.995 8.496C123.995 7.096 125.437 6.172 127.453 6.172ZM130.365 14.474V11.072C131.401 10.526 132.017 9.63 132.017 8.496C132.017 6.536 130.127 5.276 127.453 5.276C124.793 5.276 122.889 6.536 122.889 8.496C122.889 9.63 123.519 10.54 124.569 11.086V14.474H121.769V15.426H133.179V14.474H130.365Z"
                            fill="#9F9F9F"/>
                    </g>
                    <rect
                        x="0.5"
                        y="0.5"
                        width="38"
                        height="19"
                        rx="1.5"
                        stroke="#767676"
                        stroke-dasharray="2 2"/>
                    <defs>
                        <clipPath id="clip0_128_4731">
                            <rect width="39" height="20" rx="2" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div @click=""></div>
            <div @click=""></div>
        </div>
        -->
        <div class="resizer-r"></div>
        <div @mousedown="mouseDownHandler" class="resizePoint"></div>
        <div class="resizer-b"></div>
    </div>
</template>
<script>
    import ObjectEvent from "./ObjectEvent";
    export default {
        props: {
            getSTData: Object
        },
        data() {
            return {resizeX: 0, resizeW: 0}
        },
        mounted() {
            ObjectEvent.myFunction(this.getSTData)
        },
        /*
        updated() {
            if(document.getElementById("page" + 1)!==null){
                ObjectEvent.myFunction(this.getSTData);
            }
        },
        */
        methods: {
            deleteElement(e) {
                const Element = document.getElementById(this.getSTData.htmlID);
                Element.remove();
                this
                    .$store
                    .commit("DELETE_SHORTTEXT_OBJECT", this.getSTData.htmlID);
                e.stopPropagation();
            },
            mouseDownHandler(e) {
                // Get the current mouse position
                const Element = document.getElementById(this.getSTData.htmlID);
                const styles = window.getComputedStyle(Element);
                this.resizeX = e.clientX;
                this.resizeW = parseInt(styles.width, 10);
                this.$store.state.UsersDocument.CheckResizeMode = true;
                // Attach the listeners to `document`
                document.addEventListener('mousemove', this.mouseMoveHandler);
                document.addEventListener('mouseout', this.mouseMoveHandler);
                document.addEventListener('mouseup', this.mouseUpHandler);

                e.stopPropagation();
            },
            mouseMoveHandler(e) {
                let drawerDiv = document.getElementById("drawer"); 
                let computed_Object_Style = window.getComputedStyle(drawerDiv); 
                let computed_Ratio = this.$store.state.PDFScreenInfo.OriginalWidth[0] / parseInt(computed_Object_Style.width, 10) ;
                let Element = document.getElementById(this.getSTData.htmlID);
                // How far the mouse has been moved
                const dx = e.clientX - this.resizeX;
                // Adjust the dimension of element
                Element.style.width = `${this.resizeW + dx}px`;
                this.$store.commit("SET_SHORTTEXT_WIDTH", parseInt(this.resizeW + dx) * computed_Ratio);
                this.$store.commit("FIND_AND_SETTING_W_SHORTTEXT_OBJECT", this.getSTData.htmlID);
                e.stopPropagation();
            },
            mouseUpHandler(e) {
                const Element = document.getElementById(this.getSTData.htmlID);
                Element.style.left = this.getSTData.x + this.getSTData.width / 2 + "px";
                document.removeEventListener('mousemove', this.mouseMoveHandler);
                document.removeEventListener('mouseout', this.mouseMoveHandler);
                document.removeEventListener('mouseup', this.mouseUpHandler);
                e.preventDefault();
                this.$store.state.UsersDocument.CheckResizeMode = false;
            }
        }
    }
</script>
<style>
    .styleSetting {
        /* Component 1짧은 글*/
        background-color: white;
        position: absolute;
        width: 79px;
        height: 246px;
        right: 0;
        bottom: 50px;
        border: 1px dashed #7B61FF;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .ShortTextCloseBtn {
        display: none;
        bottom: 100%;
        left: 94%;
        position: absolute;
    }
    /*로딩이 된 이후에 오브젝트가 들어갈수 있도록 초기 설정은 none으로 둔다.*/
    .short-text-object-area {
        align-items: center;
        border: 1px solid black;
        /* box-shadow: 5px 5px 5px; */
        font-weight: 800;
        display: none;
        font-size: large;
        text-align: center;
        justify-content: center;
        border-radius: 2px;
        background-color: #DADADA;
        position: absolute;
        width: 100px;
        height: 30px;
    }
    #text-form {
        z-index: 10;
        width: 100%;
        height: 25px;
        top: -19px;
        color: #9F9F9F;
        font-size: 12px;
        /* bottom: 100%; */
        position: absolute;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    .resizePoint {
        z-index: 2000;
        position: absolute;
        cursor: se-resize;
        height: 15px;
        right: 3px;
        bottom: 3px;
        width: 15px;
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
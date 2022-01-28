<template>
    <v-dialog width="500" persistent="persistent" v-model="signDialog">
        <v-card class="SignViewLayout" width="500">
            <svg
                @click="close()"
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
            <br/>
            <br/>
            <canvas class="drawCanvas" id="drawCanvas"></canvas>
            <br/>
            <button class="btnMargin btnSetting" @click="toDataURL()">
                <svg
                    width="51"
                    height="33"
                    viewBox="0 0 51 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" width="50" height="33" rx="5" fill="#767676"/>
                    <path
                        d="M17.0053 12.76H20.0293V11.048H11.8533V12.76H14.8773V13.272C14.8773 16.008 13.7093 18.84 11.2453 19.992L12.4933 21.656C14.1893 20.808 15.3413 19.176 15.9653 17.192C16.6053 19.032 17.7413 20.552 19.4053 21.368L20.6213 19.704C18.1733 18.584 17.0053 15.864 17.0053 13.272V12.76ZM21.7253 9.624V14.776H19.1333V16.488H21.7253V24.408H23.8373V9.624H21.7253ZM34.972 16.328C32.652 15.64 31.644 13.992 31.612 12.312H34.492V10.616H26.524V12.312H29.452C29.42 14.152 28.364 16.024 25.98 16.824L27.036 18.472C28.764 17.912 29.932 16.744 30.588 15.288C31.228 16.504 32.348 17.48 33.964 17.96L34.972 16.328ZM32.972 22.76C31.084 22.76 30.076 22.36 30.076 21.528C30.076 20.68 31.084 20.28 32.972 20.28C34.844 20.28 35.852 20.68 35.852 21.528C35.852 22.36 34.844 22.76 32.972 22.76ZM32.972 18.648C29.9 18.648 27.98 19.72 27.98 21.528C27.98 23.32 29.9 24.376 32.972 24.376C36.028 24.376 37.948 23.32 37.948 21.528C37.948 19.72 36.028 18.648 32.972 18.648ZM37.788 13.032V9.64H35.676V18.392H37.788V14.76H39.74V13.032H37.788Z"
                        fill="#F3F3F3"/>
                </svg>
            </button>
            <button class="btnMargin btnSetting" @click="onClear()">
                <svg
                    width="66"
                    height="33"
                    viewBox="0 0 66 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" width="65" height="33" rx="5" fill="#767676"/>
                    <path
                        d="M17.3059 12.792H20.3459V11.048H12.0899V12.792H15.1619V13.608C15.1619 16.12 13.9619 18.824 11.4979 19.928L12.6979 21.608C14.4259 20.824 15.6099 19.208 16.2659 17.288C16.9219 19.064 18.0899 20.504 19.8019 21.24L20.9539 19.576C18.4899 18.552 17.3059 16.008 17.3059 13.608V12.792ZM21.7059 9.64V24.376H23.8179V9.64H21.7059ZM32.9686 11.816C34.8886 11.816 36.1206 12.392 36.1206 13.448C36.1206 14.52 34.8886 15.096 32.9686 15.096C31.0326 15.096 29.8006 14.52 29.8006 13.448C29.8006 12.392 31.0326 11.816 32.9686 11.816ZM32.9686 16.776C36.1046 16.776 38.2966 15.48 38.2966 13.448C38.2966 11.448 36.1046 10.136 32.9686 10.136C29.8166 10.136 27.6406 11.448 27.6406 13.448C27.6406 15.48 29.8166 16.776 32.9686 16.776ZM39.6726 17.88H26.3286V19.576H31.8966V24.392H34.0086V19.576H39.6726V17.88ZM41.8634 11.16V12.84H46.7754C46.4714 16.104 44.8394 18.408 41.0794 20.216L42.1834 21.88C47.4154 19.352 48.9354 15.672 48.9354 11.16H41.8634ZM51.1914 9.624V24.36H53.3194V9.624H51.1914Z"
                        fill="#F3F3F3"/>
                </svg>
            </button>
            <!--<v-btn class="btnMargin btnSetting" @click="toDataURL()">저장</v-btn>-->
            <br/>
            <br/>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        data() {
            return {canvas: document.getElementById('drawCanvas'), context: "", tool: ""}
        },
        computed: {
            signDialog() {
                return this.$store.state.DialogData.DialogShow;
            }
        },
        updated() {
            let canvas = document.getElementById('drawCanvas');
            // canvas.setAttribute("width",
            // parseInt(this.$store.state.DialogData.ImageWidth) + "px")
            let makedWidth = 0;
            while(makedWidth < 300){
                makedWidth = makedWidth + this.$store.state.DialogData.ImageWidth;
            }
            let point = makedWidth / this.$store.state.DialogData.ImageWidth;
            canvas.style.width = makedWidth + "px";
            canvas.style.height = parseInt(this.$store.state.DialogData.ImageHeight) * point + "px";
            this.InitEvent(canvas);
        },
        methods: {
            onClear() {
                let canvas = document.getElementById('drawCanvas');
                let context = canvas.getContext('2d');
                context.save();
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.restore();
            },
            // Canvas요소 내의 좌표를 결정 한다.
            ev_canvas(ev) {
                if (ev.layerX || ev.layerX == 0) { // Firefox 브라우저
                    ev._x = ev.layerX;
                    ev._y = ev.layerY;
                } else if (ev.offsetX || ev.offsetX == 0) { // Opera 브라우저
                    ev._x = ev.offsetX;
                    ev._y = ev.offsetY;
                } else if (ev.targetTouches[0] || ev.targetTouches[0].pageX == 0) { //핸드폰
                    let left = 0;
                    let top = 0;
                    let elem = document.getElementById('drawCanvas');

                    while (elem) {
                        left = left + parseInt(elem.offsetLeft);
                        top = top + parseInt(elem.offsetTop);
                        elem = elem.offsetParent;
                    }
                    ev._x = ev.targetTouches[0].pageX - left;
                    ev._y = ev.targetTouches[0].pageY - top;
                }
                // tool의 이벤트 핸들러를 호출한다.
                let func = this.tool[ev.type];
                if (func) {
                    func(ev);
                }
            },
            tool_pencil(context) {
                let tool = this;
                this.started = false;
                // 마우스를 누르는 순간 그리기 작업을 시작 한다.
                this.mousedown = function (ev) {
                    context.beginPath();
                    context.moveTo(ev._x, ev._y);
                    tool.started = true;
                };
                // 마우스가 이동하는 동안 계속 호출하여 Canvas에 Line을 그려 나간다
                this.mousemove = function (ev) {
                    if (tool.started) {
                        context.lineTo(ev._x, ev._y);
                        context.lineWidth = 4;
                        context.stroke();
                    }
                };
                // 마우스 떼면 그리기 작업을 중단한다
                this.mouseup = function (ev) {
                    if (tool.started) {
                        tool.mousemove(ev);
                        tool.started = false;
                    }
                };

                // 마우스를 누르는 순간 그리기 작업을 시작 한다.
                this.touchstart = function (ev) {
                    context.beginPath();
                    context.moveTo(ev._x, ev._y);
                    tool.started = true;
                };
                // 마우스가 이동하는 동안 계속 호출하여 Canvas에 Line을 그려 나간다
                this.touchmove = function (ev) {
                    if (tool.started) {
                        context.lineTo(ev._x, ev._y);
                        context.stroke();
                    }
                };
                // 마우스 떼면 그리기 작업을 중단한다
                this.touchend = function (ev) {
                    if (tool.started) {
                        tool.touchmove(ev);
                        tool.started = false;
                    }
                };
            },
            InitEvent(canvas) {
                // 이표현말고 아래 setAtt canvas.style.width =
                // parseInt(this.$store.state.DialogData.ImageWidth) + "px"; canvas.style.height
                // = parseInt(this.$store.state.DialogData.ImageHeight) + "px";
                let makedWidth = 0;
                let makedHeight = 0;
                while(makedWidth < 300){
                    makedWidth = makedWidth + this.$store.state.DialogData.ImageWidth;
                }
                let point = makedWidth / this.$store.state.DialogData.ImageWidth;
                makedHeight = parseInt(this.$store.state.DialogData.ImageHeight) * point;
                canvas.setAttribute(
                    "width",
                    makedWidth + "px"
                );
                canvas.setAttribute(
                    "height",
                    makedHeight + "px"
                );
                if (!canvas) {
                    alert("캔버스 객체를 찾을 수 없음");
                    return;
                }
                if (!canvas.getContext) {
                    alert("Drawing Contextf를 찾을 수 없음");
                    return;
                }
                let context = canvas.getContext('2d');
                /*
                if (!this.context) {
                    alert("getContext() 함수를 호출 할 수 없음");
                    return;
                }
                */
                // Pencil tool 객체를 생성 한다.
                this.tool = new this.tool_pencil(context);
                canvas.addEventListener('mousedown', this.ev_canvas, false);
                canvas.addEventListener('mousemove', this.ev_canvas, false);
                canvas.addEventListener('mouseup', this.ev_canvas, false);
                canvas.addEventListener('touchstart', this.ev_canvas, false);
                canvas.addEventListener('touchmove', this.ev_canvas, false);
                canvas.addEventListener('touchend', this.ev_canvas, false);
            },
            toDataURL() {
                let ImageID = this.$store.state.DialogData.ImageID;
                console.log(ImageID);
                let myImage = document.getElementById(String(ImageID));
                let canvas = document.getElementById('drawCanvas');
                let ImgText = document.getElementById("SignObjectAreaText" + ImageID);
                canvas.style.width = parseInt(this.$store.state.DialogData.ImageWidth) * 2 + "px";
                canvas.style.height = parseInt(this.$store.state.DialogData.ImageHeight) * 2 + "px";
                myImage.src = canvas.toDataURL();
                myImage.style.zIndex = 4;
                myImage.style.width = this.$store.state.DialogData.ImageWidth + "px";
                myImage.style.height = this.$store.state.DialogData.ImageHeight + "px";
                //myImage.style.border = "2px";
                myImage.style.borderColor = "black";
                myImage.style.borderRadius = "8px";
                ImgText.style.display = "none";
                this.isOver();
                this.onClear();
            },
            isOver() {
                this.$store.state.DialogData.DialogShow = false;
            },
            close() {
                this.$store.state.DialogData.DialogShow = false;
                let ImageID = this.$store.state.DialogData.ImageID;
                let myImage = document.getElementById(String(ImageID));
                myImage.remove();
                this.onClear();
                /* 캔버스가 비어있나 확인하는 로직
                if(this.isCanvasBlank(canvas)){
                    let ImageID = this.$store.state.DialogData.ImageID;
                    let myImage = document.getElementById(String(ImageID));
                    myImage.remove();
                }
                */
            },
            isCanvasBlank(canvas) {
                return !canvas
                    .getContext('2d')
                    .getImageData(0, 0, canvas.width, canvas.height)
                    .data
                    .some(channel => channel !== 0);
            }
        }
    }
</script>
<style scoped="scoped">
    .CloseBtn {
        cursor: pointer;
        right: 0;
        float: right;
    }
    .btnSetting {
        color: lightskyblue;
    }
    .SignViewLayout {
        height: 100%;
        text-align: center;
    }
    .btnMargin {
        margin-right: 2%;
    }
    .drawCanvas {
        z-index: 2000;
        border-radius: 3%;
        position: relative;
        border: 1px solid #000;
    }
</style>
<template>
    <v-dialog width="500" height="500" persistent="persistent" v-model="signDialog">
        <v-card class="SignViewLayout" width="500" height="500">
            <br/>
            <br/>
            <br/>
            <span style="font-weight:bold;">
                <v-icon color="yellow" size="30px">mdi-star</v-icon>
                서명 후 꼭~ 우측 하단의 '저장' 버튼을 클릭해주세요.
                <v-icon color="yellow" size="30px">mdi-star</v-icon>
            </span>
            <br/>
            <canvas class="drawCanvas" id="drawCanvas"></canvas>
            <br/>
            <v-btn class="btnMargin btnSetting" @click="toDataURL()">저장</v-btn>
            <v-btn class="btnMargin btnSetting" @click="onClear()">지우기</v-btn>
            <v-btn class="btnSetting" @click="close()">닫기</v-btn>
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
            //canvas.setAttribute("width", parseInt(this.$store.state.DialogData.ImageWidth) + "px")
            canvas.style.width = parseInt(this.$store.state.DialogData.ImageWidth) + "px";
            canvas.style.height = parseInt(this.$store.state.DialogData.ImageHeight) + "px";
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
                    ev._x = ev
                        .targetTouches[0]
                        .pageX - left;
                    ev._y = ev
                        .targetTouches[0]
                        .pageY - top;
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
                //이표현말고 아래 setAtt
                //canvas.style.width = parseInt(this.$store.state.DialogData.ImageWidth) + "px";
                //canvas.style.height = parseInt(this.$store.state.DialogData.ImageHeight) + "px";
                canvas.setAttribute("width", parseInt(this.$store.state.DialogData.ImageWidth) + "px");
                canvas.setAttribute("height", parseInt(this.$store.state.DialogData.ImageHeight) + "px");
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
                let myImage = document.getElementById(String(ImageID));
                let canvas = document.getElementById('drawCanvas');
                myImage.src = canvas.toDataURL();
                myImage.style.backgroundColor = "white";
                //myImage.style.border = "2px";
                myImage.style.borderColor = "black";
                myImage.style.borderRadius = "8px";
                this.isOver();
                this.onClear();
            },
            isOver(){
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
    .btnSetting{
        color: lightskyblue;
    }
    .SignViewLayout {
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
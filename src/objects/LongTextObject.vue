<template>
    <div class="LongTextObjectArea">
        <p id="textForm">
            긴 글{{getLTData.id}}
        </p>
        <svg
            v-bind:id="'LongTextDeleteBtn'+getLTData.id"
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
        <div @mousedown="mouseDownHandler" class="resizer resizer-r"></div>
        <div @mousedown="mouseDownHandler" class="resizer resizer-b"></div>
    </div>
</template>
<script>
    export default {
        props: {
            getLTData: Object
        },
        data() {
            return {resizeX: 0, resizeY: 0, resizeW: 0, resizeH: 0}
        },
        mounted() {
            const fu = this.myFunction()
            setTimeout(fu, 5000);
        },
        methods: {
            myFunction() {
                const ThisWindow = document.getElementById("drawer");
                const NewElementDiv = document.getElementById(this.getLTData.htmlID);
                NewElementDiv.style.left = this.getLTData.x + "px";
                NewElementDiv.style.top = this.getLTData.y + "px";
                this.makingFirstClickObject(this.getLTData.htmlID);
                ThisWindow.append(NewElementDiv);
            },
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
            },
            //PDF페이지중에 어디에 속해있는지를 파악하고 해당 PDF에 오브젝트를 집어넣습니다.
            appendIntoPDFPage(getElement, currentX, currentY) {
                // let getElement_in_Array =
                // this.findObjectInArray(getElement.getAttribute("id"));
                let appendY1 = 0;
                let appendY2 = 0;
                for (let i = 1; i <= this.$store.state.PDFInfo.PDFPageInfo; i++) {
                    const PDF_Pages = document.getElementById("page" + String(i));
                    PDF_Pages.style.position = "relative";
                    let computed_PDF_Page_Style = window.getComputedStyle(PDF_Pages);
                    let computed_Object_Style = window.getComputedStyle(getElement);
                    appendY2 = appendY2 + parseInt(computed_PDF_Page_Style.height, 10);
                    if (currentY >= appendY1 && currentY <= appendY2) {
                        getElement.style.top = currentY - appendY1 - parseInt(
                            computed_Object_Style.height,
                            10
                        ) / 2 + "px";
                        this.getLTData.y = currentY - appendY1 - parseInt(
                            computed_Object_Style.height,
                            10
                        ) / 2;
                        this.getLTData.x = currentX;
                        PDF_Pages.append(getElement);
                        break;
                    } else {
                        appendY1 = appendY2;
                    }
                }
            },
            //아래부터는 메인 이벤트 모음입니다. 먼저 !초기! 클릭시에 오브젝트 생성.
            makingFirstClickObject(objectID) {
                let getElement = document.getElementById(objectID);
                getElement.style.position = 'absolute';
                getElement.style.zIndex = 6;
                let currentX = 0;
                let currentY = 0;
                const ThisWindow = document.getElementById("drawer");
                const containerWindow = document.getElementById("container");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedContainerStyle = window.getComputedStyle(containerWindow);
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                let self = this;
                function moveAt(currentX, currentY) {
                    getElement.style.left = currentX + 'px';
                    getElement.style.top = currentY + 'px';
                }
                function onMouseMove(event) {
                    currentX = event.pageX - ThisWindow
                        .getBoundingClientRect()
                        .left - getElement
                        .getBoundingClientRect()
                        .width / 2;
                    //패딩값만큼 빼고 계산하는 로직을 추가했다.
                    currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                        computedheaderStyle.height,
                        10
                    ) - getElement
                        .getBoundingClientRect()
                        .height / 2;
                    // 페이지 영역에 있는지 확인하는 함수이지만... 잘동작하지 않으므로 일단 보류.
                    // self.checkWhere_Object_Into_PDFPage(getElement);
                    if (currentX < 0) {
                        currentX = 0;
                    }
                    if (currentY < 0) {
                        currentY = 0;
                    }
                    moveAt(currentX, currentY);
                }
                getElement.addEventListener('mousemove', onMouseMove);
                getElement.addEventListener('mouseout', onMouseMove);
                getElement.addEventListener('click', function () {
                    getElement.removeEventListener('mousemove', onMouseMove);
                    getElement.removeEventListener('mouseout', onMouseMove);
                    getElement.style.zIndex = 4;
                    // 오브젝트를 해당위치에 PDFPage에 둔다.
                    self.appendIntoPDFPage(
                        getElement,
                        currentX,
                        currentY + parseInt(computedheaderStyle.height, 10)
                    );
                    //드래그 이벤트를 준다.
                    self.makingDragEvent(getElement);
                });
            },
            //오브젝트 배치이후 드래그시에 활성화되는 이벤트.
            makingDragEvent(getElement) {
                let currentX = 0;
                let currentY = 0;
                let self = this;
                //self.showObjectMenu(); getElement.removeEventListener('mousemove')
                let LongTextDeleteBtn = document.getElementById("LongTextDeleteBtn" + this.getLTData.id);
                getElement.onmouseover = function (event) {
                    event.stopPropagation();
                    LongTextDeleteBtn.style.display = "block";
                }
                getElement.onmouseout = function (event) {
                    event.stopPropagation();
                    LongTextDeleteBtn.style.display = "none";
                }
                getElement.onmousedown = function (event) {
                    event.stopPropagation();
                    self.DragDetailEvent(currentX, currentY, getElement, event);
                };
                getElement.ondragstart = function () {
                    return false;
                }
            },
            DragDetailEvent(currentX, currentY, getElement, event) {
                getElement.style.position = 'absolute';
                let self = this;
                getElement.style.zIndex = 4;
                let ElementID = getElement.getAttribute("id");
                let WantDeleteBtn = document.getElementById(ElementID + "Btn");
                if (WantDeleteBtn !== null) {
                    WantDeleteBtn.remove();
                }
                //각종 셋팅값들 let DeleteBtn = document.createElement("button");
                const ThisWindow = document.getElementById("drawer");
                const containerWindow = document.getElementById("container");
                const headerWindow = document.getElementsByTagName("header")[0];
                let computedContainerStyle = window.getComputedStyle(containerWindow);
                let computedheaderStyle = window.getComputedStyle(headerWindow);
                //초기 이동을 고려함.
                currentX = event.pageX - ThisWindow
                    .getBoundingClientRect()
                    .left;
                currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                    computedheaderStyle.height,
                    10
                );
                moveAt(currentX, currentY);
                ThisWindow.append(getElement);
                //해당위치로 오브젝트가 이동하도록 하는 함수입니다.
                function moveAt(currentX, currentY) {
                    getElement.style.left = currentX - getElement
                        .getBoundingClientRect()
                        .width / 2 + 'px';
                    getElement.style.top = currentY - getElement
                        .getBoundingClientRect()
                        .height / 2 + 'px';
                }
                //마우스를 움직일때 활성화되는 함수입니다.
                function onMouseMove(event) {
                    currentX = event.pageX - ThisWindow
                        .getBoundingClientRect()
                        .left;
                    //패딩값만큼 빼고 계산하는 로직을 추가했다.
                    currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                        computedheaderStyle.height,
                        10
                    );
                    if (currentX < 0) {
                        currentX = 0;
                    }
                    if (currentY < 0) {
                        currentY = 0;
                    }
                    moveAt(currentX, currentY);
                }
                // mousemove로 오브젝트를 움직입니다.
                getElement.addEventListener('mousemove', onMouseMove);
                getElement.addEventListener('mouseout', onMouseMove);
                window.addEventListener('scroll', onMouseMove);
                // 오브젝트를 드롭하고, 불필요한 핸들러를 제거합니다.
                getElement.addEventListener('mouseup', function () {
                    getElement.removeEventListener('mousemove', onMouseMove);
                    getElement.removeEventListener('mouseout', onMouseMove);
                    window.removeEventListener('scroll', onMouseMove);
                    self.appendIntoPDFPage(getElement, currentX, currentY);
                });
                //클릭시에 간단하게 메뉴들이 나올수 있는 이벤트를 만들어야 합니다.
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
    .LongTextObjectArea {
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
    /* Placed at the right side */
    .resizer-r {
        z-index: 2000;
        position: absolute;
        cursor: col-resize;
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
        cursor: row-resize;
        height: 5px;
        left: 0;
        width: 100%;
    }
</style>
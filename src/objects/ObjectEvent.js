import store from '../store/store';

export default{
    myFunction(getData) {
        const ThisWindow = document.getElementById("drawer");
        const NewElementDiv = document.getElementById(getData.htmlID);
        NewElementDiv.style.left = getData.x + "px";
        NewElementDiv.style.top = getData.y + "px";
        this.makingFirstClickObject(getData.htmlID, getData);
        ThisWindow.append(NewElementDiv);
    },
    DeleteElement(e, getData) {
        e.stopPropagation();
        const Element = document.getElementById(getData.htmlID);
        Element.remove();
    },
    //PDF페이지중에 어디에 속해있는지를 파악하고 해당 PDF에 오브젝트를 집어넣습니다.
    appendIntoPDFPage(getElement, currentX, currentY) {
        // let getElement_in_Array =
        //this.findObjectInArray(getElement.getAttribute("id"));
        let appendY1 = 0;
        let appendY2 = 0;
        console.log(store.state.PDFInfo.PDFPageInfo);
        for (let i = 1; i <= store.state.PDFInfo.PDFPageInfo; i++) {
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
                let getDataInfo = ""
                if (getElement.getAttribute("id").includes("ShortTextObjectArea")) {
                    store.commit("FIND_SHORTTEXT_OBJECT", getElement.getAttribute("id"));
                    getDataInfo = store.state.ShortTextObject.ShortText;
                } else if (getElement.getAttribute("id").includes("LongTextObjectArea")) {
                    store.commit("FIND_LONGTEXT_OBJECT", getElement.getAttribute("id"));
                    getDataInfo = store.state.LongTextObject.LongText;
                } else if (getElement.getAttribute("id").includes("CheckBoxObjectArea")) {
                    store.commit("FIND_CHECKBOX_OBJECT", getElement.getAttribute("id"));
                    getDataInfo = store.state.CheckBoxObject.CheckBox;
                } else if (getElement.getAttribute("id").includes("SignObjectArea")) {
                    store.commit("FIND_SIGN_OBJECT", getElement.getAttribute("id"));
                    getDataInfo = store.state.SignObject.Sign;
                }
                getDataInfo.y = currentY - appendY1 - parseInt(
                    computed_Object_Style.height,
                    10
                ) / 2;
                getDataInfo.x = currentX;
                console.log(getDataInfo);
                PDF_Pages.append(getElement);
                break;
            } else {
                appendY1 = appendY2;
            }
        }
    },
    //아래부터는 메인 이벤트 모음입니다. 먼저 !초기! 클릭시에 오브젝트 생성.
    makingFirstClickObject(objectID, getData) {
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
            //self.checkWhere_Object_Into_PDFPage(getElement);
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
        window.addEventListener('scroll', onMouseMove);
        getElement.addEventListener('click', function () {
            /*
            self.appendIntoPDFPage(
                getElement,
                currentX,
                currentY + parseInt(computedheaderStyle.height, 10)
            );
            */
            getElement.removeEventListener('mousemove', onMouseMove);
            getElement.removeEventListener('mouseout', onMouseMove);
            window.removeEventListener('scroll', onMouseMove);
            getElement.style.zIndex = 4;
            // 오브젝트를 해당위치에 PDFPage에 둔다.
            //드래그 이벤트를 준다.
            self.makingDragEvent(getElement, getData);
        });
    },
    //오브젝트 배치이후 드래그시에 활성화되는 이벤트.
    makingDragEvent(getElement, getData) {
        let currentX = 0;
        let currentY = 0;
        //let self = this;
        const ThisWindow = document.getElementById("drawer");
        const containerWindow = document.getElementById("container");
        const headerWindow = document.getElementsByTagName("header")[0];
        let computedContainerStyle = window.getComputedStyle(containerWindow);
        let computedheaderStyle = window.getComputedStyle(headerWindow);
        let MouseDownCheck = false;
        getElement.style.position = 'absolute';
        getElement.style.zIndex = 4;
        getElement.onmouseover = function (event) {
            let DeleteBtn = document.getElementById(
                getData.htmlID + "DeleteBtn" + getData.id
            );
            event.stopPropagation();
            DeleteBtn.style.display = "block";
        }
        getElement.onmouseout = function (event) {
            let DeleteBtn = document.getElementById(
                getData.htmlID + "DeleteBtn" + getData.id
            );
            event.stopPropagation();
            DeleteBtn.style.display = "none";
            if(MouseDownCheck){
                onMouseMove(event);
            }
        }
        getElement.onmousedown = function (event) {
            event.stopPropagation();
            currentX = event.pageX - ThisWindow
                .getBoundingClientRect()
                .left;
            currentY = event.pageY - parseInt(computedContainerStyle.paddingTop, 10) - parseInt(
                computedheaderStyle.height,
                10
            );
            moveAt(currentX, currentY);
            ThisWindow.append(getElement);
            MouseDownCheck = true;
        }
        window.scroll = function(event){
            if(MouseDownCheck){
                onMouseMove(event);
            }
        }
        //이쪽을 건드는 방안은...?그래야 이벤트가 자연스럽게 진행될거같은데????
        getElement.ondragstart = function () {
            return false;
        }
        getElement.onmousemove = function (event) {
            if(MouseDownCheck){
                onMouseMove(event);
            }
        }
        getElement.addEventListener('mouseup', function () {
            MouseDownCheck = false;
            //self.appendIntoPDFPage(getElement, currentX, currentY);
        })
        function moveAt(currentX, currentY) {
            getElement.style.left = currentX - getElement
                .getBoundingClientRect()
                .width / 2 + 'px';
            getElement.style.top = currentY - getElement
                .getBoundingClientRect()
                .height / 2 + 'px';
        }
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
    }
}
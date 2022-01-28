import store from "../store/store";

export default {
  myFunction(getData) {
    let drawerDiv = document.getElementById("drawer");
    let computed_Div_Style = window.getComputedStyle(drawerDiv);
    let computed_Ratio =
      parseInt(computed_Div_Style.width, 10) /
      store.state.PDFScreenInfo.OriginalWidth[0];
    const ThisWindow = document.getElementById("drawer");
    const NewElementDiv = document.getElementById(getData.htmlID);
    //데이터값에 저장되어있는 width, height, left, top값을 모두 적용시켜줍니다.
    NewElementDiv.style.width = getData.width + "px";
    NewElementDiv.style.height = getData.height + "px";
    NewElementDiv.style.left = getData.x * computed_Ratio + "px";
    NewElementDiv.style.top = getData.y * computed_Ratio + "px";
    // 데이터를 읽는형태인지, 새로 클릭하여 추가된 형태인지를 판단한 다음에 이를 알맞게 추가시켜줍니다. push_or_readCheck >>
    // true면 데이터를 넣는 형태, false면 데이터를 읽는 형태
    if (getData.push_or_readCheck === true) {
      this.makingFirstClickObject(getData.htmlID, getData);
      ThisWindow.append(NewElementDiv);
    } else {
      this.append_Into_PDFPage_For_ReadingObject(getData);
      this.makingDragEvent(document.getElementById(getData.htmlID), getData);
    }
  },
  // PDF페이지중에 어디에 속해있는지를 파악하고 해당 PDF에 오브젝트를 집어넣습니다. 단 맨 처음 오브젝트를 클릭하여 생성했을때만
  // 적용됩니다. 여기에서 page값을 저장할수 있도록 하는 로직을 추가해야합니다.
  append_Into_PDFPage_For_First(getElement, currentX, currentY) {
    let appendY1 = 0;
    let appendY2 = 0;
    store.commit("leaveObject");
    console.log(currentX, currentY);
    let drawerDiv = document.getElementById("drawer");
    let computed_Div_Style = window.getComputedStyle(drawerDiv);
    let computed_Ratio =
      store.state.PDFScreenInfo.OriginalWidth[0] /
      parseInt(computed_Div_Style.width, 10);
    for (let i = 1; i <= store.state.PDFScreenInfo.PDFPageInfo; i++) {
      const PDF_Pages = document.getElementById("page" + String(i));
      PDF_Pages.style.position = "relative";
      let computed_PDF_Page_Style = window.getComputedStyle(PDF_Pages);
      let computed_Object_Style = window.getComputedStyle(getElement);
      appendY2 = appendY2 + parseInt(computed_PDF_Page_Style.height, 10);
      if (currentY >= appendY1 && currentY <= appendY2) {
        getElement.style.top =
          currentY -
          appendY1 -
          parseInt(computed_Object_Style.height, 10) / 2 +
          "px";
        getElement.style.left =
          currentX - parseInt(computed_Object_Style.width, 10) / 2 + "px";
        let y =
          currentY - appendY1 - parseInt(computed_Object_Style.height, 10) / 2;
        this.CommitUpdateData(getElement, y * computed_Ratio, i);
        PDF_Pages.append(getElement);
        break;
      } else {
        appendY1 = appendY2;
      }
    }
  },
  // PDF페이지중에 어디에 속해있는지를 파악하고 해당 PDF에 오브젝트를 집어넣습니다. 단 오브젝트를 읽어서 배치하는 과정에서만 적용됩니다.
  // 여기에서 page값을 저장할수 있도록 하는 로직을 추가해야합니다.
  append_Into_PDFPage_For_ReadingObject(getData) {
    //let drawerDiv = document.getElementById("drawer");
    //let computed_Object_Style = window.getComputedStyle(drawerDiv);
    //let computed_Ratio = parseInt(computed_Object_Style.width, 10) / store.state.PDFScreenInfo.OriginalWidth[0];
    let getElement = document.getElementById(getData.htmlID);
    getElement.style.display = "flex";
    for (let i = 1; i <= store.state.PDFScreenInfo.PDFPageInfo; i++) {
      const PDF_Pages = document.getElementById("page" + String(i));
      PDF_Pages.style.position = "relative";
      if (getData.page === i) {
        getElement.style.top = getData.y + "px"; //이미 height를 제외하고 적용하는게 된 상태이니 y값을 그대로 넣어주도록 설정.
        getElement.style.left = getData.x + "px";
        PDF_Pages.append(getElement);
        break;
      }
    }
  },
  //페이지에 들어간 오브젝트의 정보를 업데이트 해주는 함수입니다.
  //오브젝트의 x, y, 페이지값을 업데이트 합니다.
  CommitUpdateData(getElement, y, i) {
    let drawerDiv = document.getElementById("drawer");
    let computed_Div_Style = window.getComputedStyle(drawerDiv);
    let computed_Ratio =
      store.state.PDFScreenInfo.OriginalWidth[0] /
      parseInt(computed_Div_Style.width, 10);
    let computed_Object_Style = window.getComputedStyle(getElement);
    if (getElement.getAttribute("id").includes("ShortTextObjectArea")) {
      store.commit(
        "SET_SHORTTEXT_X",
        parseInt(computed_Object_Style.left, 10) * computed_Ratio
      );
      store.commit("SET_SHORTTEXT_Y", parseInt(y));
      store.commit("SET_SHORTTEXT_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_SHORTTEXT_OBJECT",
        getElement.getAttribute("id")
      );
    } else if (getElement.getAttribute("id").includes("LongTextObjectArea")) {
      store.commit("SET_LONGTEXT_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_LONGTEXT_Y", parseInt(y));
      store.commit("SET_LONGTEXT_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_LONGTEXT_OBJECT",
        getElement.getAttribute("id")
      );
    } else if (getElement.getAttribute("id").includes("CheckBoxObjectArea")) {
      store.commit("SET_CHECKBOX_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_CHECKBOX_Y", parseInt(y));
      store.commit("SET_CHECKBOX_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_CHECKBOX_OBJECT",
        getElement.getAttribute("id")
      );
    } else if (getElement.getAttribute("id").includes("SignObjectArea")) {
      store.commit("SET_SIGN_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_SIGN_Y", parseInt(y));
      store.commit("SET_SIGN_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_SIGN_OBJECT",
        getElement.getAttribute("id")
      );
    }
  },
  //아래부터는 메인 이벤트 모음입니다. 먼저 !초기! 클릭시에 오브젝트 생성.
  makingFirstClickObject(objectID, getData) {
    let getElement = document.getElementById(objectID);
    getElement.style.display = "flex";
    //getElement
    getElement.style.position = "absolute";
    getElement.style.zIndex = 8;
    let currentX = getData.x;
    let currentY = getData.y;
    //각 div값들을 가지고옵니다.
    const ThisWindow = document.getElementById("drawer");
    const containerWindow = document.getElementById("container");
    //해더의 값만큼 빼고 생각을 해야하므로 해더값을 가지고 와줍니다.
    const headerWindow = document.getElementsByTagName("header")[0];
    let computedContainerStyle = window.getComputedStyle(containerWindow);
    let computedheaderStyle = window.getComputedStyle(headerWindow);
    let self = this;
    //이동을 원하는 값을 배치해주는 메소드.
    function moveAt(currentX, currentY) {
      getElement.style.left =
        currentX - getElement.getBoundingClientRect().width / 2 + "px";
      getElement.style.top =
        currentY - getElement.getBoundingClientRect().height / 2 + "px";
    }
    //마우스가 움직일때 적용되는 메소드.
    function onMouseMove(event) {
      event.stopPropagation();
      currentX = event.pageX - ThisWindow.getBoundingClientRect().left;
      //페이지 Y값 - 패딩탑값 - 해더의 높이값 - 해더와 벌어진 마진값200
      currentY =
        event.pageY -
        parseInt(computedContainerStyle.paddingTop, 10) -
        parseInt(computedheaderStyle.height, 10) -
        200;
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
    //윈도우로 이벤트를 바꾸니 매우잘됨ㅠㅠㅠㅠㅠㅠㅠㅠㅠ 창에 마우스를 얹이는 순간 그냥 오브젝트가 무조건 따라올 수 있도록 수정하였다.
    window.addEventListener("mousemove", onMouseMove);
    getElement.addEventListener("mouseout", onMouseMove);
    window.addEventListener("scroll", onMouseMove);

    for (let i = 1; i <= store.state.PDFScreenInfo.PDFPageInfo; i++) {
      const PDF_Pages = document.getElementById("page" + String(i));
      PDF_Pages.style.position = "relative";
      let computed_PDF_Page_Style = window.getComputedStyle(PDF_Pages);
      let computed_Object_Style = window.getComputedStyle(getElement);
      appendY2 = appendY2 + parseInt(computed_PDF_Page_Style.height, 10);
      if (currentY >= appendY1 && currentY <= appendY2) {
        getElement.style.top =
          currentY -
          appendY1 -
          parseInt(computed_Object_Style.height, 10) / 2 +
          "px";
        getElement.style.left =
          currentX - parseInt(computed_Object_Style.width, 10) / 2 + "px";
        let y =
          currentY - appendY1 - parseInt(computed_Object_Style.height, 10) / 2;
        this.CommitUpdateData(getElement, y, i);
        PDF_Pages.append(getElement);
        break;
      } else {
        appendY1 = appendY2;
      }
    }
  },
  // PDF페이지중에 어디에 속해있는지를 파악하고 해당 PDF에 오브젝트를 집어넣습니다. 단 오브젝트를 읽어서 배치하는 과정에서만 적용됩니다.
  // 여기에서 page값을 저장할수 있도록 하는 로직을 추가해야합니다.
  append_Into_PDFPage_For_ReadingObject(getData) {
    let getElement = document.getElementById(getData.htmlID);
    getElement.style.display = "flex";
    for (let i = 1; i <= store.state.PDFScreenInfo.PDFPageInfo; i++) {
      const PDF_Pages = document.getElementById("page" + String(i));
      PDF_Pages.style.position = "relative";
      if (getData.page === i) {
        getElement.style.top = getData.y + "px"; //이미 height를 제외하고 적용하는게 된 상태이니 y값을 그대로 넣어주도록 설정.
        getElement.style.left = getData.x + "px";
        PDF_Pages.append(getElement);
        break;
      }
    }
  },
  //페이지에 들어간 오브젝트의 정보를 업데이트 해주는 함수입니다.
  //오브젝트의 x, y, 페이지값을 업데이트 합니다.
  CommitUpdateData(getElement, y, i) {
    let computed_Object_Style = window.getComputedStyle(getElement);
    if (getElement.getAttribute("id").includes("ShortTextObjectArea")) {
      store.commit("SET_SHORTTEXT_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_SHORTTEXT_Y", parseInt(y));
      store.commit("SET_SHORTTEXT_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_SHORTTEXT_OBJECT",
        getElement.getAttribute("id")
      );
    } else if (getElement.getAttribute("id").includes("LongTextObjectArea")) {
      store.commit("SET_LONGTEXT_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_LONGTEXT_Y", parseInt(y));
      store.commit("SET_LONGTEXT_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_LONGTEXT_OBJECT",
        getElement.getAttribute("id")
      );
    } else if (getElement.getAttribute("id").includes("CheckBoxObjectArea")) {
      store.commit("SET_CHECKBOX_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_CHECKBOX_Y", parseInt(y));
      store.commit("SET_CHECKBOX_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_CHECKBOX_OBJECT",
        getElement.getAttribute("id")
      );
    } else if (getElement.getAttribute("id").includes("SignObjectArea")) {
      store.commit("SET_SIGN_X", parseInt(computed_Object_Style.left, 10));
      store.commit("SET_SIGN_Y", parseInt(y));
      store.commit("SET_SIGN_PAGE", parseInt(i));
      store.commit(
        "FIND_AND_SETTING_X_Y_PAGE_SIGN_OBJECT",
        getElement.getAttribute("id")
      );
    }
  },
  //아래부터는 메인 이벤트 모음입니다. 먼저 !초기! 클릭시에 오브젝트 생성.
  makingFirstClickObject(objectID, getData) {
    let getElement = document.getElementById(objectID);
    getElement.style.display = "flex";
    //getElement
    getElement.style.position = "absolute";
    getElement.style.zIndex = 8;
    let currentX = getData.x;
    let currentY = getData.y;
    //각 div값들을 가지고옵니다.
    const ThisWindow = document.getElementById("drawer");
    const containerWindow = document.getElementById("container");
    //해더의 값만큼 빼고 생각을 해야하므로 해더값을 가지고 와줍니다.
    const headerWindow = document.getElementsByTagName("header")[0];
    let computedContainerStyle = window.getComputedStyle(containerWindow);
    let computedheaderStyle = window.getComputedStyle(headerWindow);
    let self = this;
    //이동을 원하는 값을 배치해주는 메소드.
    function moveAt(currentX, currentY) {
      getElement.style.left =
        currentX - getElement.getBoundingClientRect().width / 2 + "px";
      getElement.style.top =
        currentY - getElement.getBoundingClientRect().height / 2 + "px";
    }
    //마우스가 움직일때 적용되는 메소드.
    function onMouseMove(event) {
      event.stopPropagation();
      currentX = event.pageX - ThisWindow.getBoundingClientRect().left;
      //페이지 Y값 - 패딩탑값 - 해더의 높이값 - 해더와 벌어진 마진값200
      currentY =
        event.pageY -
        parseInt(computedContainerStyle.paddingTop, 10) -
        parseInt(computedheaderStyle.height, 10) -
        200;
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
    //윈도우로 이벤트를 바꾸니 매우잘됨ㅠㅠㅠㅠㅠㅠㅠㅠㅠ 창에 마우스를 얹이는 순간 그냥 오브젝트가 무조건 따라올 수 있도록 수정하였다.
    window.addEventListener("mousemove", onMouseMove);
    getElement.addEventListener("mouseout", onMouseMove);
    window.addEventListener("scroll", onMouseMove);

    //클릭할시에 오브젝트가 PDF문서 페이지영역에 배치가 되도록 하며, 이벤트를 제거해줍니다.
    getElement.addEventListener("click", function () {
      self.append_Into_PDFPage_For_First(getElement, currentX, currentY);
      window.removeEventListener("mousemove", onMouseMove);
      getElement.removeEventListener("mouseout", onMouseMove);
      window.removeEventListener("scroll", onMouseMove);
      getElement.style.zIndex = 4;
      // 오브젝트를 해당위치에 PDFPage에 둔다. 드래그 이벤트를 준다.
      self.makingDragEvent(getElement, getData);
    });
  },
  //오브젝트 배치이후 드래그시에 활성화되는 이벤트.
  makingDragEvent(getElement, getData) {
    let self = this;
    const ThisWindow = document.getElementById("drawer");
    const containerWindow = document.getElementById("container");
    const headerWindow = document.getElementsByTagName("header")[0];
    let computedContainerStyle = window.getComputedStyle(containerWindow);
    let computedheaderStyle = window.getComputedStyle(headerWindow);
    let computedElementStyle = window.getComputedStyle(getElement);
    let MouseDownCheck = false;
    getElement.style.position = "absolute";
    getElement.style.zIndex = 4;
    //이벤트 등록.
    getElement.addEventListener("mousedown", MouseDownEvent, false);
    getElement.addEventListener("mouseover", MouseOverEvent, false);
    getElement.addEventListener("mouseout", MouseOutEvent_for_DeleteBtn, false);
    let currentX = parseInt(computedElementStyle.top / 10);
    let currentY = parseInt(computedElementStyle.left / 10);
    function MouseOverEvent(event) {
      let DeleteBtn = document.getElementById(
        getData.htmlID + "DeleteBtn" + getData.id
      );
      event.stopPropagation();
      DeleteBtn.style.display = "block";
    }
    function MouseOutEvent(event) {
      if (MouseDownCheck) {
        onMouseMove(event);
        event.stopPropagation();
      }
    }
    function MouseOutEvent_for_DeleteBtn() {
      let DeleteBtn = document.getElementById(
        getData.htmlID + "DeleteBtn" + getData.id
      );
      DeleteBtn.style.display = "none";
    }
    function MouseDownEvent(event) {
      if (!store.state.UsersDocument.CheckResizeMode) {
        currentX = event.pageX - ThisWindow.getBoundingClientRect().left;
        currentY =
          event.pageY -
          parseInt(computedContainerStyle.paddingTop, 10) -
          parseInt(computedheaderStyle.height, 10) -
          200;
        moveAt(currentX, currentY);
        ThisWindow.append(getElement);
        MouseDownCheck = true;
        window.addEventListener("scroll", ScrollEvent);
        window.addEventListener("mousemove", MouseMoveEvent);
        getElement.addEventListener("mouseout", MouseOutEvent);
        event.stopPropagation();
      }
    }
    function ScrollEvent(event) {
      if (MouseDownCheck) {
        onMouseMove(event);
        event.stopPropagation();
      }
    }
    //이쪽을 건드는 방안은...?그래야 이벤트가 자연스럽게 진행될거같은데????
    getElement.ondragstart = function () {
      return false;
    };
    function MouseMoveEvent(event) {
      if (MouseDownCheck) {
        onMouseMove(event);
        event.stopPropagation();
      }
    }
    //모든 이벤트를 해제하고 페이지에 pdf를 append
    getElement.addEventListener("mouseup", function () {
      MouseDownCheck = false;
      self.append_Into_PDFPage_For_First(getElement, currentX, currentY);
      getElement.removeEventListener("mouseout", MouseOutEvent);
      window.removeEventListener("scroll", ScrollEvent);
      window.removeEventListener("mousemove", MouseMoveEvent);
    });
    function moveAt(currentX, currentY) {
      getElement.style.left =
        currentX - getElement.getBoundingClientRect().width / 2 + "px";
      getElement.style.top =
        currentY - getElement.getBoundingClientRect().height / 2 + "px";
    }
    function onMouseMove(event) {
      if (!store.state.UsersDocument.CheckResizeMode) {
        currentX = event.pageX - ThisWindow.getBoundingClientRect().left;
        //페이지 Y값 - 패딩탑값 - 해더의 높이값 - 해더와 벌어진 마진값200
        currentY =
          event.pageY -
          parseInt(computedContainerStyle.paddingTop, 10) -
          parseInt(computedheaderStyle.height, 10) -
          200;
        if (currentX < 0) {
          currentX = 0;
        }
        if (currentY < 0) {
          currentY = 0;
        }
        moveAt(currentX, currentY);
        event.stopPropagation();
      }
    }
  },
};

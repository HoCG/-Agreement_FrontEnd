import store from '../src/store/store';

//자주쓰는 공통함수들을 담아두는 파일
export default {
    resizeEvent() {
        const CheckBoxArr = store.state.CheckBoxObject.CheckBoxArr;
        const SignArr = store.state.SignObject.SignArr;
        const ShortTextArr = store.state.ShortTextObject.ShortTextArr;
        const LongTextArr = store.state.LongTextObject.LongTextArr;
        let drawerDiv = document.getElementById("drawer");
        let computed_Object_Style = window.getComputedStyle(drawerDiv);
        let computed_Ratio = parseInt(computed_Object_Style.width, 10) / store
            .state
            .PDFScreenInfo
            .OriginalWidth[0];
        //데이터값에 저장되어있는 width, height, left, top값을 모두 적용시켜줍니다.
        for (let ShortTextObject of ShortTextArr) {
            const NewElementDiv = document.getElementById(ShortTextObject.htmlID);
            NewElementDiv.style.width = ShortTextObject.width * computed_Ratio + "px";
            NewElementDiv.style.height = ShortTextObject.height * computed_Ratio + "px";
            NewElementDiv.style.left = ShortTextObject.x * computed_Ratio + "px";
            NewElementDiv.style.top = ShortTextObject.y * computed_Ratio + "px";
        }
        for (let LongTextObject of LongTextArr) {
            const NewElementDiv = document.getElementById(LongTextObject.htmlID);
            NewElementDiv.style.width = LongTextObject.width * computed_Ratio + "px";
            NewElementDiv.style.height = LongTextObject.height * computed_Ratio + "px";
            NewElementDiv.style.left = LongTextObject.x * computed_Ratio + "px";
            NewElementDiv.style.top = LongTextObject.y * computed_Ratio + "px";
        }
        for (let CheckBoxObject of CheckBoxArr) {
            const NewElementDiv = document.getElementById(CheckBoxObject.htmlID);
            NewElementDiv.style.width = CheckBoxObject.width * computed_Ratio + "px";
            NewElementDiv.style.height = CheckBoxObject.height * computed_Ratio + "px";
            NewElementDiv.style.left = CheckBoxObject.x * computed_Ratio + "px";
            NewElementDiv.style.top = CheckBoxObject.y * computed_Ratio + "px";
        }
        for (let SignObject of SignArr) {
            const NewElementDiv = document.getElementById(SignObject.htmlID);
            NewElementDiv.style.width = SignObject.width * computed_Ratio + "px";
            NewElementDiv.style.height = SignObject.height * computed_Ratio + "px";
            NewElementDiv.style.left = SignObject.x * computed_Ratio + "px";
            NewElementDiv.style.top = SignObject.y * computed_Ratio + "px";
        }
    },
    makeCheckBox(CheckBoxObject, computed_Ratio) {
        let submittee_object_checkbox = {
            name: "",
            x_position: 0,
            y_position: 0,
            width: 0,
            height: 0,
            rotate: 0,
            page: 0,
            type: "DEFAULT",
            color: "#000000",
            font_size: 24,
            checked: false
        }
        submittee_object_checkbox.name = CheckBoxObject.title;
        submittee_object_checkbox.x_position = CheckBoxObject.x * computed_Ratio;
        submittee_object_checkbox.y_position = CheckBoxObject.y * computed_Ratio;
        submittee_object_checkbox.width = CheckBoxObject.width * computed_Ratio;
        submittee_object_checkbox.height = CheckBoxObject.height * computed_Ratio;
        submittee_object_checkbox.rotate = 0;
        submittee_object_checkbox.page = CheckBoxObject.page;
        submittee_object_checkbox.type = "DEFAULT";
        submittee_object_checkbox.checked = CheckBoxObject.checked;
    },
    makeShortText(ShortTextObject, computed_Ratio){
        let submittee_object_text = {
            name: "",
            x_position: 0,
            y_position: 0,
            width: 0,
            height: 0,
            rotate: 0,
            page: 0,
            type: "DEFAULT",
            color: "#000000",
            font_size: 24,
            content: ""
        };
        submittee_object_text.name = ShortTextObject.title;
        submittee_object_text.x_position = ShortTextObject.x * computed_Ratio;
        submittee_object_text.y_position = ShortTextObject.y * computed_Ratio;
        submittee_object_text.width = ShortTextObject.width * computed_Ratio;
        submittee_object_text.height = ShortTextObject.height * computed_Ratio;
        submittee_object_text.rotate = 0;
        submittee_object_text.page = ShortTextObject.page;
        submittee_object_text.type = "SHORT_TEXT";
        submittee_object_text.content = ShortTextObject.text;
    },
    makeLongText(LongTextObject, computed_Ratio){
        let submittee_object_text = {
            name: "",
            x_position: 0,
            y_position: 0,
            width: 0,
            height: 0,
            rotate: 0,
            page: 0,
            type: "DEFAULT",
            color: "#000000",
            font_size: 24,
            content: ""
        };
        submittee_object_text.name = LongTextObject.title;
        submittee_object_text.x_position = LongTextObject.x * computed_Ratio;
        submittee_object_text.y_position = LongTextObject.y * computed_Ratio;
        submittee_object_text.width = LongTextObject.width * computed_Ratio;
        submittee_object_text.height = LongTextObject.height * computed_Ratio;
        submittee_object_text.rotate = 0;
        submittee_object_text.page = LongTextObject.page;
        submittee_object_text.type = "LONG_TEXT";
        submittee_object_text.content = LongTextObject.text;
    },
    makeSign(SignObject, computed_Ratio) {
        let submittee_object_sign = {
            name: "",
            x_position: 0,
            y_position: 0,
            width: 0,
            height: 0,
            rotate: 0,
            page: 0,
            type: "DEFAULT",
            color: "#000000",
            font_size: 24
        }
        submittee_object_sign.name = SignObject.title;
        submittee_object_sign.x_position = SignObject.x * computed_Ratio;
        submittee_object_sign.y_position = SignObject.y * computed_Ratio;
        submittee_object_sign.width = SignObject.width * computed_Ratio;
        submittee_object_sign.height = SignObject.height * computed_Ratio;
        submittee_object_sign.rotate = 0;
        submittee_object_sign.page = SignObject.page;
        submittee_object_sign.type = "DEFAULT";

        return submittee_object_sign
    },
    readAllObject(responseData) {
        console.log("run")
        //가지고 온 데이터에서
        this.readTextObject(responseData.project_object_texts); //텍스트들만 따로 처리.
        this.readCheckBoxObject(responseData.project_object_checkboxes); //체크박스만 따로 처리.
        this.readSignObject(responseData.project_object_signs); //사인값만 따로 처리.
    },
    //아래 모든 함수들은 데이터를 저장하는 과정입니다.
    readTextObject(project_object_texts) {
        console.log("run")
        const ShortText = store.state.ShortTextObject.ShortText;
        const LongText = store.state.LongTextObject.LongText;
        // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
        for (let TextObject of project_object_texts) {
            if (TextObject.type === "SHORT_TEXT") {
                ShortText.htmlID = "ShortTextObjectArea"
                ShortText.title = TextObject.name;
                ShortText.width = TextObject.width;
                ShortText.height = TextObject.height;
                ShortText.x = TextObject.x_position;
                ShortText.y = TextObject.y_position;
                ShortText.page = TextObject.page;
                ShortText.push_or_readCheck = false;
                console.log(ShortText);
                store
                    .commit("ADD_SHORTTEXT_OBJECT", ShortText);
            } else {
                LongText.htmlID = "LongTextObjectArea"
                LongText.title = TextObject.name;
                LongText.width = TextObject.width;
                LongText.height = TextObject.height;
                LongText.x = TextObject.x_position;
                LongText.y = TextObject.y_position;
                LongText.page = TextObject.page;
                LongText.push_or_readCheck = false;
                store
                    .commit("ADD_LONGTEXT_OBJECT", LongText);
            }
        }
    },
    readCheckBoxObject(project_object_checkboxes) {
        const CheckBox = store.state.CheckBoxObject.CheckBox
       // 현재 div의 가로값 / 서버에서 전달받은 원래 가로값.
        for (let CheckBoxObject of project_object_checkboxes) {
            CheckBox.htmlID = "CheckBoxObjectArea"
            CheckBox.title = CheckBoxObject.name;
            CheckBox.width = CheckBoxObject.width;
            CheckBox.height = CheckBoxObject.height;
            CheckBox.x = CheckBoxObject.x_position;
            CheckBox.y = CheckBoxObject.y_position;
            CheckBox.page = CheckBoxObject.page;
            CheckBox.push_or_readCheck = false;
            store
                .commit("ADD_CHECKBOX_OBJECT", CheckBox);
        }
    },
    readSignObject(project_object_signs) {
        const Sign = store.state.SignObject.Sign
        for (let SignObject of project_object_signs) {
            Sign.htmlID = "SignObjectArea"
            Sign.title = SignObject.name;
            Sign.width = SignObject.width;
            Sign.height = SignObject.height;
            Sign.x = SignObject.x_position;
            Sign.y = SignObject.y_position;
            Sign.page = SignObject.page;
            Sign.push_or_readCheck = false;
            store
                .commit("ADD_SIGN_OBJECT", Sign);
        }
    }
}
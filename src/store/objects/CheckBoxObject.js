const state = {
    CheckBox: initObject(),
    CheckBoxArr: []
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_CHECKBOX_OBJECTS(state) {
        state.CheckBoxArr = [];
    },
    UPDATE_CHECKBOX_OBJECT(state, getCheckBox) {
        let checkOverlapID = 1;
        while (
            state.CheckBoxArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        state.CheckBoxArr = state
            .CheckBoxArr
            .filter(e => e.id !== getCheckBox.id);
        getCheckBox.id = checkOverlapID;
        getCheckBox = makeObject(getCheckBox);
        state
            .CheckBoxArr
            .push(getCheckBox);
        state.CheckBox = initObject();
    },

    //이벤트를 추가하는 과정.
    ADD_CHECKBOX_OBJECT(state, getCheckBox) {
        getCheckBox = makeObject(state, getCheckBox);
        state
            .CheckBoxArr
            .push(getCheckBox);
        state.CheckBox = initObject();
    },
    FIND_CHECKBOX_OBJECT(state, ElementID){
        state.CheckBox = state.CheckBoxArr.find(object => object.htmlID === ElementID)
    },
    DELETE_CHECKBOX_OBJECT(state, getCheckBox) {
        state.CheckBoxArr = state
            .CheckBoxArr
            .filter(e => e.id !== getCheckBox.id);
        state.CheckBox = initObject();
    }
};

//비동기 처리들.
const actions = {};

const makeObject = (state, Object) => {        
    let checkOverlapID = 1;
    if(state.CheckBoxArr.length !== 0){
        while (
            state.CheckBoxArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
    }
    return {
        htmlID: Object.htmlID,
        id: checkOverlapID,
        title: Object.title,
        width: Object.width,
        height: Object.height,
        x: Object.x,
        y: Object.y
    }
};

//이벤트의 형태를 잡아주는 변수.
function initObject() {
    return {
        htmlID: '',
        id: '',
        title: '',
        width: '',
        height: '',
        x: '',
        y: ''
    }
}

export default {mutations, state, actions};
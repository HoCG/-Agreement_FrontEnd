const state = {
    ShortText: initObject(),
    ShortTextArr: [],
    NewX: 0,
    NewY: 0
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_SHORTTEXT_OBJECTS(state) {
        state.ShortTextArr = [];
    },
    FORMAT_SHORTTEXT_OBJECT(state) {
        state.ShortText = initObject();
    },
    UPDATE_SHORTTEXT_OBJECT(state, getShortText) {
        let checkOverlapID = 1;
        while (
            state.ShortTextArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        state.ShortTextArr = state
            .ShortTextArr
            .filter(e => e.id !== getShortText.id);
        getShortText.id = checkOverlapID;
        getShortText = makeObject(getShortText);
        state
            .ShortTextArr
            .push(getShortText);
        state.ShortText = initObject();
    },
    //이벤트를 추가하는 과정.
    ADD_SHORTTEXT_OBJECT(state, getShortText) {
        getShortText = makeObject(state, getShortText);
        state
            .ShortTextArr
            .push(getShortText);
        state.ShortText = initObject();
    },
    SET_SHORTTEXT_X(state, x){
        state.NewX = x;
    },
    SET_SHORTTEXT_Y(state, y){
        state.NewY = y;
    },
    FIND_AND_SETTING_X_Y_SHORTTEXT_OBJECT(state, ElementID){
        state.ShortTextArr.find(object => object.htmlID === ElementID).x = state.NewX;
        state.ShortTextArr.find(object => object.htmlID === ElementID).y = state.NewY;
    },
    DELETE_SHORTTEXT_OBJECT(state, getShortTextID) {
        state.ShortTextArr = state
            .ShortTextArr
            .filter(e => e.htmlID !== getShortTextID);
        state.ShortText = initObject();
    }
};

//비동기 처리들.
const actions = {};

const makeObject = (state, Object) => {        
    let checkOverlapID = 1;
    while (
        state.ShortTextArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
    ) {
        checkOverlapID++;
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
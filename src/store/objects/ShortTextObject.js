const state = {
    ShortText: initObject(),
    ShortTextArr: []
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_SHORTTEXT_OBJECTS(state) {
        state.ShortTextArr = [];
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
    FIND_SHORTTEXT_OBJECT(state, ElementID){
        state.ShortText = state.ShortTextArr.find(object => object.htmlID === ElementID)
    },
    DELETE_SHORTTEXT_OBJECT(state, getShortText) {
        state.ShortTextArr = state
            .ShortTextArr
            .filter(e => e.id !== getShortText.id);
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
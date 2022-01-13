const state = {
    LongText: initObject(),
    LongTextArr: []
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_LONGTEXT_OBJECTS(state) {
        state.LongTextArr = [];
    },
    UPDATE_LONGTEXT_OBJECT(state, getLongText) {
        let checkOverlapID = 1;
        while (
            state.LongTextArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        state.LongTextArr = state
            .LongTextArr
            .filter(e => e.id !== getLongText.id);
        getLongText.id = checkOverlapID;
        getLongText = makeObject(getLongText);
        state
            .LongTextArr
            .push(getLongText);
        state.LongText = initObject();
    },

    //이벤트를 추가하는 과정.
    ADD_LONGTEXT_OBJECT(state, getLongText) {
        let checkOverlapID = 1;
        while (
            state.LongTextArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        getLongText.id = checkOverlapID;
        getLongText = makeObject(getLongText);
        state
            .LongTextArr
            .push(getLongText);
        state.LongText = initObject();
    },

    DELETE_LONGTEXT_OBJECT(state, getLongText) {
        state.LongTextArr = state
            .LongTextArr
            .filter(e => e.id !== getLongText.id);
        state.LongText = initObject();
    }
};

//비동기 처리들.
const actions = {};

const makeObject = (Object) => {
    return {
        htmlID: Object.htmlID,
        id: Object.id,
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
const state = {
    ShortText: initObject(),
    ShortTextArr: [],
    ShortTextDefineCheck: false,
    SetX: 0,
    SetY: 0,
    NewWidth: 0,
    SetPage: 0
};

//사용되는 동작들
const mutations = {
    SET_SHORTTEXT_INFO(state, {getDataID, x, y, i}){
        state.ShortTextArr.find(object => object.htmlID === getDataID).x = x;
        state.ShortTextArr.find(object => object.htmlID === getDataID).y = y;
        state.ShortTextArr.find(object => object.htmlID === getDataID).page = i;
    },
    FORMAT_ALL_SHORTTEXT_OBJECTS(state) {
        state.ShortTextArr = [];
    },
    FORMAT_SHORTTEXT_OBJECT(state) {
        state.ShortText = initObject();
    },
    //이벤트를 추가하는 과정.
    ADD_SHORTTEXT_OBJECT(state, getShortText) {
        getShortText = makeObject(state, getShortText);
        state
            .ShortTextArr
            .push(getShortText);
        state.ShortText = initObject();
        state.ShortTextDefineCheck = true;
    },
    SET_SHORTTEXT_WIDTH(state, width){
        state.NewWidth = width;
    },
    SET_SHORTTEXT_X(state, x){
        state.SetX = x;
    },
    SET_SHORTTEXT_Y(state, y){
        state.SetY = y;
    },
    SET_SHORTTEXT_PAGE(state, page){
        state.SetPage = page;
    },
    FIND_AND_SETTING_W_SHORTTEXT_OBJECT(state, ElementID){
        state.ShortTextArr.find(object => object.htmlID === ElementID).width = state.NewWidth;
    },
    FIND_AND_SETTING_X_Y_PAGE_SHORTTEXT_OBJECT(state, ElementID){
        state.ShortTextArr.find(object => object.htmlID === ElementID).x = state.SetX;
        state.ShortTextArr.find(object => object.htmlID === ElementID).y = state.SetY;
        state.ShortTextArr.find(object => object.htmlID === ElementID).page = state.SetPage;
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
        htmlID: Object.htmlID + checkOverlapID,
        id: checkOverlapID,
        title: Object.title + checkOverlapID,
        width: Object.width,
        height: Object.height,
        text: Object.text,
        x: Object.x,
        y: Object.y,
        page: Object.page,
        push_or_readCheck: Object.push_or_readCheck
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
        y: '',
        page: '',
        push_or_readCheck: false,
        text: ''
    }
}

export default {mutations, state, actions};
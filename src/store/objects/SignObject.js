const state = {
    Sign: initObject(),
    SignArr: [],
    NewX: 0,
    NewY: 0,
    NewWidth: 0,
    NewHeight: 0,
    SetPage: 0,
    SignDefineCheck: false
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_SIGN_OBJECTS(state) {
        state.SignArr = [];
    },
    FORMAT_SIGN_OBJECT(state) {
        state.SignArr = initObject();
    },
    //이벤트를 추가하는 과정.
    ADD_SIGN_OBJECT(state, getSign) {
        getSign = makeObject(state, getSign);
        state
            .SignArr
            .push(getSign);
        state.Sign = initObject();
        state.SignDefineCheck = true;
    },
    SET_SIGN_X(state, x){
        state.NewX = x;
    },
    SET_SIGN_Y(state, y){
        state.NewY = y;
    },
    SET_SIGN_WIDTH(state, width){
        state.NewWidth = width;
    },
    SET_SIGN_HEIGHT(state, height){
        state.NewHeight = height;
    },
    SET_SIGN_PAGE(state, page){
        state.SetPage = page;
    },
    FIND_AND_SETTING_W_H_SIGN_OBJECT(state, ElementID){
        state.SignArr.find(object => object.htmlID === ElementID).width = state.NewWidth;
        state.SignArr.find(object => object.htmlID === ElementID).height = state.NewHeight;
    },
    FIND_AND_SETTING_X_Y_PAGE_SIGN_OBJECT(state, ElementID){
        state.SignArr.find(object => object.htmlID === ElementID).x = state.NewX;
        state.SignArr.find(object => object.htmlID === ElementID).y = state.NewY;
        state.SignArr.find(object => object.htmlID === ElementID).page = state.SetPage;
    },
    DELETE_SIGN_OBJECT(state, getSignID) {
        state.SignArr = state
            .SignArr
            .filter(e => e.htmlID !== getSignID);
        state.Sign = initObject();
    }
};

//비동기 처리들.
const actions = {};

const makeObject = (state, Object) => {        
    let checkOverlapID = 1;
    while (
        state.SignArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
    ) {
        checkOverlapID++;
    }
    return {
        htmlID: Object.htmlID + checkOverlapID,
        id: checkOverlapID,
        title: Object.title + checkOverlapID,
        width: Object.width,
        height: Object.height,
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
        push_or_readCheck: false
    }
}

export default {mutations, state, actions};
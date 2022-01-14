const state = {
    Document: initDocument(),
    DocumentArr: []
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_DOCUMENTS(state) {
        state.DocumentArr = [];
    },
    FORMAT_DOCUMENT(state) {
        state.Document = initDocument();
    },
    UPDATE_DOCUMENT(state, getDocument) {
        let checkOverlapID = 1;
        while (
            state.DocumentArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        state.DocumentArr = state
            .DocumentArr
            .filter(e => e.id !== getDocument.id);
        getDocument.id = checkOverlapID;
        getDocument = makeDocument(getDocument);
        state
            .DocumentArr
            .push(getDocument);
        state.Document = initDocument();
    },
    //이벤트를 추가하는 과정.
    ADD_DOCUMENT(state, getDocument) {
        getDocument = makeDocument(state, getDocument);
        state
            .DocumentArr
            .push(getDocument);
        state.Document = initDocument();
    },
    FIND_DOCUMENT(state, ElementID){
        state.Document = state.DocumentArr.find(Document => Document.htmlID === ElementID);
    },
    DELETE_DOCUMENT(state, getDocument) {
        state.DocumentArr = state
            .DocumentArr
            .filter(e => e.id !== getDocument.id);
        state.Document = initDocument();
    }
};

//비동기 처리들.
const actions = {};

const makeDocument = (state, Document) => {        
    let checkOverlapID = 1;
    while (
        state.DocumentArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
    ) {
        checkOverlapID++;
    }
    return {
        id: checkOverlapID,
        documentTitle: Document.documentTitle,
        Link: Document.Link,
        src: Document.src,
        documentWritersCount: Document.documentWritersCount,
        State: Document.State
    }
};

//이벤트의 형태를 잡아주는 변수.
function initDocument() {
    return {
        id: '',
        documentTitle: '',
        Link: '',
        src: '',
        documentWritersCount: '',
        State: ''
    }
}

export default {mutations, state, actions};
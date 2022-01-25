//유저가 가지고있는 문서 정보를 담고있는 데이터입니다.

import {requestProject, postProject, requestProjectsWriter, changeStateProject, requestProjectInfo} from "../../apis/project_api";
//import {router} from "../../routes/route";

const state = {
    Document: initDocument(),
    DocumentArr: [],
    response: "",
    want_Document_Name: "",
    CheckResizeMode: false, //해당 문서내에 오브젝트 resize를 하고있는지 확인하기위한 변수
};

//사용되는 동작들
const mutations = {
    SET_DOCUMENT(state, getDocument) {
        state.Document = makeDocument(getDocument);
    },
    FORMAT_ALL_DOCUMENTS(state) {
        state.DocumentArr = [];
    },
    FORMAT_DOCUMENT(state) {
        state.Document = initDocument();
    },
    FORMAT_ALL_WRITERS(state, DocumentName) {
        state.DocumentArr.find(D => D.name === DocumentName).documentWriter = [];
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
    CHANGE_STATE_DOCUMENT(state, getDocument){
        getDocument = makeDocument(getDocument);
        state.DocumentArr = state
                                .DocumentArr
                                .filter(e => e.id !== getDocument.id);
    },
    //이벤트를 추가하는 과정.
    ADD_DOCUMENT(state, getDocument) {
        state
            .DocumentArr
            .unshift(getDocument);
        state.Document = initDocument();
    },
    ADD_DOCUMENTS(state, getDocuments){
        state.DocumentArr = [];
        for(let DocumentElement of getDocuments.projects){
            DocumentElement = makeDocument(DocumentElement);
            state
                .DocumentArr
                .push(DocumentElement);
        }
    },
    FIND_DOCUMENT(state, ElementID){
        state.Document = state.DocumentArr.find(Document => Document.htmlID === ElementID);
    },
    DELETE_DOCUMENT(state, getDocument) {
        state.DocumentArr = state
            .DocumentArr
            .filter(e => e.id !== getDocument.id);
        state.Document = initDocument();
    },

    WRITER_INPUT(state, data) {
        for(let element of data){
            state.DocumentArr.find(D => D.name === state.want_Document_Name).documentWriter.push(makeWriterDocument(element));
        }
        state.Document = initDocument();
        state.want_Document_Name = "";
    },
    //임시적으로 불러오기 원하는 다큐먼트의 이름을 저장해둔다.
    WANT_DOCUMENT_NAME_SETTING(state, DocumentName){
        state.want_Document_Name = DocumentName;
    }
};

//비동기 처리들.
const actions = {
    async REQUEST_PROJECT(context) {
        try {
            const response = await requestProject();
            console.log(response.data)
            context.commit('ADD_DOCUMENTS', response.data);
        } catch (e) {
           alert("불러오기 실패");
        }
    },
    async REQUEST_PROJECT_INFO(context, DocumentName) {
        try {
            const response = await requestProjectInfo(DocumentName);
            console.log(response.data)
            context.commit('GET_DOCUMENTS_INFO', response.data);
        } catch (e) {
           alert("불러오기 실패");
        }
    },
    async POST_PROJECT(context, getDocument) {
        try {
            const response = await postProject(getDocument);
            getDocument.id = response.data.idx;
            getDocument.name = response.data.name;
            context.commit("ADD_DOCUMENT", getDocument);
            return response;
        } catch (e) {
           alert("보내기 실패");
        }
    },
    async REQUEST_PROJECT_WRITER(context, DocumentName) {
        try {
            const response = await requestProjectsWriter(DocumentName);
            context.commit("WANT_DOCUMENT_NAME_SETTING", DocumentName);
            context.commit("WRITER_INPUT", response.data.submittees);
            return response;
        } catch (e) {
           alert("불러오기 실패");
        }
    },
    async STATE_CHANGE(context, Document) {
        try {
            const response = await changeStateProject(Document.name, Document.State);
            context.commit("CHANGE_STATE_DOCUMENT", Document);
            return response;
        } catch (e) {
           alert("불러오기 실패");
        }
    }
};

const makeDocument = (Document) => {        
    return {
        id: Document.idx,
        documentTitle: Document.title,
        name: Document.name,
        Link: "",
        src: "",
        documentWritersCount: Document.submittee_count,
        State: Document.state,
        documentWriter: []
    }
};                   

const makeWriterDocument = (data) => {
    return {
        id: data.idx,
        student_id: data.student_id,
        date: data.date,
        writer: data.student_name,
        name: data.name,
    }
};

//이벤트의 형태를 잡아주는 변수.
function initDocument() {
    return {
        id: '',
        documentTitle: '',
        name: '',
        Link: '',
        src: '',
        documentWritersCount: '',
        State: '',
        documentWriter: []
    }
}

export default {mutations, state, actions};
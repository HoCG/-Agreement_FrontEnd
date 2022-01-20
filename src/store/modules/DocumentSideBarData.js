//옆 사이드바의 형태를 결정해주는 vuex파일
const state = {
    Show_WriterDocumentList: false,
    Show_UserDocumentList: false,
};
const mutations = {
    SET_WRITER_DOCUMENT_LIST_TRUE(state){
        state.Show_WriterDocumentList = true;
    },
    SET_WRITER_DOCUMENT_LIST_FALSE(state){
        state.Show_WriterDocumentList = false;
    },
    SET_USER_DOCUMENT_LIST_TRUE(state){
        state.Show_UserDocumentList = true;
    },
    SET_USER_DOCUMENT_LIST_FALSE(state){
        state.Show_UserDocumentList = false;
    },
}

export default {state, mutations};
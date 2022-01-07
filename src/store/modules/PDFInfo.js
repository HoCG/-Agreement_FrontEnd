const state = {
    PDFTitle: ""
};
const mutations = {
    SET_DOCUMENT_TITLE(state, titleInfo){
        state.PDFTitle = titleInfo;
    }
}

export default {state, mutations};
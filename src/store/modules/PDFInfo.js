const state = {
    PDFTitle: "",
    src: "",
    numPages: undefined,
    PDFPageInfo: 0,
    PDFFileUploadCheck: false
};
const mutations = {
    SET_DOCUMENT_TITLE(state, titleInfo){
        state.PDFTitle = titleInfo;
    },
    SHOW_EDIT_PAGE(state){
        state.PDFFileUploadCheck = true;
    },
    CLOSE_EDIT_PAGE(state){
        state.PDFFileUploadCheck = false;
    },
    SET_PDF_FILE_PAGE_INFO(state, number){
        console.log(number);
        state.PDFPageInfo = parseInt(number);
        console.log(state.PDFPageInfo);
    },
    SET_PDF_FILE_SRC(state, src){
        console.log(src);
        state.src = src;
    }
}

export default {state, mutations};
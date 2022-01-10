const state = {
    PDFTitle: "",
    PDFPageInfo: 0,
    PDFFileUploadCheck: false
};
const mutations = {
    SET_DOCUMENT_TITLE(state, titleInfo){
        state.PDFTitle = titleInfo;
    },
    SET_PDF_FILE_UPLOAD_CHECK_TRUE(state){
        state.PDFFileUploadCheck = true;
    },
    SET_PDF_FILE_UPLOAD_CHECK_FALSE(state){
        state.PDFFileUploadCheck = false;
    },
    SET_PDF_FILE_PAGE_INFO(state, number){
        state.PDFPageInfo = parseInt(number);
    }
}

export default {state, mutations};
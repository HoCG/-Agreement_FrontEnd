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
    SET_PDF_FILE_UPLOAD_CHECK_TRUE(state){
        state.PDFFileUploadCheck = true;
    },
    SET_PDF_FILE_UPLOAD_CHECK_FALSE(state){
        state.PDFFileUploadCheck = false;
    },
    SET_PDF_FILE_PAGE_INFO(state, number){
        state.PDFPageInfo = parseInt(number);
    },
    SET_PDF_FILE_SRC(state, src){
        console.log(src);
        state.src = src;
    }
}

export default {state, mutations};
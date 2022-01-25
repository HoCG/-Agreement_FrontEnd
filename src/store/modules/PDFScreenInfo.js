//화면에서 보여지는 PDF의 정보를 담는 파일입니다.
const state = {
    PDFTitle: "",
    numPages: undefined,
    PDFPageInfo: 0,
    PDFFileUploadCheck: false,
    PDFWriteComplete: false,
    OriginalWidth: []
};
const mutations = {
    SET_DOCUMENT_TITLE(state, titleInfo){
        state.PDFTitle = titleInfo;
    },
    SHOW_EDIT_PAGE(state){
        state.PDFFileUploadCheck = true;
    },
    SHOW_WRITE_END_PAGE(state){
        state.PDFWriteComplete = true;
    },
    CLOSE_EDIT_PAGE(state){
        state.PDFFileUploadCheck = false;
    },
    SET_PDF_FILE_PAGE_INFO(state, number){
        state.PDFPageInfo = parseInt(number);
    },
    SAVE_ORIGINAL_WIDTH(state, WidthInfo){
        state.OriginalWidth.push(WidthInfo);
    },
    FORMAT_ORIGINAL_WIDTH(state){
        state.OriginalWidth = [];
    }
}

export default {state, mutations};
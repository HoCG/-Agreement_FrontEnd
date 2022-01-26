//화면에서 보여지는 PDF의 정보를 담는 파일입니다.
const state = {
    PDFTitle: "",
    numPages: undefined,
    PDFPageInfo: 0,
    PDFFileUploadCheck: false,
    PDFWriteComplete: false,
    OriginalWidth: [],
    src: "",
    file: "",
};
const mutations = {
    SET_DOCUMENT_FILE(state, file){
        console.log(file);
        state.file = file;
        console.log(state.file);
    },
    SET_DOCUMENT_SRC(state, src){
        console.log(src);
        state.src = src;
        console.log(state.src);
    },
    SET_DOCUMENT_TITLE(state, titleInfo){
        state.PDFTitle = titleInfo;
        console.log(state.PDFTitle);
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
        console.log(state.OriginalWidth);
    },
    FORMAT_ORIGINAL_WIDTH(state){
        state.OriginalWidth = [];
    }
}

export default {state, mutations};
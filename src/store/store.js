import Vuex from 'vuex';
import Vue from 'vue';
import DialogData from './modules/DialogData';
import PDFInfo from './modules/PDFInfo';
import Alert from './modules/Alert';
import admin from './users/admin';
import writer from './users/writer'
import DocumentSideBarData from './modules/DocumentSideBarData';
import vueMoment from 'vue-moment';
import CheckBoxObject from './objects/CheckBoxObject';
import LongTextObject from './objects/LongTextObject';
import ShortTextObject from './objects/ShortTextObject';
import SignObject from './objects/SignObject';
import UsersDocument from './users/UsersDocument'
//import createPersistedState from "vuex-persistedstate" 작성시 페이지내에 정보 유지.

Vue.use(vueMoment);
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        DocumentSideBarData,
        Alert,
        admin,
        PDFInfo,
        DialogData,
        SignObject,
        CheckBoxObject,
        LongTextObject,
        ShortTextObject,
        UsersDocument,
        writer
    }
    /*,
    plugins: [ createPersistedState({ //주목! : 여기에 쓴 모듈만 저장됩니다. 
        paths: ["calendar"] })
    ]
    */
})
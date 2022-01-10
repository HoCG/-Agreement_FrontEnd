import Vuex from 'vuex';
import Vue from 'vue';
import DialogData from './modules/DialogData';
import PDFInfo from './modules/PDFInfo';
import CheckBoxObject from './objects/CheckBoxObject';
import LongTextObject from './objects/LongTextObject';
import ShortTextObject from './objects/ShortTextObject';
import SignObject from './objects/SignObject';
import vueMoment from 'vue-moment' 
//import createPersistedState from "vuex-persistedstate" 작성시 페이지내에 정보 유지.

Vue.use(vueMoment);
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        LongTextObject,
        ShortTextObject,
        SignObject,
        CheckBoxObject,
        PDFInfo,
        DialogData
    }
    /*,
    plugins: [ createPersistedState({ //주목! : 여기에 쓴 모듈만 저장됩니다. 
        paths: ["calendar"] })
    ]
    */
})
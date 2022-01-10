const state = {
    //이 아래 두 데이터는 특정 경우가 아니면 건들지 못하도록 제한을 걸어야함.
    currentUser: initUser(), //현재 유저정보. 로그인되어 사용될 데이터
    LoginMode: false, //로그인 상태 유무를 확인하는 데이터

    AllUsersInfo: [], //저장된 유저들을 담는 배열.


    TheUser_usedByData: initUser(), //데이터 전용 유저개체랑 실제 로그인된 유저개체를 분리시킬 필요가 있을듯. 그래서 만든 데이터.
    //이로인해 변수명을 전체적으로 수정할 필요가 있어졌다...!


    //제대로 로그인을 했는지 안했는지를 확인하는 데이터.
    passwordError: false,
    ID_or_PasswordError: false,
    AllClear: false
};

//사용되는 동작들
const mutations = {
    //이벤트를 수정하는 동작이다. 클릭된 일정에 id가 일치하지 않는 User를 AllUsersInfo내에 찾아내고
    //찾아낸 이벤트값들로 events 배열을 재구성하고 최종적으로 수정된 event를 집어넣어주면 끝이다.
    FORMAT_USER_INFO(state){
        state.TheUser_usedByData = initUser();
    },
    LOGOFF_USER(state){
        state.currentUser = initUser();
        state.LoginMode = false;
    },
    UPDATE_USER_INFO(state, getUser) {
        state.AllUsersInfo = state
            .AllUsersInfo
            .filter(e => e.id !== getUser.id); //이벤트배열의 재구성.
            getUser = makeUser(getUser); //그리고 배열을 추가.
        state
            .AllUsersInfo
            .push(getUser);
        //state.eventAddDialogUpdateMode = false
        //state.eventAddDialog = false;
    },
    FIND_USER(state, getUser){
        getUser = makeUser(getUser);
        if(state.AllUsersInfo.map(u => u.id).includes(getUser.id) && state.AllUsersInfo.map(u => u.password).includes(getUser.password)){
            state.AllClear = true;
            state.ID_or_PasswordError = false;
            state.passwordError = false;
            //로그인에 성공한다면 현재 유저 정보를 가지고온 정보값으로 설정한다.
            //state.currentUser = 
            state.LoginMode = true;
        }
        else if(state.AllUsersInfo.map(u => u.id).includes(getUser.id) && !state.AllUsersInfo.map(u => u.password).includes(getUser.password)){
            state.AllClear = false;
            state.ID_or_PasswordError = true;
            state.passwordError = false;
        }
        else{
            state.AllClear = false;
            state.ID_or_PasswordError = false;
            state.passwordError = true;
        }
    },
    CURRENT_USER_SETTING(state, getUser){
        state.currentUser = state.AllUsersInfo.find(e => e.id === getUser.id);
        console.log(state.currentUser)
    },
    //이벤트를 추가하는 과정.
    ADD_NEW_USER(state, getUser) {
        getUser = makeUser(getUser);
        state
            .AllUsersInfo
            .push(getUser);
        state.TheUser_usedByData = initUser();
        //console.log(state.AllUsersInfo);
    },

    /*
    //쓰는일이 없는 함수이지만, 혹시몰라서 냅둠.
    ADD_EVENTS(state, AllUsersInfo) {
        state.AllUsersInfo = [];
        AllUsersInfo.forEach(e => {
            state
                .AllUsersInfo
                .push(makeUser(state, e));
        });
    },
    */
    
    //바를 클릭했을때 나오는 디테일한 정보를 알려주는 다이얼로그를 보여주는 변수.
    SHOW_USER_INFO(state, getUser) {
        state
            .AllUsersInfo
            .forEach(e => {
                if (e.id === getUser.id) {
                    state.getUser = e;
                }
            })
        state.eventDetailDialog = true;
    },

    //이벤트를 업데이트하는 다이얼로그를 출력하게 도와주는 함수.
    /*
    UPDATE_USER_INFO(state, getUser) {
        state.TheUser_usedByData = makeUser(state, getUser);
        state.eventDetailDialog = false;
        state.eventAddDialogUpdateMode = true; //이벤트를 추가하는 다이얼로그를 출력하긴 한다만,
        state.eventAddDialog = true; //이게 업데이트하는 모드라는걸 알려주기 위해서 이렇게한다.
    },
    */

    //이벤트를 삭제하는 함수. 디테일 다이얼로그내에서 진행되는 동작이기때문에 state.eventDetailDialog = false;
    //다음과같은 변수선언이 존재한다.
    DELETE_USER_INFO(state, getUser) {
        state.AllUsersInfo = state
            .AllUsersInfo
            .filter(e => e.id !== getUser.id);
        //console.log(state.AllUsersInfo);
        state.eventDetailDialog = false;
        state.TheUser_usedByData = initUser();
    }
};

//비동기 처리들.
const actions = {};

// 백엔드의 관점에서 볼때 time과 date를 나눠서 저장하게 되면 변수도 많아질 뿐더러 굉장히 비효율적일 수 밖에 없다. 저장하는 변수의
// 양을 줄일 수 있다면 줄이는게 맞는것이므로 이렇게 합쳐서 저장한다.
const makeUser = (TheUser_usedByData) => {
    return {
        id: TheUser_usedByData.id,
        password: TheUser_usedByData.password,
        userName: TheUser_usedByData.userName,
        userBirthDay: TheUser_usedByData.userBirthDay,
        startDay: TheUser_usedByData.startDay,
        profileImage: TheUser_usedByData.profileImage,
        backgroundImage: TheUser_usedByData.backgroundImage
        /*
        ,
        start: event.startDate + getTime(event.startTime),
        end: event.endDate + getTime(event.endTime),
        */
    }
};

//이벤트의 형태를 잡아주는 변수.
function initUser() {
    return {
        id: '',
        password: '',
        userName: '',
        userBirthDay: '',
        startDay: '',
        profileImage: '',
        backgroundImage: ''
    }
}

export default {mutations, state, actions};
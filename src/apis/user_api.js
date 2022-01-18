import axios from "axios";

/*
function requestJoinMember(member) {
    member.email = member.email.toLowerCase();
    return axios.post(`${process.env.VUE_APP_BASEURL}/api/members/join`, member);
}
*/

function requestLogin(user) {
    return axios.post(`${process.env.VUE_APP_BASEURL}/api/user/authentication`, {
        id: user.id,
        password: user.password
    })
}

/*
function queryMember() {
    return axios.get(`${process.env.VUE_APP_BASEURL}/api/members`);
}
*/

export {
    requestLogin,
    //requestJoinMember,
    //queryMember
}
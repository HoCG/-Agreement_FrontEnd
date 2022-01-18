const setTokenInLocalStorage = (tokenInfo) => {
    localStorage.setItem("access_token", 'Bearer ' + tokenInfo.jwt);
    localStorage.setItem("refresh_token", tokenInfo.jwt);
};

const deleteTokenInLocalStorage = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
};
export {deleteTokenInLocalStorage, setTokenInLocalStorage}
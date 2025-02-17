const getLocalStorage = () => {
    try {
        const userData = localStorage.getItem('userData');
        return userData;
    } catch (error) {
        console.log(error);
    }
}

const getUserName = () => {
    try {
        const userData = getLocalStorage();
        const user = JSON.parse(userData);
        return user.name;
    } catch (error) {
        console.log(error);
    }
}

const getUserEmail = () => {
    try {
        const userData = getLocalStorage();
        const user = JSON.parse(userData);
        return user.email;
    } catch (error) {
        console.log(error);
    }
}

const deleteLocalStorage = () => {
    try {
        localStorage.removeItem('userData');
    } catch (error) {
        console.log(error);
    }
}

export { getLocalStorage, getUserName, getUserEmail, deleteLocalStorage };
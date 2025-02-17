import Cookies from 'universal-cookie';

const cookieChecker = async () => {
    const cookies = new Cookies();
    const cookie = cookies.get('cookie');
    if(cookie){
        console.log("Cookie Found : User is Logged In");
        return true;
    }else{
        console.log("Cookie Not Found : User is Not Logged In");
        return false;
    }
}

export default cookieChecker
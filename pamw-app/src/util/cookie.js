import Cookies from 'universal-cookie';

const cookieName = "PAMWSESSION";

export const setCookie = cookieData => {
    const cookies = new Cookies();
    cookies.set(cookieName, cookieData, { path: '/', httpOnly: 'true' });
    cookies.get(cookieName)
}
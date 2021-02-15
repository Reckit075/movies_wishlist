import { setCookie, getCookie, cookieExist } from "../../helpers/cookies";

export const addMovieToWishlist = (imdbID) => {
    let wishlist
    if (!cookieExist("wishlist"))
        wishlist = [];
    else
        wishlist = getCookie("wishlist").value;

    if (!wishlist.includes(imdbID)) {
        wishlist.push(imdbID);
        setCookie("wishlist", wishlist);
    }
}
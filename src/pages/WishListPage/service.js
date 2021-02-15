import { getMovieById } from "../../Api/index";
import { setCookie, getCookie, cookieExist } from "../../helpers/cookies";

export const getWishListMovies = () => {
    if (!cookieExist("wishlist")) {
        return new Promise((resolve, reject) => resolve([]))
    }
    const moviesOnWishList = getCookie("wishlist").value;
    const requests = moviesOnWishList.map((movie) => {
        return getMovieById(movie).then((movieResponse) => {
            return movieResponse;
        });
    });
    return Promise.all(requests)
}

export const removeMovieFromWishlist = (imdbID) => {
    if (!cookieExist("wishlist"))
        return;

    let wishlist = getCookie("wishlist").value
    const index = wishlist.findIndex(m => m == imdbID)
    console.log(index)
    if (index != -1) {
        wishlist.splice(index, 1)
        setCookie("wishlist", wishlist);
    }
}
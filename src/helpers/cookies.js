export const setCookie = (cname, value) => {
        let d = new Date();
        d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        const json = JSON.stringify({ value })
        document.cookie = cname + "=" + encodeURIComponent(json) + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                const json = c.substring(name.length, c.length);
                return JSON.parse(json) // {value: []}
            }
        }
        return "";
}
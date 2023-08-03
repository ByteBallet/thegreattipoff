import { getSearchId } from "@Components/utils/util";

let clientName = process?.env?.APP_BRAND?.toUpperCase()
export const GTM_SEARCH_ID = getSearchId(clientName)

export const googlesearchpageview = (url) => {
    if ((url == "/hotbets" || url == "/") && GTM_SEARCH_ID?.length > 0) {
        window.gtag("config", GTM_SEARCH_ID, {
            page_path: url,
        });
    }
}


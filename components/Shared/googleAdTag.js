export const GTM_ID = process.env.client.GATag

export const googlepageview = (url) => {
    GTM_ID?.length > 0 && window.gtag("config", GTM_ID, {
        page_path: url,
    });
}
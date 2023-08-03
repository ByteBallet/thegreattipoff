export const FB_PIXEL_ID = process.env.client.fPixelId

export const pageview = () => {
    window && window.fbq && window.fbq('track', 'PageView')
}

export const event = (name, options = {}) => {
    window && window.fbq && window.fbq('track', name, options)
}
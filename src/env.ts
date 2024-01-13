export default class env {
    static SWD_FB_API_KEY() {
        return import.meta.env.SWD_FB_API_KEY
    }

    static SWD_FB_AUTH_DOMAIN() {
        return import.meta.env.SWD_FB_AUTH_DOMAIN
    }

    static SWD_FB_PROJECT_ID() {
        return import.meta.env.SWD_FB_PROJECT_ID
    }

    static SWD_FB_STORAGE_BUCKET() {
        return import.meta.env.SWD_FB_STORAGE_BUCKET
    }

    static SWD_FB_MESSAGING_SENDER_ID() {
        return import.meta.env.SWD_FB_MESSAGING_SENDER_ID
    }

    static SWD_FB_APP_ID() {
        return import.meta.env.SWD_FB_APP_ID
    }
}

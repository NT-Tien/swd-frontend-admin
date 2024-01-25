export default class env {
    public static FB_API_KEY: string
    public static FB_AUTH_DOMAIN: string
    public static FB_PROJECT_ID: string
    public static FB_STORAGE_BUCKET: string
    public static FB_MESSAGING_SENDER_ID: string
    public static FB_APP_ID: string
    public static BACKEND_URL: string
    public static APP_MODE: string

    public static load() {
        env.BACKEND_URL = import.meta.env.SWD_BACKEND_URL
        env.FB_API_KEY = import.meta.env.SWD_FB_API_KEY
        env.FB_AUTH_DOMAIN = import.meta.env.SWD_FB_AUTH_DOMAIN
        env.FB_PROJECT_ID = import.meta.env.SWD_FB_PROJECT_ID
        env.FB_STORAGE_BUCKET = import.meta.env.SWD_FB_STORAGE_BUCKET
        env.FB_MESSAGING_SENDER_ID = import.meta.env.SWD_FB_MESSAGING_SENDER_ID
        env.FB_APP_ID = import.meta.env.SWD_FB_APP_ID
        env.APP_MODE = import.meta.env.SWD_APP_MODE
    }
}

import { joinURL, withQuery } from "ufo";

export default defineEventHandler(async (event) => {

    const proxyURL = useRuntimeConfig().apiBase;
    const path = event.path.replace("/api/", "");

    const target = joinURL(proxyURL, path) 
    return proxyRequest(event, target)
});
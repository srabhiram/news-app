"use server"

import { getSingleNews } from "./getSingleNews"

export async function getRelatedPosts(params:string) {
    return await getSingleNews(params)
}
import { defineCollection, z } from "astro:content";

const services = defineCollection ({
    schema: z.object({
        id: z.number(),
        title: z.string(),
        text: z.string(),
        price: z.string(),
        link: z.string().url(),
        contact: z.string().url(),
        image: z.string(),
        category: z.string(),

    })
})

export const collections = { services }
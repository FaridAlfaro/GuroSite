import { defineCollection, z } from "astro:content";

const services = defineCollection ({
    schema: z.object({
        title: z.string(),
        text: z.string(),
        price: z.string(),
        link: z.string(),
        contact: z.string().url()
    })
})

export const collections = { services }
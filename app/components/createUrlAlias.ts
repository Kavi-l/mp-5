"use server";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function createUrlAlias(
  url: string,
  alias: string, 
  browserUrl: string
): Promise<string> {
  const urlsCollection = await getCollection(URLS_COLLECTION);

  // Check if alias already exists
  const existing = await urlsCollection.findOne({ alias });
  if (existing) {
    throw new Error("Alias already exists");
  }

  const regex = /^https?:\/\/[\w.-]+(?:\/[^\s]*)?$/i;
  if (!regex.test(url)) {
    throw new Error("INVALID URL")
  }

  const shortUrl = `${browserUrl}/${alias}`

  const doc = {
    url,
    alias,
    shortUrl
  };

  const res = await urlsCollection.insertOne(doc);

  if (!res.acknowledged) {
    throw new Error("DB insert failed");
  }

  return shortUrl
}

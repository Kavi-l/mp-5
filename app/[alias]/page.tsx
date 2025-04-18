import { redirect } from "next/navigation";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function Page({ params }: { params: Promise<{ alias: string }> }) {
  const { alias } = await params;

  const urlsCollection = await getCollection(URLS_COLLECTION);
  const doc = await urlsCollection.findOne({ alias });

  if (!doc) {
    throw new Error("Alias not found");
  }

  redirect(doc.url);
}

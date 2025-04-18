import { redirect } from "next/navigation";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function Page({ params }: { params: { alias: string } }) {
  const urlsCollection = await getCollection(URLS_COLLECTION);
  const doc = await urlsCollection.findOne({ alias: params.alias });
  // await urlsCollection.deleteMany({});

  if (!doc) {
    throw new Error("Alias not found");
  }

  redirect(doc.url);
}

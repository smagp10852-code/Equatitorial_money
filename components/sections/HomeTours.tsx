import { sanityClient } from "@/lib/sanity.client";
import { homeToursQuery } from "@/lib/queries";
import ToursSlider from "./ToursSlider";

export default async function HomeTours() {
  const tours = await sanityClient.fetch(homeToursQuery);

  return <ToursSlider tours={tours} />;
}
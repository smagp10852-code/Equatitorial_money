import { sanityClient } from "@/lib/sanity.client";
import {
  indiaStatesQuery,
  internationalCountriesQuery,
} from "@/lib/queries";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {

  const indiaStates = await sanityClient.fetch(indiaStatesQuery);

  const internationalCountries = await sanityClient.fetch(
    internationalCountriesQuery
  );

  return (
    <NavbarClient
      indiaStates={indiaStates}
      internationalCountries={internationalCountries}
    />
  );
}
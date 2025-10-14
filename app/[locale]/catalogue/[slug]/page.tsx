import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";
export const generateMetadata = ({params}:{params:{slug:string}}): Metadata =>
  hreflangFor(`/catalogue/${params.slug}`);
export { default } from "../../../catalogue/[slug]/page";

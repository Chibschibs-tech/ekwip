import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";
export const generateMetadata = ({params}:{params:{slug:string}}): Metadata =>
  hreflangFor(`/store/product/${params.slug}`);
export { default } from "../../../../store/product/[slug]/page";

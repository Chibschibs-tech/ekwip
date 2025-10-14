import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";
export const generateMetadata = (): Metadata => hreflangFor("/catalogue");
export { default } from "../../catalogue/page";

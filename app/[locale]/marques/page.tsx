import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";
export const generateMetadata = (): Metadata => hreflangFor("/marques");
export { default } from "../../marques/page";

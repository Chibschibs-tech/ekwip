import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";
export const generateMetadata = (): Metadata => hreflangFor("/boutique");
export { default } from "../../boutique/page";

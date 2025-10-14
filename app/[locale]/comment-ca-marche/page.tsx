import type {Metadata} from "next";
import {hreflangFor} from "@/i18n/seo";
export const generateMetadata = (): Metadata => hreflangFor("/comment-ca-marche");
export { default } from "../../comment-ca-marche/page";

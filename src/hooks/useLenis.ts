import { useContext } from "react";
import { LenisContext } from "../lib/LenisStore";
export const useLenis = () => useContext(LenisContext);

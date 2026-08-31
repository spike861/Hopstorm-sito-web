import { createContext, useContext } from "react";
export const IntroContext = createContext({ step: 0, reduced: false });
export const useIntro = () => useContext(IntroContext);

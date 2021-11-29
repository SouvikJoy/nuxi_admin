import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";

/**
 * @param {String|String[]} rules
 */
const initRule = (rules) => {
  if (typeof rules === "string") {
    rules = [rules];
  }

  rules.forEach((rule) => {
    if (!AllRules[rule]) {
      throw new Error(`No rule found named "${rule}"`);
    }
    defineRule(rule, AllRules[rule]);
  });
};

/**
 * @param {String[]|String|null} [property=null]
 * @param {Boolean} [clear=false]
 *
 * @return {Object|Array|String|null}
 */
const ssrInitiatedData = (property = null, clear = false) => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const ssrData = window.__SSR_INIT__;
    const script = document.getElementById("__ssr_initiated_data__");

    if (!script || !ssrData) {
      return null;
    }

    const data = !property?.length
      ? ssrData
      : ((sData, prop) => {
          if (Array.isArray(prop)) {
            const obj = {};
            prop.forEach((key) => (obj[key] = sData[key] || null));
            return obj;
          }
          return sData[prop] || null;
        })(ssrData, property);

    if (clear) {
      script.parentNode.removeChild(script);
      window.__SSR_INIT__ = undefined;
    }
    return data;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(e);
    }
    return null;
  }
};

export { initRule, ssrInitiatedData };

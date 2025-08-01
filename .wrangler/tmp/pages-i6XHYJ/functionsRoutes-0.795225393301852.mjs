import { onRequestPost as __api_checkout_ts_onRequestPost } from "C:\\Users\\Huiji\\Desktop\\personal scripts\\practice-fullstack-webapp\\shopping-cart\\functions\\api\\checkout.ts"

export const routes = [
    {
      routePath: "/api/checkout",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_checkout_ts_onRequestPost],
    },
  ]
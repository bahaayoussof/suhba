import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  layout("routes/layout.tsx", [
    route("dashboard/worlds", "routes/dashboard/worlds.tsx"),
    route("dashboard/sessions", "routes/dashboard/sessions/index.tsx"),
    route("dashboard/sessions/new", "routes/dashboard/sessions/new.tsx", [
      index("routes/dashboard/sessions/new/step1.tsx"),
      route("2", "routes/dashboard/sessions/new/step2.tsx"),
      route("3", "routes/dashboard/sessions/new/step3.tsx"),
      route("4", "routes/dashboard/sessions/new/step4.tsx"),
      route("5", "routes/dashboard/sessions/new/step5.tsx"),
      route("confirmation", "routes/dashboard/sessions/new/confirmation.tsx"),
    ]),
  ]),
  route("api/v1/environments", "routes/api/environments.ts"),
  route("api/v1/spaces", "routes/api/spaces.ts"),
] satisfies RouteConfig;


import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  layout("routes/layout.tsx", [
    route("dashboard/worlds", "routes/dashboard/worlds.tsx"),
    route("dashboard/sessions", "routes/dashboard/sessions/index.tsx"),
    route("dashboard/sessions/new", "routes/dashboard/sessions/new.tsx"),
  ]),
  route("api/v1/environments", "routes/api/environments.ts"),
  route("api/v1/spaces", "routes/api/spaces.ts"),
] satisfies RouteConfig;

export { default } from "next-auth/middleware";

// IMPORTANT!!
// middleware.ts should be inside the /src to work

export const config = {
  matcher: ["/dashboard"],
};

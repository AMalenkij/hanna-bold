import type { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";

export default async function protectPage(props: PropsWithChildren) {
  const { userId } = await auth();

  if (userId === process.env.ALLOWED_USER_ID) {
    return <>{props.children}</>;
  }
  return null;
}

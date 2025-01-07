import type { PropsWithChildren } from "react";
import { Protect } from "@clerk/nextjs";

export default function protectPage(props: PropsWithChildren) {
  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      {props.children}
    </Protect>
  );
}

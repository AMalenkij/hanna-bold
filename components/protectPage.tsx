import type { PropsWithChildren } from "react";
import { Protect } from "@clerk/nextjs";

// export default function protectPage(props: PropsWithChildren) {
//   return (
//     <Protect condition={(has) => has({ role: "admin" })}>
//       {props.children}
//     </Protect>
//   );
// }

import { auth } from "@clerk/nextjs/server";

export default async function protectPage(props: PropsWithChildren) {
  const { userId, has } = await auth();

  // For debugging in server logs
  console.log("User ID:", userId);
  console.log("Has admin role (server):", has({ role: "admin" }));
  console.log("Has org:admin role (server):", has({ role: "org:admin" }));

  return (
    <Protect condition={(has) => has({ role: "admin" })}>
      {props.children}
    </Protect>
  );
}

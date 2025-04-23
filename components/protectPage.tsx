import type { PropsWithChildren } from "react";
import { Protect } from "@clerk/nextjs";

// export default function protectPage(props: PropsWithChildren) {
//   return (
//     <Protect condition={(has) => has({ role: "admin" })}>
//       {props.children}
//     </Protect>
//   );
// }

import { useUser, useAuth } from "@clerk/nextjs";

export default function protectPage(props: PropsWithChildren) {
  const { user } = useUser();
  const { has } = useAuth();

  console.log("User metadata:", user?.publicMetadata);
  console.log("Has org:admin role:", has({ role: "org:admin" }));
  console.log("Has admin role:", has({ role: "admin" }));

  return (
    <Protect condition={(has) => has({ role: "org:admin" })}>
      {props.children}
    </Protect>
  );
}

import { HOME_ROUTE } from "@/constants/routes";
import { BAND_NAME } from "@/constants/setting";
import { Link } from "@/i18n/routing";

export default function Logo() {
  return (
    <Link href={HOME_ROUTE} className="font-black text-[37px]">
      {BAND_NAME}
    </Link>
  );
}

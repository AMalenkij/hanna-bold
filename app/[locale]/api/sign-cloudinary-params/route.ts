import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  // Проверка авторизации и прав
  const { userId, orgRole } = await auth();

  if (!userId || orgRole !== "org:admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  );
  return Response.json({ signature });
}

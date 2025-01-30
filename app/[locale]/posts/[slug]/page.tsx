import getPostByLocale from "@/utils/getPostByLocale";
import splitTimestamp from "@/utils/splitTimestamp";
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
    locale: Locale;
  };
}
// post[`title_${locale}`
export default async function Detail({ params }: PageProps) {
  const { slug, locale } = await params;
  const { post } = await getPostByLocale({ slug, locale });

  if (!post) return notFound();
  // Деструктуризация базовых полей
  const { created_at, photo } = post;

  // Получение локализованных полей через прямое обращение
  const title = post[`title_${locale}`] as string;
  const content = post[`content_${locale}`] as string;

  // Разбор даты
  const { date, month, year, time } = splitTimestamp(created_at);

  return (
    <div>
      <h1 className="mt-10 font-semibold text-[150px] text-stone-50">
        {title}
      </h1>
      <img
        src={`https://hanna-s3.s3.amazonaws.com/static/${photo}`}
        alt={title}
        className="max-h-screen w-full object-cover"
      />
      <div className="mt-36 flex w-full flex-col items-center justify-center">
        <p className="mb-6 w-[600px] text-muted-foreground text-sm">{`/ ${date} ${month} ${year} ${time}`}</p>
        <div className="w-[600px] prose-headings:font-semibold prose-a:text-blue-500 hover:prose-a:underline">
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
}

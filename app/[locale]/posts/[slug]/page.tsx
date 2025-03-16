import getPostByLocale from "@/utils/getPostByLocale";
import splitTimestamp from "@/utils/splitTimestamp";
import type { Locale } from "@/types/common";
import { notFound } from "next/navigation";
import { ClientCldImage } from "@/components/clientCldImage";
import { ProseContent } from "@/components/proseContent";

interface PageProps {
  params: Promise<{
    slug: string;
    locale: Locale;
  }>;
}
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
    <div className="container">
      <h1 className="mt-20 mb-10 font-semibold text-6xl text-foreground md:text-12xl">
        {title}
      </h1>
      <ClientCldImage
        width={1920} // Базовый размер для десктопов
        height={960}
        src={`${photo}-post`}
        alt={title}
        sizes="100vw"
        className="max-h-screen w-full object-cover"
      />
      <div className="mt-36 flex w-full flex-col items-center justify-center">
        <p className="mb-6 w-full text-muted-foreground text-sm lg:w-[600px]">{`/ ${date} ${month} ${year} ${time}`}</p>
        <ProseContent description={content} className="w-full lg:w-[600px]" />
      </div>
    </div>
  );
}

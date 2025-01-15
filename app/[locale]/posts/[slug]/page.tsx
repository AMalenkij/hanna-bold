import { MDXRemote } from "next-mdx-remote/rsc";
import getPostByLocale from "@/utils/getPostByLocale";
import splitTimestamp from "@/utils/splitTimestamp";

interface PageProps {
  params: {
    slug: string;
  };
}
const staticContent = `
  # Markdown syntax guide

  ## Headers

  # This is a Heading h1
  ## This is a Heading h2
  ###### This is a Heading h6

  ## Emphasis

  *This text will be italic*
  _This will also be italic_

  **This text will be bold**
  __This will also be bold__

  _You **can** combine them_

  ## Lists

  ### Unordered

  * Item 1
  * Item 2
  * Item 2a
  * Item 2b
      * Item 3a
      * Item 3b

  ### Ordered

  1. Item 1
  2. Item 2
  3. Item 3
      1. Item 3a
      2. Item 3b

  ## Images

  ![This is an alt text.](/image/sample.webp "This is a sample image.")

  ## Links

  You may be using [Markdown Live Preview](https://markdownlivepreview.com/).
`;

export default async function Detail({ params }: PageProps) {
  const { slug } = await params;
  const locale = "en";
  const { post } = await getPostByLocale({ slug, locale });
  const { date, month, year, time } = splitTimestamp(post.created_at);

  // Serialize the MDX content
  // const source = await serialize(staticContent);

  return (
    <div>
      <h1 className="mt-10 font-semibold text-[150px] text-stone-50">
        {post.title_en}
      </h1>
      <img
        src={`https://hanna-s3.s3.amazonaws.com/static/${post.photo}`}
        alt={post.title_en}
        className="max-h-screen w-full object-cover"
      />
      <div className="mt-36 flex w-full flex-col items-center justify-center">
        <p className="mb-6 w-[600px] text-muted-foreground text-sm">{`/ ${date} ${month} ${year} ${time}`}</p>
        <div className="prose prose-stone w-[600px] prose-headings:font-semibold prose-a:text-blue-500 hover:prose-a:underline">
          <MDXRemote source={staticContent} />
        </div>
      </div>
    </div>
  );
}

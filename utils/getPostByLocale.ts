import { prisma } from "@/utils/prisma"

export default async function getPostByLocale({
	slug,
	locale,
}: {
	slug: string
	locale: "en" | "pl" | "uk"
}) {
	const post = await prisma.posts.findFirst({
		where: {
			slug: slug,
			[`title_${locale}`]: { not: undefined },
		},
		select: {
			id: true,
			slug: true,
			[`title_${locale}`]: true,
			[`intro_${locale}`]: true,
			[`content_${locale}`]: true,
			photo: true,
			created_at: true,
		},
	})

	return { post }
}

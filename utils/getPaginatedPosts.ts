import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function getPaginatedPosts(params: {
	page?: number
	locale: "en" | "uk" | "pl"
	published?: boolean
}) {
	const { page = 1, locale = "en", published = true } = params

	const pageSize = 4
	const skip = (page - 1) * pageSize

	// Получаем посты
	const posts = await prisma.posts.findMany({
		where: {
			is_published: published,
			// Используем корректное условие для проверки непустого поля
			[`title_${locale}`]: { not: undefined },
		},
		select: {
			id: true,
			[`title_${locale}`]: true,
			[`intro_${locale}`]: true,
			[`content_${locale}`]: true,
			slug: true,
			photo: true,
			created_at: true,
		},
		orderBy: { created_at: "desc" },
		take: pageSize,
		skip: skip,
	})

	// Получаем общее количество постов
	const totalPosts = await prisma.posts.count({
		where: {
			is_published: published,
			[`title_${locale}`]: { not: undefined },
		},
	})

	return {
		posts,
		pagination: {
			currentPage: page,
			pageSize,
			totalPosts,
			totalPages: Math.ceil(totalPosts / pageSize),
		},
	}
}

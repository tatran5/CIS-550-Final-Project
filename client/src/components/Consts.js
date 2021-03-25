const recipeCount = {
	title: 'Number of recipes',
	options: [10, 20, 30]
}

const sortBy = {
	title: 'Sort by',
	rating: 'Rating',
	cookingTime: 'Cooking time',
	ingredientsCount: 'Number of ingredients',
}
sortBy.options = Object.keys(sortBy).map((key) => key)

export  {
	recipeCount,
	sortBy
}
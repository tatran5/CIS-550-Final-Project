const recipeCount = {
	title: 'No. of recipes',
	options: [10, 20, 30]
}

const cookingTime = {
	title: 'Cooking time',
}

const sortBy = {
	title: 'Sort by',
	rating: 'Rating',
	cookingTime: 'Cooking time',
	ingredientsCount: 'Number of ingredients',
}
sortBy.options = Object.keys(sortBy).map((key) => sortBy[key])
sortBy.options = sortBy.options.filter(key => key !== sortBy.title)

const separateInputString = (str) =>
	str.split(',') // separate incredients by comma
	.map(item => item.trim()) // get rid of white space
	.filter(item => item !== '') // get rid of emptry string

const formatRecipeName = (name) =>
	name.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

export  {
	recipeCount,
	sortBy,
	cookingTime,
	separateInputString,
	formatRecipeName
}
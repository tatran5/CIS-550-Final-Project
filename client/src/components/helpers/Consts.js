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

const matchCategoryWithDb = (str) => {
	// for sort by
	if (str === sortBy.title) return 'name'
	if (str === sortBy.rating) return 'ratings'
	if (str === sortBy.cookingTime) return 'minutes'
	if (str === sortBy.ingredientsCount) return 'count'
}

const separateInputString = (str) =>
	str.split(',') // separate incredients by comma
	.map(item => item.trim()) // get rid of white space
	.filter(item => item !== '') // get rid of emptry string

const formatStr = (name) =>{
	return name.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
export  {
	recipeCount,
	sortBy,
	matchCategoryWithDb,
	cookingTime,
	separateInputString,
	formatStr
}
const recipeCount = {
	title: 'No. of recipes',
	options: [10, 20, 30]
}

const cookingTime = {
	title: 'Cooking time',
}

const sortByWithIngredients = {
	title: 'Sort by',
	rating: 'Ratings',
	cookingTime: 'Cooking time',
	ingredientsCount: 'No. of ingredients',
	includedIngredientsCount: 'No. of input ingredients'
}
sortByWithIngredients.options = Object.keys(sortByWithIngredients).map((key) => sortByWithIngredients[key])
sortByWithIngredients.options = sortByWithIngredients.options.filter(key => key !== sortByWithIngredients.title)

const sortBy = {
	title: 'Sort by',
	rating: 'Ratings',
	cookingTime: 'Cooking time',
	ingredientsCount: 'No. of ingredients',
}
sortBy.options = Object.keys(sortBy).map((key) => sortBy[key])
sortBy.options = sortBy.options.filter(key => key !== sortBy.title)

const restrictions = {
	title: 'Restriction',
	nut: 'Nut',
	meat: 'Meat',
}
restrictions.options = Object.keys(restrictions).map((key) => restrictions[key])
restrictions.options = restrictions.options.filter(key => key !== restrictions.title)

const matchCategoryWithDb = (str) => {
	// for sort by
	if (str === sortBy.title) return 'name'
	if (str === sortBy.rating) return 'ratings'
	if (str === sortBy.cookingTime) return 'minutes'
	if (str === sortBy.ingredientsCount) return 'ingredientsCount'
	if (str === sortByWithIngredients.includedIngredientsCount) return 'includedIngredientsCount'
	if (str === restrictions.nut) return 'nut'
	if (str === restrictions.meat) return 'meat'
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
	restrictions,
	sortBy,
	sortByWithIngredients,
	matchCategoryWithDb,
	cookingTime,
	separateInputString,
	formatStr
}
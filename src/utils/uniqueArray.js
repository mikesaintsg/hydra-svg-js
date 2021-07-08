import forEach from "./forEach";

export default function (array) {
	const uniqueArray = [];
	const sortedArray = array.sort()

	forEach(sortedArray, (item, index) => {
		if (item !== sortedArray[index - 1]) uniqueArray.push(item);
	})

	return uniqueArray;
}

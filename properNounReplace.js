// Path to word frequency download
// C:\Users\ZRomick\Desktop\ZacDocs\Misc\School Files\Vandy Undergrad\Vandy_Freshman_half2\CS2201\project10\project10\project1

const tallyWords = () => {
	//<button id="computeButton" onclick="compute()">Compute time</button>&nbsp;<input type="text" id="time" readonly
	//  size="20" />
	const userText = document.getElementById("userTextArea").value;
	const words = userText.split(/\s+/);
	let talliedWords = _.countBy(words, _.identity);
	console.log(talliedWords);
	// fs.readFile('/ospd.txt', function (err, data) {
	// 	if (err) throw err;
	// 	let lines = data.split('\n');
	// 	console.log(`"file.txt" contains ${lines.length} lines`)
	// 	console.log(`First line : ${lines[0]}`)
	// });
	// // commonWords = [
	// // 	"the", "of", "and", "to", "a", "in", "for", "is", "on", "that", "by",
	// // 	"this", "with", "i", "you", "it", "not", "or", "be", "are", "from", "at",
	// // 	"as", "your", "all", "have", "new", "more", "an", "was", "we", "will", "home",
	// // 	"can", "us", "about", "if", "page", "my", "has", "search", "free", "but", "our",
	// // 	"one", "other", "do", "no", "information", "time", "they", "site", "he", "up",
	// // 	"may", "what", "which", "their", "news", "out", "use", "any", "there", "see", "only",
	// // 	"so", "his", "when", "contact", "here", "business", "who", "web", "also", "now",
	// // 	"help", "get", "pm", "view", "online",
	// // ];
	let excludedWords = _.intersectionWith(Object.keys(talliedWords), ospd, _.isEqual);
	let includedWords = _.differenceWith(Object.keys(talliedWords), ospd, _.isEqual);
	console.log('presents', excludedWords);
	console.log('dif', includedWords);
}

const toggleHideSection = (id) => {
	let display = document.getElementById(id).style.display;
	(display === "" || display === "block")
		? document.getElementById(id).style.display = "none"
		: document.getElementById(id).style.display = "block";
}

const handleImport = () => {

}

const sortByFrequency = () => {

}

const sortAlphabetically = () => {

}

const exportWords = () => {

}

const replaceAllIncludedWords = () => {
	// Allow user to copy the new text to clipboard
	document.getElementById("copyNewText").disabled = false;
	$("#copyNewText").click(function () {
		navigator.clipboard.writeText(modMessage + ' ' + credits)
			.then(() => { alert(`Your new text has been copied to clipboard!`) })
			.catch((error) => { alert(`Failed to copy to clipboard! ${error}`) })
	});
}
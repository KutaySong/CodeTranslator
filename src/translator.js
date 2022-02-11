
let loadedText
let loadedDict

let dictionary
let terms= ["for","if","else","Object","background","catch","try","break","console","log","filter","find","flat","function","indexOf","let","x","y","i","j","ii","jj","change","depth","mouseWheel","mousePressed","mouseClick","text","textSize","stroke","ellipse","rect","floor","length","event","fill","line","mouseX","mouseY","noStroke","random","return","setup","size","search","async","Array","frameCount","white","red","blue","green","const","new","name","mousepressed","foreach","nostroke","nn","innerwidth","innerhtml","template","ticks","arrowleft","arrowup","arrowdown","notes","release","synths","map","logkey","mid","then","tone","note","sustain","colormode","false","code","tracks","hsb","synth","delta","xscale","mousewheel","createbutton","windowresized","time","duration","offset","autoscroll","document","innerheight","top","draw","toggle","digit","play","envelope","strokeweight","orange","createcanvas","home","numpad","textsize","file","attack","tomaster","textalign","shift","midi","queryselector","resizecanvas","midi","createelement","falseconst","appendchild","addeventlistener","createfileinput","removeattribute","arrowright","content","keydown","velocity","yoffset","deltaconst","reduce","keyp","dispose","push","center","while","preventdefault","now","disabled","detailconst","loading","polysynth","durationticks","triggerattackrelease","playing","track","body","purple","mousey","position","decay","fromurl"]


function preload () {
	loadedDict= loadJSON('src/dictionary.json',loadDictionary)
	loadedText= loadStrings("src/inputFile.js",prepareDictionary)
}
function setup() {    // AÇILIŞ EKRANI 	
	noLoop()
	console.log("Komutlar: ask() stop() saveDictionary() translate(), dictionary, foundWords, loadedText")
}
function prepareDictionary () {
	foundWords= new Set()
	loadedText.join(loadedText," ")
	.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '')
	.replace(/console\.log\(([^)]+)\)/g,'')
	.replace(/[^abcçdefgğhıijklmnoöpqrsştuüvwxyzABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ]/g," ")
	.split(/\s+/)
	.filter(a => a.length>2 && !terms.includes(a.toLowerCase()))
	.filter(a => ! Object.keys(dictionary).includes(a))
	.map(tx=>foundWords[tx]="")	
	
	console.log("example.js'de dictionary.json'da nonExistant",Object.keys(foundWords).length,"word: foundWords")
}
function loadDictionary() {
	dictionary= loadedDict.dictionary
	terms = [...new Set(terms.concat(loadedDict.terms))]
}
const copyDeep = (jack) => JSON.parse(JSON.stringify(jack))


function saveDictionary () {
	const arrayy= Object.values(dictionary)
	if (deduplicated() && nonCollision())
	saveJSON({dictionary:dictionary,terms:terms}, 'dictionary.json')
	
	function deduplicated () { // value'ları controll eder	
		for (let i=0; i<arrayy.length; i++) {
			for (let j=i+1; j<arrayy.length; j++) {
				if (arrayy[i].length && arrayy[j].length && arrayy[j]===arrayy[i]) {
					let newName= ""+arrayy[j]+"1"
					for(let i=2;arrayy.indexOf(newName)!=-1;i++){
						newName= ""+arrayy[j]+i
					}
					arrayy[j]= newName
				}
			}
		}
		return true
	}
	function nonCollision () {
		const allIncluding = [...new Set(
			loadedText.join(loadedText, " ")
			.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '')
			.replace(/[^abcçdefgğhıijklmnoöpqrsştuüvwxyzABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ]/g," ")
			.split(/\s+/))
		]
		allIncluding
		.map(inText => {
			if (arrayy.includes(inText)) {
				console.log(inText,"wordd inOriginal de geçiyor, çakışmasın")
			}
		})
		return true
	}
}


let loop
let cv= ""
let sr= ""
function ask() {
	loop= setInterval(()=> controll() ,500)
	function controll () {
		if (!sr.length && Object.keys(foundWords).length) {
			sr= random(Object.keys(foundWords))
			console.log(sr," = ?")
		}
		if (cv.length) {
			if (cv=="1") terms.push(sr.toLowerCase())
			else if (cv!="0") {
				if (terms.includes(cv.toLowerCase())) {
					console.log("Özel words kullanılamaz: ",cv)
					cv= ""
					return false
				} else
				dictionary[sr]=cv
			}
			delete foundWords[sr]
			if(Object.keys(foundWords).length) {
				sr= random(Object.keys(foundWords))
				console.log(sr," = ?")
			} else {
				clearInterval(loop)
				console.log("all words translated: saveDictionary() codeTranslate()")
				return true
			}
			cv=""
		}
	}
	console.log(sr," cv=\"1\":addToIgnoreList | cv=\"0\":pass | cv=\"word\":türkçeÇevrimeEkle")
	return true
}
function stop () {clearInterval(loop)}


function codeTranslate () {
	const blankPage= createWriter('translated.js')
	
	loadedText= loadedText.join("\n")
	.replaceAll(/([\w\u00C7-\u0160]+)/gm, ((m)=>dictionary[m]||m))

	blankPage.print(loadedText)
	blankPage.close()
	blankPage.clear()
}

function lineTranslate (line1) {
	console.log(line1.replaceAll(/([\w\u00C7-\u0160]+)/gm, ((m)=>dictionary[m]||m)))
}



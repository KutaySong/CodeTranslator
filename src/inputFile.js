
let loadedText
let loadedDict

let sözlük
let terimler= ["for","if","else","Object","background","catch","try","break","console","log","filter","find","flat","function","indexOf","let","x","y","i","j","ii","jj","change","depth","mouseWheel","mousePressed","mouseClick","text","textSize","stroke","ellipse","rect","floor","length","event","fill","line","mouseX","mouseY","noStroke","random","return","setup","size","search","async","Array","frameCount","white","red","blue","green","const","new","name","mousepressed","foreach","nostroke","nn","innerwidth","innerhtml","template","ticks","arrowleft","arrowup","arrowdown","notes","release","synths","map","logkey","mid","then","tone","note","sustain","colormode","false","code","tracks","hsb","synth","delta","xscale","mousewheel","createbutton","windowresized","time","duration","offset","autoscroll","document","innerheight","top","draw","toggle","digit","play","envelope","strokeweight","orange","createcanvas","home","numpad","textsize","file","attack","tomaster","textalign","shift","midi","queryselector","resizecanvas","midi","createelement","falseconst","appendchild","addeventlistener","createfileinput","removeattribute","arrowright","content","keydown","velocity","yoffset","deltaconst","reduce","keyp","dispose","push","center","while","preventdefault","now","disabled","detailconst","loading","polysynth","durationticks","triggerattackrelease","playing","track","body","purple","mousey","position","decay","fromurl"]


function preload () {
	loadedDict= loadJSON('sözlük.json',sözlükYükle)
	loadedText= loadStrings("örnek.js", sözlükÇıkar)
}
function setup() {    // AÇILIŞ EKRANI 	
	noLoop()
	console.log("Komutlar: sor() dur() sözlüğüKaydet() çevir(), sözlük, bulunanlar, loadedText")
}
function sözlükÇıkar () {
	bulunanlar= new Set()
	loadedText.join(loadedText," ")
	.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '')
	.replace(/console\.log\(([^)]+)\)/g,'')
	.replace(/[^abcçdefgğhıijklmnoöpqrsştuüvwxyzABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ]/g," ")
	.split(/\s+/)
	.filter(a => a.length>2 && !terimler.includes(a.toLowerCase()))
	.filter(a => ! Object.keys(sözlük).includes(a))
	.map(tx=>bulunanlar[tx]="")	
	
	console.log("örnek.js'de sözlük.json'da olmayan",Object.keys(bulunanlar).length,"kelime: bulunanlar")
}
function sözlükYükle() {
	sözlük= loadedDict.sözlük
	terimler = [...new Set(terimler.concat(loadedDict.terimler))]
}
const kopi = (anam) => JSON.parse(JSON.stringify(anam))


function sözlüğüKaydet () {
	const katar= Object.values(sözlük)
	if (çiftlemesizmi() && textleÇakışmasız())
	saveJSON({sözlük:sözlük,terimler:terimler}, 'sözlük.json')
	
	function çiftlemesizmi () { // value'ları kontrol eder	
		for (let i=0; i<katar.length; i++) {
			for (let j=i+1; j<katar.length; j++) {
				if (katar[i].length && katar[j].length && katar[j]===katar[i]) {
					let newName= ""+katar[j]+"1"
					for(let i=2;katar.indexOf(newName)!=-1;i++){
						newName= ""+katar[j]+i
					}
					katar[j]= newName
				}
			}
		}
		return true
	}
	function textleÇakışmasız () {
		const geçenTüm = [...new Set(
			loadedText.join(loadedText, " ")
			.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '')
			.replace(/[^abcçdefgğhıijklmnoöpqrsştuüvwxyzABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ]/g," ")
			.split(/\s+/))
		]
		geçenTüm
		.map(textdeki => {
			if (katar.includes(textdeki)) {
				console.log(textdeki,"kelimesi orjinalde de geçiyor, çakışmasın")
			}
		})
		return true
	}
}


let döngü
let cv= ""
let sr= ""
function sor() {
	döngü= setInterval(()=> kontrol() ,500)
	function kontrol () {
		if (!sr.length && Object.keys(bulunanlar).length) {
			sr= random(Object.keys(bulunanlar))
			console.log(sr," = ?")
		}
		if (cv.length) {
			if (cv=="1") terimler.push(sr.toLowerCase())
			else if (cv!="0") {
				if (terimler.includes(cv.toLowerCase())) {
					console.log("Özel kelimeler kullanılamaz: ",cv)
					cv= ""
					return false
				} else
				sözlük[sr]=cv
			}
			delete bulunanlar[sr]
			if(Object.keys(bulunanlar).length) {
				sr= random(Object.keys(bulunanlar))
				console.log(sr," = ?")
			} else {
				clearInterval(döngü)
				console.log("Tüm kelimeler çevrildi: sözlüğüKaydet() çevir()")
				return true
			}
			cv=""
		}
	}
	console.log(sr," cv=\"1\":ingilizceTerimlereEkle | cv=\"0\":geç | cv=\"kelime\":türkçeÇevrimeEkle")
	return true
}
function dur () {clearInterval(döngü)}


function çevir () {
	const yaz= createWriter('çevrilmişi.js')
	
	loadedText= loadedText.join("\n")
	.replaceAll(/([\w\u00C7-\u0160]+)/gm, ((m)=>sözlük[m]||m))

	yaz.print(loadedText)
	yaz.close()
	yaz.clear()
}

function satırÇevir (satır) {
	console.log(satır.replaceAll(/([\w\u00C7-\u0160]+)/gm, ((m)=>sözlük[m]||m)))
}


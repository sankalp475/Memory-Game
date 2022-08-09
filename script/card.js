
//! game card rendering
const card = document.querySelectorAll('.flip-card')
const allImage = document.querySelectorAll('.display')

//! aufio rendering for this game
const cardFlipSound = new Audio('./assets/audio/Assets_Audio_flip.wav');
const Victory_Sound = new Audio('./assets/audio/Assets_Audio_victory.wav');
const gameOver_sound = new Audio('./assets/audio/mixkit-wrong-answer-fail-notification-946.wav');

//! massage box initilising
const insetDialogBox = ({ massage, btnText }) => `<div class="start-container">
	<h1>${massage}</h1>
	${state.gameStatus === 'victory' || state.gameOver === true  ? //! checking condition for displaying score
		`<div class="top">
			<div class="score-bard">
				<p class="totle" style="padding:10px 0px">Flips: <span class="">${state.score}</span></p>
				<p class="totle" style="padding:10px 0px">score: <span class="">${state.totleFlip}</span></p>
			</div>
		</div>`: ''
	}
	<button class="btn" onclick="startGame()">${btnText}</button>
</div>`

//! all image src and thare name
const cardImageArray = [
	{ src: 'https://img.icons8.com/nolan/100/py.png', name: 'python' },
	{ src: 'https://img.icons8.com/nolan/100/py.png', name: 'python' },
	{ src: 'https://img.icons8.com/nolan/64/adobe-illustrator.png', name: 'adobe-illustrator' },
	{ src: 'https://img.icons8.com/nolan/64/adobe-illustrator.png', name: 'adobe-illustrator' },
	{ src: 'https://img.icons8.com/nolan/64/adobe-photoshop.png', name: 'adobe-photoshop' },
	{ src: 'https://img.icons8.com/nolan/64/adobe-photoshop.png', name: 'adobe-photoshop' },
	{ src: 'https://img.icons8.com/nolan/64/js.png', name: 'Javascript' },
	{ src: 'https://img.icons8.com/nolan/64/js.png', name: 'Javascript' },
	{ src: 'https://img.icons8.com/nolan/64/pycharm.png', name: 'pycharm' },
	{ src: 'https://img.icons8.com/nolan/64/pycharm.png', name: 'pycharm' },
	{ src: 'https://img.icons8.com/nolan/64/sublime-text-new-logo.png', name: 'sublime' },
	{ src: 'https://img.icons8.com/nolan/64/sublime-text-new-logo.png', name: 'sublime' },
	{ src: 'https://img.icons8.com/color/100/000000/react-native.png', name: 'react' },
	{ src: 'https://img.icons8.com/color/100/000000/react-native.png', name: 'react' },
	{ src: 'https://img.icons8.com/nolan/64/discord-logo.png', name: 'discord' },
	{ src: 'https://img.icons8.com/nolan/64/discord-logo.png', name: 'discord' }
]

//! game state wich change during the game
const state = {
	time: 100,
	isAllmatched: false,
	massage: '',
	btnText: '',
	current_card: '',
	isMatchStarted: false,
	gameOver: false,
	totleFlip: 0,
	allCard: '',
	gameStatus: '',
	isReset: false,
	isVictory: false,
	score: 0,
	winCount: 0,
}

function _init_() {
	state.isMatchStarted = true
	if (state.isMatchStarted) {
		_gamestart_massge_box()
	}
	if (state.isVictory === true) {
		isVictory()
	}
	if (state.gameOver === true) {
		gameOver()
	}
}
function _gamestart_massge_box() {
	state.massage = 'start new game of mix-or-match'
	state.gameStatus = 'start'
	state.btnText = 'start'
	insertLocalStorage()
	let x = ranDomiser()
	renderCard(x)
}

//! starting the game by removing the dialog box
function startGame() {
	document.body.classList.remove('dialog-box')
	document.querySelector('.container').classList.remove('unclickable')
	document.querySelector('.dialog-container').innerHTML = ''
	updateTimer()
	state.allCard = card
	resetGame()
	cardFlipSound.play()
}


//!/ reseting the game
function resetGame() {
	state.allCard.forEach((cards) => {
		cards.classList.remove('active-match')
		cards.classList.remove('matched')
	})
	state.time = 100
	state.isAllmatched = false
	state.massage = ''
	state.btnText = ''
	state.current_card = ''
	state.isMatchStarted = false
	state.gameOver = false
	state.totleFlip = 0
	state.allCard = ''
	state.gameStatus = ''
	state.isReset = false
	state.isVictory = false
	state.score = 0
	state.winCount = 0
}
//! gameOver function
function gameOver() {
	state.massage = 'oh! no you mixed'
	state.gameStatus = 'gamover'
	state.btnText = 're-start'
	insertLocalStorage()
	let x = ranDomiser()
	renderCard(x)
	gameOver_sound.play()
}

//! function for victory
function isVictory() {
	state.massage = 'congrats 🎉 you matched all the card'
	state.btnText = 're-start'
	state.gameStatus = 'victory'
	insertLocalStorage()
	let x = ranDomiser()
	renderCard(x)
	Victory_Sound.play()
}
//! adding data to local storage
function insertLocalStorage() {
	let BoxContainer = document.querySelector('.dialog-container')
	localStorage.setItem('-html-text-', JSON.stringify(
		insetDialogBox({ massage: state.massage, btnText: state.btnText })
	))
	document.body.classList.add('dialog-box')
	document.querySelector('.container').classList.add('unclickable')
	BoxContainer.innerHTML = JSON.parse(localStorage.getItem('-html-text-'))
}


//!! rendomising image data using array.sort(() => Math.random() - 0.5) method
function ranDomiser() {
	let cardData = cardImageArray
	cardData.sort(() => Math.random() - 0.5)
	return cardData;
}



//! insetring image
let imagesrc = []
function InsertImage(imageData) {
	imageData.forEach((imgArray, i) => {
		imagesrc.push(imgArray)
	})
	allImage.forEach((image, i) => {
		image.src = imagesrc[i].src
		card[i].setAttribute('name', imagesrc[i].name)
	})
}

let totleFlips = 0;
//! rendring card
function renderCard(cardData) {
	//! insetring image
	card.forEach((cards, index) => {
		cards.addEventListener('click', (e) => {
			if (e.target === document.querySelector('.game_container')) return
			card[index].classList.add('active-match')
			let cardType = card[index].getAttribute('name')
			const flipedcard = document.querySelectorAll('.active-match')
			cardFlipSound.play()
			checkforCard(flipedcard, cardType)
			let score = document.querySelector('.score-text')
			score.innerHTML = parseInt(totleFlips++);
		})
	})
	InsertImage(cardData)
}
let numberofFlips = 0;
function checkforCard(cardFliped, cardType) {
	//! logic of  flipping the card
	if (cardFliped.length == 2) {
		if (cardFliped[0].getAttribute('name') === cardFliped[1].getAttribute('name')) {
			state.winCount += 1;
			console.log(state.winCount, card.length / 2 )
			if (state.winCount === Math.floor(card.length / 2)) {
				state.isVictory = true;
				state.isAllmatched = true;
				state.score = state.winCount;
				state.totleFlip = totleFlips;
				isVictory()
			}
			cardFliped.forEach((card) => {
				card.classList.add('matched')
				setTimeout(() => card.classList.remove('active-match'), 1000)
			})
		} else {
			cardFliped.forEach((card) => {
				setTimeout(() => card.classList.remove('active-match'), 1000)
			})
		}
	}

	if (cardFliped.length > 2) {
		cardFliped.forEach((card) => {
			card.classList.remove('active-match')
		})
	}
}

//! update state timer
function updateTimer() {
	let baseTime = 100;
	//! const cardFliped = document.querySelectorAll('.active-match')
	let downTime = setInterval(() => {
		if (baseTime > 0) {
			baseTime--;
			state.time = baseTime;
			document.querySelector('.t').innerHTML = state.time;
			// console.log(state)
			if (baseTime === 0) {
				if (state.winCount != Math.floor(card.length / 2)) {
					state.gameOver = true;
					gameOver()
				}
			}
		}
	}, 1000)
}
_init_()
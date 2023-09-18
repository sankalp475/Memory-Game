// this is comment
console.log("this is console code ... fuck ")
import icon from "./icon.js";
const audio = {
	cardFlipSound: new Audio("./assets/audio/Assets_Audio_flip.wav"),
	Victory_Sound: new Audio("./assets/audio/Assets_Audio_victory.wav"),
	gameOver_sound: new Audio(
		"./assets/audio/mixkit-wrong-answer-fail-notification-946.wav"
	),
};
const scoreCount = document.querySelector("span[data-flip-time]");
const flipCounter = document.querySelector("span[data-flip-move]");
const displayScreen = document.querySelector(".game-popup-bord");
const refreshbtn = document.querySelector(".refresh-btn");
displayScreen.dataset.key = localStorage.getItem("key");
const card = document.querySelectorAll(".card");
window.onload = () => {
	displayScreen.dataset.key = localStorage.getItem("key");
};
const {
	_icon_1,
	_icon_2,
	_icon_3,
	_icon_4,
	_icon_5,
	_icon_6,
	_icon_7,
	_icon_8,
} = icon;
const cardIconArray = [
	{ src: _icon_1._SvgCode(), name: _icon_1.type },
	{ src: _icon_1._SvgCode(), name: _icon_1.type },
	{ src: _icon_2._SvgCode(), name: _icon_2.type },
	{ src: _icon_2._SvgCode(), name: _icon_2.type },
	{ src: _icon_3._SvgCode(), name: _icon_3.type },
	{ src: _icon_3._SvgCode(), name: _icon_3.type },
	{ src: _icon_4._SvgCode(), name: _icon_4.type },
	{ src: _icon_4._SvgCode(), name: _icon_4.type },
	{ src: _icon_5._SvgCode(), name: _icon_5.type },
	{ src: _icon_5._SvgCode(), name: _icon_5.type },
	{ src: _icon_6._SvgCode(), name: _icon_6.type },
	{ src: _icon_6._SvgCode(), name: _icon_6.type },
	{ src: _icon_7._SvgCode(), name: _icon_7.type },
	{ src: _icon_7._SvgCode(), name: _icon_7.type },
	{ src: _icon_8._SvgCode(), name: _icon_8.type },
	{ src: _icon_8._SvgCode(), name: _icon_8.type },
];

const state = {
	remaningTime: 100,
	isTimerStart: false,
	isTimeEnded: false,
	isGameStarted: false,
	winCount: 0,
	flipCount: 0,
	_TOTLE_MOVE: 16 / 2,
	refresh: false,
	popup_toggle: () => {
		//* for game start popup
		if (state.remaningTime == 100 && state.isTimerStart == false) {
			localStorage.setItem("key", "GS");
			displayScreen.dataset.key = localStorage.getItem("key");
		}
		//* for game over popup
		if (
			state.remaningTime <= 0 &&
			state.isTimeEnded == true &&
			state.winCount < state._TOTLE_MOVE
		) {
			localStorage.setItem("key", "GE");
			displayScreen.dataset.key = localStorage.getItem("key");
			audio.gameOver_sound.play();
		}
		//* for game Win popup
		if (
			state.remaningTime >= 0 &&
			state.remaningTime !== 100 &&
			state.isTimeEnded == false &&
			state.winCount == state._TOTLE_MOVE
		) {
			localStorage.setItem("key", "GW");
			displayScreen.dataset.key = localStorage.getItem("key");
			audio.Victory_Sound.play();
		}
		//* on game after started function
		if (
			state.remaningTime < 100 &&
			state.isGameStarted == true &&
			state.isTimeEnded == false &&
			state.isTimerStart == true
		) {
			localStorage.setItem("key", "null");
			displayScreen.dataset.key = localStorage.getItem("key");
		}
	},
	_reset: (elmement, { isRandomise } ) => {
		setTimeout(() => {
			state.flipCount = 0;
			state.remaningTime = 100;
			state.winCount = 0;
			state.isTimerStart = false;
			state.isTimeEnded = false,
			state.isGameStarted = false,
			elmement.innerHTML = state.flipCount;
			let cards = document.querySelectorAll(".card");
			let randomCard = ranDomiser();
			if (isRandomise) {

				cards.forEach((card, index) => {
					setTimeout(() => {
						card.querySelectorAll(".front")[0].innerHTML = randomCard[index].src;
						card.dataset.name = randomCard[index].name;
					}, 1000);
					card.dataset.matchedcard = false;
				});
			}
		}, 500);
	},
};

window.startgame = () => {
	let displayScreen = document.querySelector(".game-popup-bord");
	if (displayScreen.dataset.key == "GS" || displayScreen.dataset.key == "Gs") {
		displayScreen.dataset.key = "null";
		state._reset(flipCounter, { isRandomise: true });
	}
	if (displayScreen.dataset.key == "GE" || displayScreen.dataset.key == "Ge") {
		displayScreen.dataset.key = "null";
		state._reset(flipCounter, { isRandomise: true });
	}
	if (displayScreen.dataset.key == "GW" || displayScreen.dataset.key == "Gw") {
		displayScreen.dataset.key = "null";
		card.forEach((card, index) => {
			let frontFace = card.querySelector(".front");
			let backFace = card.querySelector(".back");
			let temp = frontFace.innerHTML;
			frontFace.innerHTML = backFace.innerHTML;
			backFace.innerHTML = temp;
			let randomCard = ranDomiser();
			setTimeout(() => {
				card.querySelectorAll(".front")[0].innerHTML = randomCard[index].src;
				card.dataset.name = randomCard[index].name;
			}, 1000)
			// frontFace.innerHTML = randomCard[index].src
			// card.dataset.name = randomCard[index].name;
			// backFace.classList.remove("back");
			// backFace.classList.add("front");
			// frontFace.classList.remove("front");
			// frontFace.classList.add("back");
			card.classList.remove("matched");
			setTimeout(() => {
				card.classList.remove("active-match");
			}, 600);
		});
	}
	updateTimer();
	audio.cardFlipSound.play();
};
function updateTimer() {
	let displayScreen = document.querySelector(".game-popup-bord");
	const i = setInterval(() => {
		state.remaningTime--;
		scoreCount.innerHTML = state.remaningTime;
		if (state.remaningTime < 100 || state.remaningTime >= 1) {
			state.isGameStarted = true;
			state.isTimeEnded = false;
			state.isTimerStart = true;
		}
		if (state.remaningTime <= 0) {
			clearInterval(i);
			state.isTimerStart = false;
			state.isTimeEnded = true;
			state.isGameStarted = false;
			state.popup_toggle();
			document.querySelector(".game-end .score-data").innerHTML =
				state.flipCount;
			document.querySelector(".game-end .Flips-data").innerHTML =
				state.winCount * 2;
			displayScreen.dataset.key = "GE";
			audio.gameOver_sound.play();
		}
		// state.popup_toggle()
		if (
			displayScreen.dataset.key == "GW" ||
			displayScreen.dataset.key == "Gw"
		) {
			clearInterval(i);
			state._reset(flipCounter, { isRandomise: false });
		}
	}, 1000);
}
console.log(
	`%cMix-or-Match game %c`,
	"font-size:14px; color: #ff3860;background:black;padding:8px;padding-right:0px",
	"font-size:14px;color:orange;font-weight:bold;background:black;padding:8px;padding-left:0px"
);
// console.log(`%cMix-or-Match game %c`,"font-size:14px; color: #ff3860;background:black;padding:8px;padding-right:0px", "font-size:14px;color:orange;font-weight:bold;background:black;padding:8px;padding-left:0px")

function ranDomiser() {
	let cardData = cardIconArray;
	cardData.sort(() => Math.random() - 0.5);
	return cardData;
}
function _HandleCardEvent(card, index, randomCard) {
	card.querySelectorAll(".front")[0].innerHTML = randomCard[index].src;
	card.dataset.name = randomCard[index].name;
	card.addEventListener("click", (event) => {
		if (!card.classList.contains("matched")) {
			card.classList.add("active-match");
			card.setAttribute("data-cardfliped", true);
			audio.cardFlipSound.play();
			flipCounter.innerHTML = state.flipCount++;
		}
		const flipedcard = document.querySelectorAll(".active-match");
		if (flipedcard.length > 2) {
			flipedcard[2].classList.remove("active-match");
		}
		checkForMatch(index, flipedcard);
	});
}

function checkForMatch(index, flipedcard) {
	// console.log(card[index])
	if (flipedcard.length == 2) {
		if (flipedcard[0].dataset.name == flipedcard[1].dataset.name) {
			flipedcard[0].dataset.matchedcard = true;
			flipedcard[1].dataset.matchedcard = true;
			// console.log(" %cmatched%c ","font-size:14px; color: #4fdee5;background:black;padding:8px;padding-right:0px", "font-size:14px;color:orange;font-weight:bold;background:black;padding:8px;padding-left:0px")
			_score_check();
			flipedcard.forEach((card) => {
				let frontFace = card.querySelector(".front");
				let backFace = card.querySelector(".back");
				let temp = backFace.innerHTML;
				backFace.innerHTML = frontFace.innerHTML;
				frontFace.innerHTML = temp;
				card.classList.add("matched");
				setTimeout(() => {
					card.classList.remove("active-match");
				}, 600);
			});
		} else {
			flipedcard[0].dataset.matchedcard = false;
			flipedcard[1].dataset.matchedcard = false;
			// document.querySelector('.')
			// console.log(" %cun-matched%c ","font-size:14px; color: #ff3860;background:black;padding:8px;padding-right:0px", "font-size:14px;color:orange;font-weight:bold;background:black;padding:8px;padding-left:0px")
			flipedcard.forEach((card) => {
				setTimeout(() => {
					card.classList.remove("active-match");
				}, 600);
			});
		}
	}
}

function _score_check() {
	state.winCount += 1;
	if (state.winCount == state._TOTLE_MOVE) {
		state.popup_toggle();
		localStorage.setItem("key", "GW");
		displayScreen.dataset.key = localStorage.getItem("key");
		document.querySelector(".game-win .score-data").innerHTML = state.flipCount;
		document.querySelector(".game-win .Flips-data").innerHTML =
			state._TOTLE_MOVE * 2;
	}
}
refreshbtn.addEventListener("click", (event) => {
	let _matchedcard = document.querySelectorAll('div[data-matchedcard="true"]');
	state.refresh = true;
	if (_matchedcard.length > 0) {
		_matchedcard.forEach((card, index) => {
			let frontcard = card.querySelector(".front");
			let backcard = card.querySelector(".back");
			frontcard.classList.add("back");
			frontcard.classList.remove("front");
			backcard.classList.add("front");
			backcard.classList.remove("back");
			card.classList.remove("matched");
			setTimeout(() => {
				card.dataset.matchedcard = false;
			}, 800);
			state._reset(flipCounter, { isRandomise: true });
		});
	} else {
		_matchedcard.forEach((card, index) => {
			card.dataset.matchedcard = false;
		});
	}
});
const start = (() => {
	state.popup_toggle();
	let randomCard = ranDomiser();
	card.forEach((card, index) => {
		_HandleCardEvent(card, index, randomCard);
	});
})();

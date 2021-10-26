const menuIcon = document.querySelector('#menuIcon');
const popUpMenu = document.querySelector('.popUpMenu');
const loadingBar = document.querySelector('#loadingBar');
const imgContainer = document.querySelector('.imgContainer');
const imgUrlArray = [
	'https://images.unsplash.com/photo-1619903774373-7dea6886db8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
	'https://images.unsplash.com/photo-1633628766566-0dce9a6b1a68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1644&q=80',
	'https://images.unsplash.com/photo-1633137197599-111514c9af09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80',
];
const popOnScrollArray = document.querySelectorAll('.popOnScroll');

let currentPhoto = 1;

// OPENING AND CLOSING OF MENU

menuIcon.addEventListener('click', () => {
	if (popUpMenu.classList.contains('closed')) {
		popUpMenu.style.display = 'flex';
		setTimeout(() => {
			popUpMenu.classList.remove('closed');
			popUpMenu.classList.add('open');
			popUpMenu.style.height = '90vh';
			popUpMenu.style.width = `${window.innerWidth}px`;
		}, 10);
	} else {
		popUpMenu.classList.remove('open');
		popUpMenu.classList.add('closed');

		setTimeout(() => {
			popUpMenu.style.display = 'none';
		}, 300);
	}
});

// IMAGE SLIDER

const timeInterval = 5000;
const barTimeInterval = timeInterval / 100;
let porcentaje = 0;

setInterval(() => {
	imgContainer.style.background = `url(${imgUrlArray[currentPhoto]})`;
	imgContainer.style.backgroundPosition = 'center';
	imgContainer.style.backgroundSize = 'cover';
	currentPhoto++;
	porcentaje = 0;
	if (currentPhoto === imgUrlArray.length) {
		currentPhoto = 0;
	}
}, timeInterval);

setInterval(() => {
	loadingBar.style.width = `${porcentaje}%`;
	porcentaje++;
}, barTimeInterval);

// POP ON SCROLLING ANIMATION

const cardsArray = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
	heightCheck(popOnScrollArray, 'opacityAnimation', 0);
});

function heightCheck(array, animClassName, isDelayOn) {
	let triggerWhen = (window.innerHeight / 5) * 3.5;
	let delay = 0;
	for (let section of array) {
		section.style.opacity = '0';
		let sectionTop = section.getBoundingClientRect().top;
		if (sectionTop < triggerWhen) {
			section.classList.add(animClassName);
		}
	}
}

// GET AVATAR FROM API

const userPhotos = document.querySelectorAll('.userPhoto');
const userNames = document.querySelectorAll('.userName');

const getReviewData = async () => {
	[0, 1].forEach(laCosaEntera);

	const laCosaEntera = async (index) => {
		try {
			const user = await axios.get('https://randomuser.me/api/?format=json');
			const { name, picture } = user.data.results[0];
			userNames[index].innerHTML = `${name.title}. ${name.first} ${name.last}`;
			userPhotos[index].src = picture.large;
		} catch {
			userNames[index].innerHTML = 'Could not fetch random name from API';
		}
	};
};

getReviewData();

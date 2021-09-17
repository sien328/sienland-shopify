import Splide from '@splidejs/splide';

new Splide( '.splide', {
	type   : 'loop',
	perPage: 3,
	perMove: 1,
    breakpoints: {
		'1025': {
			perPage: 2,
		},
		'687': {
			perPage: 1,
		},
	}
}).mount();
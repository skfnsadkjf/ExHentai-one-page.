// ================================-- settings --================================= //
const PRELOAD_PAGES = 2;
// ==================================-- code --=================================== //
const CONTAINER = document.getElementById( 'i3' );
const httpRequest = ( url ) => {
	return new Promise( ( resolve , reject ) => {
		const xhr = new XMLHttpRequest();
		xhr.open( "GET", url , false );
		xhr.onload = e => resolve( e.target.responseText );
		xhr.send();
	} );
}
const getNext = () => {
	const i = CONTAINER.children.length - PRELOAD_PAGES;
	if ( i < 0 || CONTAINER.children[i].offsetTop < window.scrollY ) {
		httpRequest( nextURL ).then( responseText => {
			const parser = new DOMParser();
			const doc = parser.parseFromString( responseText, 'text/html' );
			const img = doc.getElementById( 'img' );
			img.style.paddingTop = '1em';
			CONTAINER.append( img );
			nextURL = doc.getElementById( 'next' ).href;
		} );
	}
}
let nextURL = document.getElementById( 'next' ).href;
CONTAINER.firstElementChild.replaceWith( CONTAINER.querySelector( "img" ) ); // removes <A> tag on main image.
setInterval( getNext , 500 );



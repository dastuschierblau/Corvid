/* Helper functions */

export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function findMatch(wordToFind, array){
  /* Will return a new array filtered by matching of input
    string
  */
  return array.filter(item => {
    let regex = new RegExp(wordToFind, 'gi');
    let foundMatch = false,
	    i;
    const len = item.keywords.length;
	
	for( i = 0; i < len; i++ ) {
		if( item.keywords[i].match( regex ) ) {
			foundMatch = true;
		}
	}
	
	return foundMatch;
  });
  
}

export function prepareTags( str ) {
	const regex = /,\s*/;
	
	return str.split( regex );
}

export function formatDate( date ) {
	let month, day, year;
	let dateStr;
	
	month = date.getMonth() + 1;
	day = date.getDate();
	year = date.getFullYear();
	
	return dateStr = `${ month }/${ day }/${ year }`;
}
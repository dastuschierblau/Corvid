/* Mock data for Corvid application */


const posts = [
  {
    id: '_snrkc1z7i',
	title: 'HTML5 declarative elements',
	keywords: [
	  'html5', 'elements', 'html', 'javascript'
	],
	author: 'Emmett Slack',
	timestamp: 1521319841696,
	current: false,
	content: `Some cool HTML5 elements include <audio>, <video>,
	  and <progress>.`
  },
  {
    id: '_5w1e3bwgr',
	title: 'Redux Middleware and Thunks',
	keywords: [
	  'react', 'redux', 'middleware', 'thunks',
	  'functions', 'javascript'
	],
	author: 'Emmett Slack',
	timestamp: 1521319871672,
	current: false,
	content: `We can return functions from action creators instead
	  of objects, but in order to enable this behavior, we need a 
	  specific type of middleware called a thunk.`
  },
  {
    id: '_96mcm5wj6',
	title: 'React Router v4 Differences',
	keywords: [
	  'react', 'react router', 'routing',
	  'match', 'props', 'location', 'declarative',
	  'javascript'
	],
	author: 'Emmett Slack',
	timestamp: 1521319892788,
	current: false,
	content: `React Router v4 represents a shift toward a more declarative
	  ideology- Routes are now just like any other component and can be used
	  anywhere in your application. You can even have Routes within other Routes,
	  recursive Routes, etc.`
  }
];

export function _getPosts() {
	return new Promise(( res, rej ) => {
		setTimeout(() => res( posts ), 2000 );
	});
}


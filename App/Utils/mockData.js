/* Mock data for Corvid application */

const posts = [
  {
    id: "_snrkc1z7i",
    title: "HTML5 declarative elements",
    keywords: ["html5", "elements", "html", "javascript"],
    author: "Emmett Slack",
    timestamp: new Date(2018, 2, 13, 14, 14),
    content: `Some cool HTML5 elements include <audio>, <video>, and <progress>.`
  },
  {
    id: "_5w1e3bwgr",
    title: "Redux Middleware and Thunks",
    keywords: [
      "react",
      "redux",
      "middleware",
      "thunks",
      "functions",
      "javascript"
    ],
    author: "Emmett Slack",
    timestamp: new Date(2018, 2, 15, 12, 10),
    content: `We can return functions from action creators instead of objects, but in order to enable this behavior, we need a specific type of middleware called a thunk. The thunk middleware simply checks to see whether the action it receives is a function. If it is, it invokes that function.
    A thunk-enabled action creator returns an anonymous function that accepts store.dispatch as an argument, allowing it to invoke store.dispatch within the function body. In this way, the action creator can in turn dispatch additional actions as needed. An example would be an action creator responsible for loading some content via an asynchronous request. This action creator might initially dispatch a displayLoading action to show a loading indicator on the screen, followed by the actual async request. Then, once the request is fulfilled (or rejected in the case of an error), it would dispatch a removeLoading action to hide the loading indicator.
	The initial loading of this application utilizes this very scenario to load the posts in the sidebar.`
  },
  {
    id: "_96mcm5wj6",
    title: "React Router v4 Differences",
    keywords: [
      "react",
      "react router",
      "routing",
      "match",
      "props",
      "location",
      "declarative",
      "javascript"
    ],
    author: "Emmett Slack",
    timestamp: new Date(2018, 2, 15, 18, 6),
    content: `React Router v4 represents a shift toward a more declarative ideology- Routes are now just like any other component and can be used anywhere in your application. You can even have Routes within other Routes, recursive Routes, etc.
	  Prior to v4, React Router required you to have a central route configuration in the form of an array or object. While you can still utilize this method with React Router v4, it is no longer a necessity to do so. \n The new declarative components usable with React Router include the Redirect component, which allows you to programmatically redirect a user- for example, redirection away from protected routes in situations where the user is not authenticated.`
  },
  {
    id: "_pfxm4kt5l",
    title: "Checking for Array-ness",
    keywords: ["javascript", "arrays"],
    author: "Emmett Slack",
    timestamp: new Date(2018, 3, 20, 18, 1),
    content: `Simply checking whether a given element is an array using typeof will only return the value "object", as arrays are objects.
	  The isArray() method can check to see whether an element is an array, but if this method is not available, there is a simple alternative:`,
    code: "Object.prototype.toString.call( element ) === '[object Array]';"
  },
  {
    id: "_jk4av0acb",
    title: "Memoization",
    keywords: ["javascript", "functions", "memoization"],
    author: "Emmett Slack",
    timestamp: new Date(2018, 2, 4, 10, 41),
    content: `Functions, like any other object in JavaScript, can have their own properties and methods. The concept of memoization is utilized to keep potentially expensive function calculations stored in a cache, which is implemented as a property of the function. 
	The function first checks to see whether the cache exists- if it doesn't, it creates it (i.e. fn.cache = {}). Then it checks to see whether the cache contains a key matching the current argument(s) being passed to the function. If such a key already exists, the function simply returns the value cached. Otherwise, it proceeds with the rest of its code.`
  },
  {
    id: "_d8g9ndswh",
    title: "Private variables with Weakmaps",
    keywords: ["es6", "javascript", "weakmap", "iife", "private variables"],
    author: "Emmett Slack",
    timestamp: new Date(2018, 3, 1, 13, 40),
    content: `Up until ES6, we could mimic private variables in JavaScript by utilizing IIFE's and closure to allow access to these variables only via privileged methods that we exposed by returning them from the IIFE. However, we can now utilize Weakmaps, an ES6 feature, to achieve truly private variables. 

	To do this, we define a constructor function as an IIFE that in turn returns us a class/constructor function. Prior to defining this class, we define the private variable items = new Weakmap(). Next, within the class definition's constructor, we call items.set( this, [] ). (Note that we can use another data structure, not just an array). Now the class instantiation (this) is the key via which we can access the private array, items. Weakmaps allow us to use objects as keys. In this way, we can only access items via the instantiation of the object generated by our class. 

	In the class' methods, we access items as follows: let s = items.get( this ), where 's' is an arbitrary variable name.`
  }
];

export function _getPosts() {
  return new Promise((res, rej) => {
    setTimeout(() => res(posts), 2000);
  });
}

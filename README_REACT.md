Milestone 7:
**************************************************
1) React Core Concepts (part-1)

- ReactJS is a JS library for building UI.

- It breaks web elements into reusable components.

- Components are basically building blocks, which are merged together to form a UI.

- A react component is a JS function that you can sprinkle with markup except:
1) Their names always begin with a capital letter
2) They return JSX markup (or easier HTML markup)

- JSX stands for JS XML and lets you write HTML-like markup inside a JS file. Under the hood it's transformed into regular JS using compilers like Typescript.

- JSX isnt supported by browsers (as browsers can only render HTML, CSS, and JS). To enable a browser to read JSX, we need to transform it to a regular JS using compiler like Babel and then pass it to the browser.

- Rules of JSX:
1) Return a single root element. (for eg div). To return multiple elements from a component, wrap them with a single parent tag or fragment (aka empty tag).

2) Close all the tags (for eg img tag)

3) Use camelCase

- Use className instead of class for adding classes.

- Another way of adding styles is by creating an object consisting of css styles in camelcase. Then using the style attribute.

function Developer(){
  const developerStyle = {
    margin: "20px",
    padding: "20px",
    border: "2px solid purple",
    borderRadius: "20px"
  }
  return(
    <div style={developerStyle}>
      <h5>Yada Yada</h5>
      <p>IDK</p>
    </div>
  )
}

OR

function Developer(){
  return(
    <div style={{
    margin: "20px",
    padding: "20px",
    border: "2px solid purple",
    borderRadius: "20px"
  }}>
      <h5>Yada Yada</h5>
      <p>IDK</p>
    </div>
  )
}

- To display data dynamically we use props. The component that we have created, can take any property of our wish and can take any value (in the markup), and to get those values we need to pass that property as "prop" as an argument to that component function. This prop is the object name and contains the property/key and value we have set in the markup.

- Since we get an object in the argument, we can destructure it there. We can set default values while destructuring as well. 

<Device name="Watch" price="20"></Device>

function Device({name = "IDK", price = 0}){
  console.log(name, price)
  return <h2>This device: {name} and the price is {price}</h2>
}

- Props are used to send data from one component to another. To pass props, add them to the JSX just like you would with HTML attributes. Props are immutable (meaning they cant be changed when accessed). In this example we are sending data from the app component to our own made components.
Below from the app component we are sending data to device, student components, and those components are accepting an argument in the form of props which are essentially objects.

function App() {

  return (
    <>
      <h1>Vite + React</h1>
      <Device name="Laptop" price="55"></Device>
      <Device name="Phone" price="17"></Device>
      <Device name="Watch" price="20"></Device>
      <Person></Person>
      <Student></Student>
      <Developer></Developer>
    </>
  )
}

- If we want to pass a number or boolean as the value of a prop key then use {number or boolean value}.

- ^ (continuation of previous point) Basically passing anything other than strings, we need to pass inside {}.

- We cant change the value of props inside the component as it's read-only. However, if we destructure it, it makes another variable which can be changed.

- When we create a component in another file and want to use somewhere else, we need to export that component and import it in the file we want to use.

export default function Todo({task}){
    return (
        <li>Task: {task}</li>
    )
}

import Todo from "./todo";

- Conditional rendering: 
1)) Option 1: Using if-else

export default function Todo({task, isDone}){
    if(isDone){
        return <li>Finished: {task}</li>
    }
    else{
        return <li>Work on: {task}</li>
    }
}

2)) Using only if. Since boolean can take only two values true and false, if it satisfies the condition then do one thing, if not just do the other thing (we dont need to explicitly state else).

export default function Todo({task, isDone}){
    if(isDone){
        return <li>Finished: {task}</li>
    }
    return <li>Work on: {task}</li>
}

3)) Using ternary operator

export default function Todo({task, isDone}){
//     return(
//         <li>{isDone ? "Finished": "Work on"} : {task}</li>
//     )
}

4)) Using and operator. If the left side is true then execute the right side.

export default function Todo({task, isDone}){
    return (
        <li>{task} : {isDone && " Done"}</li>
    )
}

5)) Using or operator. If the left side is false, then execute the right side.

export default function Todo({task, isDone}){
    return(
        <li>{task} {isDone || ": Work on it"}</li>
    )
}

6)) Using if-else and setting the html to a variable and returning it, instead of directly returning the html.

export default function Todo({task, isDone}){
    let listItem;
    if(isDone){
        listItem = <li>Finished : {task}</li>
    }
    else{
        listItem = <li>Work on : {task}</li>
    }
    return listItem
}


- If we have an array or array of objects, and we want to use those elements in the array and send it as props to components, then use { } along with the map function. Below are examples-

function App() {
  const actors = ["Tom", "Cruise", "Holland", "Brad Pitt"];
  const singers = [
    {id: 1, name: "JB", age: 30},
    {id: 2, name: "Bruno", age: 35},
    {id: 3, name: "PM", age: 37},
    {id: 4, name: "Doja", age: 28}
  ]
  return (
      {
        singers.map(singer => <Singer singer = {singer}></Singer>)
      }
      <Actor name={"Thawfiq"}></Actor>
      {
        actors.map(actor => <Actor name = {actor}></Actor>)
      }
  )

}

export default function Singer({singer}){
    console.log(singer)
    return(
        <div>
            <h3>Singer: {singer.name}</h3>
            <p>Age: {singer.age}</p>
        </div>
    )
}

export default function Actor({name}){
    return <li>Name: {name}</li>
}

- We can pass an array (or an array of objects) as props as well. In the component, we recieve an array and can use array methods like .length as well.

  const books = [
    {id: 1, name: "physics", price: 100},
    {id: 2, name: "maths", price: 120},
    {id: 3, name: "chem", price: 140},
    {id: 4, name: "english", price: 150}

  ]

  function App(){
    return(
      <>
        <BookStore books={books}></BookStore>
      </>
    )
  }

  export default function BookStore({books}){
    return(
        <>
            <h3>Books: {books.length}</h3>
        </>
    )
}

- We can send props from the root component to a component (component-1-bookstore) and use another component (component-2-book) in the first component.

<!-- We created an array of object and passed it to the BookStore component as props (passed the entire array as a whole) -->
  function App(){
    const books = [
    {id: 1, name: "physics", price: 100},
    {id: 2, name: "maths", price: 120},
    {id: 3, name: "chem", price: 140},
    {id: 4, name: "english", price: 150}

  ]
    return(
      <>
        <BookStore books={books}></BookStore>
      </>
    )
  }

<!-- In the BookStore component we recieved the array and we dynamically traversed trhough each element of the array using map function and inside it we used another component called Book to which we pass each element of the array -->
import Book from "./Book"
export default function BookStore({books}){
    return(
        <>
            <h3>Books: {books.length}</h3>
            {
                books.map(book => <Book book={book}></Book>)
            }
        </>
    )
}

<!-- In the Book component, we recieve every single elements of the array, and return something.  -->
import './book.css';
export default function Book({book}){
    return(
        <div className='book'>
            <h3>Book Name: {book.name}</h3>
        </div>
    )
}


**************************************************
2) React Core Concepts (part-2)

- In React, do handle events, there are few changes we need to make as opposed to just HTML and JS.
In HTML and JS, it was something like-

<button onclick="handleClick()">CLick me</button>

function handleClick(){
  alert("Clicked);
}

But in React, we use onClick (with C capital) and we dont use quotation mark instead we use curly brackets, also we dont call the function, we just use the function name.

1) Using normal function
  function App(){
    function handleClick(){
      alert("CLicked")
    }
    return(
      <button onClick={handleClick}>Click me using normal function</button>
    )
  
  }

2) Using arrow function

function App(){
    const handleClick2 = () => alert("Clicked 2")
    return(
      <button onClick={handleClick2}>Click me using arrow function</button>
    )
  
  }

3) On the onclick attribute itself 

function App(){
    return(
      <button onClick={() => alert("Third click")}>Click me using arrow function directly on onClick</button>
    )
  
  }


- UseState returns an array where the first element is a number or any text or boolean, and the second is a function which updates the existing value.
The variable (the first element is accessible inside the component). Basically using the function we update the existing value.

- We use states when there's a possiblity of something to change, and we want to manage that change and display it on the UI.

- A component with add and reduce buttons-

import { useState } from "react"

export default function Counter(){
    const [count, setCount] = useState(0)

    const handleAdd = () =>{
        const newCount = count + 1
        setCount(newCount)
    }
    const handleReduce = () =>{
        const newcount = count - 1
        setCount(newcount)
    }
    return(
        <div style={{border: "2px solid yellow"}}>
            <h3>Counter: {count}</h3>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleReduce}>Reduce</button>
        </div>
    )
}

- If somethings starts with "use", then it's a react hook

- useEffect exists to synchronize a component with an external system (like fetching data). 

- Code for basic use of useEffect-

import { useEffect, useState } from "react"

export default function Users(){
    const [users, setUsers] = useState([])
    // Used empty array as the initial value, as from the api we're getting an array of object, which is essentially an array. The api maybe broken, so firts we initialize it to an empty array, and when it'ssuccessfully fetched, then we update it.


    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])
    // The second paramater is the dependency array, and here it's an empty array which means it will run only once (we need to fetch the data only once).
    return(
        <div>
            <h3>Users: {users.length}</h3>
        </div>
    )
}

- If we didnt use useEffect in the code above, and just used fetch-then, then there would be an infinite loop, as when the state changes, there would be a trigger and that would cause it to fetch the api again.

- Rendering means that react is calling your component, which is a function.
Any screen update in a react app happens in 3 steps:
1) Trigger - triggers when state changes
2) Render - after triggering, react calls your component to figure out what to display on screen.
3) Commit - displays to the dom

- Side effects one example is fetching data.

- Similar in look, different in data - thinking in react way.















**************************************************
3) Simple React Rest Countries

- There's a VS code extension called "React Extension Pack", and this allow us to quickly get the structure of a component by just writing 'rsc' + tab. 

- If there are more than 7-8 components it's best to keep them in a folder under src. Also, if there's a possibility of the components having seperate css file, then create a folder for that component and css file seperately, under that folder.

- When we use a component multiple times (like 100s) dynamically (using map function), then react gives us a warning to use "key" props. The value of it will be something unique. This is so that the code is optimized and can be handled efficiently. 

    return (
        <div>
            <h3>Countries: {countries.length}</h3>
            {
                countries.map(country => <Country key={country.cca3} country = {country}></Country>)
            }
        </div>
    );

- We sometimes might get a warning- prop types eslint warning. Here when we are sending props, it's a good idea to validate or mention the type of prop data we are sending. It can be turned off from eslintrc.cjs file.

- If we want to toggle between two states, then we can use the not operator along with the variable that changes states. 

const Country = ({country}) => {
    console.log(country)
    const {name, flags, population, area, cca3} = country;

    const [visited, setVisited] = useState(false)

    const handleVisited = () =>{
        setVisited(!visited)
    }

    return (
        <div className="country">
            <h3>Name: {name?.common}</h3>
            <button onClick={handleVisited}>{visited? "Visited" : "Going"}</button>
            <br />
            <br />
            {/* {
                visited && "I have visited this country"
            } */}
            {
                visited? "I have visited this country" : "I want to visit"
            
            }
        </div>
    );
};

- Conditional CSS and conditional style -

    <div className={`country ${visited? "visited" : ""}`}>
      <h3 style={{color: visited? "Purple" : "green"}}>Name: {name?.common}</h3>

First use of ${} in react is in conditional css.

- The event handler (used to change the state), the state changer (useState) and the button should be in the same component.

- We can send a function as a prop to another component. Simply use {function_name}. Dont use the parenthesis after the function_name.

- When we want to call a function from onClick, and the function has parameters, we can't just call the function with the parameters, as it will result in automatic calls of that function without even clicking it. So, we can create a random function with no paramater and then inside that function we can call the desired function. OR simply just use arrow function inside the curly braces.

const Country = ({country, handleVisitedCountry}) => {

    const noParamFunction = () =>{
        handleVisitedCountry(country)
    }

    return (
        <div className={`country ${visited? "visited" : ""}`}>
            <button onClick={noParamFunction}>Mark visited</button>
            <!-- OR -->
            <button onClick={()=>handleVisitedCountry(country)}>Mark visited</button>
        </div>
    );
};


- When we want to update or push an element to a state that is an array, we need to create a new array using the spread operator seperated by the new element. We cant just use push pop, as react renders the array as immutable.

const Countries = () => {
    const [visitedCountries, setVisitedCountries] = useState([])

    const handleVisitedCountry = country =>{
        console.log("Add this to your visited country")
        console.log(country)
        const newVisitedCountries = [...visitedCountries, country]
        setVisitedCountries(newVisitedCountries)
    }

    return (
        <div>
            <h3>Countries: {countries.length}</h3>
            <div>
                <h5>Visited Countries: {visitedCountries.length}</h5>
                <ul>
                    {
                        visitedCountries.map(country => <li key={country.cca3}>{country.name.common}</li>)
                    }
                </ul>
            </div>
        </div>
    );
};

- If we do not have an object, where we can set the key prop while mapping, then we can pass a second parameter to the map function. The parameter is "idx", and then we set the key equal to this idx.

  <div className="flag-container">
       {
           visitedFlags.map((flag, idx) => <img key={idx} src={flag}></img>)
      }
   </div>


- Prop drilling refers to sending props from one component to another and so on. Sending props from country to countryDetail. If there are more than 10 props we usually dont destructure it in the parameter (destructure it in the body of the component), so that we can just pass that prop itself by using the spread operator as shown below-

const CountryDetail = (props) => {
    const {country, handleVisitedCountry, handleVisitedFlags} = props
    return (
        <div>
            <h4>Country Detail: </h4>
            <hr />
            {/* <CountryData country={country} handleVisitedCountry={handleVisitedCountry} handleVisitedFlags={handleVisitedFlags}></CountryData> */}
            <CountryData {...props}></CountryData>
        </div>
    );
};

const Country = ({country, handleVisitedCountry, handleVisitedFlags}) => {
   
    return (
        <div className={`country ${visited? "visited" : ""}`}>
            <h3 style={{color: visited? "Purple" : "green"}}>Name: {name?.common}</h3>
            
            <CountryDetail country={country} handleVisitedCountry={handleVisitedCountry} handleVisitedFlags={handleVisitedFlags}></CountryDetail>
        </div>
    );
};


- For deployment, we write "npm run build" to create a dist folder, which will contain all the JS, HTML, CSS files but those are mini-fied for the end user.
























**************************************************
4) Modules and data storage integration-

- If there's a double dot in the directory path for eg- import Watch from '../Watch/Watch';
Here, it means that we're going a level above or before what we're currently in.

import add from '../../Utils/calculate';
Here we are moving 2 levels above since we have 2 ".."

- If while importing, we import from just a name (no directory path) like "react", then it's coming from a built-in package coming from the node modules.

- To export for example one function, object, or a value use "export default"-

const add = (first, second) => first+second

export default add

- For exporting multiple functions use only export and destructure the functions in the form of objects.
When not using export default, and only export, it needs to be followed by something in curly braces.

const add = (first, second) => first+second

const multiply = (first, second) => first * second

export {add, multiply}

- If there's a function or anything that has a very big name, we can shorten it while importing using the "as" keyword.

import {add, divideTwoNumbers as divide} from '../../Utils/calculate';


- When we dont have an api ready, we can create a fake data (array of object) and use it.

- Or we can create fake data using chatgpt or any AI tools. Before chatgpt, we used to use json generator.

- If we want to ue fetch-then, then create a json file under the "public" folder.

- Another option could be by creating a github repo, and creating a json file, and putting the fake data (in json format) there, and using the raw version of that file to fetch (fetch the url of that raw file).
It's not recommended though as the data is open and doesn't result in the best performance.

- React in uni-directional, meaning for example if we have 2 components, bottles and bottle (from bottles component we call bottle), and we want to know how many bottles we have purchased, we need an state manager on the bottles component, not the bottle component, as we're not working with one bottle separately. We can move functions anything from top to bottom not the other way around (top- bottles and bottom- bottle).

- LocalStorage workflow-

1) We need a function (getStoredCart) with which we can get the stored cart (in an array). If there's something we convert it into an object (as in local storage it's in a stringified format), and if there's nothing found we return an empty array.

2) We need a function (addToLS) that takes the array (empty or not) from the function above (the functioin that gets the items from local storage and returns array), and then pushes the new element to be added to the array, and then call a function (saveCartToLS) which saves the cart to LS.

3) The saveCartToLS function takes the array as the parameter, and converts it to a string (using strinigified method), and then sets item to LocalStorage using LocalStorage.setItem("cart", array_name).

Then we export the addToLS function.


- To give prop types, search prop types in google, and go to their github, and install-
npm install --save prop-types

Then import in the jsx files wherever required-
import PropTypes from 'prop-types';

Next, after the component, write the type of the prop-

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  propName: PropTypes.array,
  propName: PropTypes.func,
  propName: PropTypes.number,
  propName: PropTypes.object,
}

If after the prop type declaration, we give isRequired, then the prop must be sent, else by default it's optional-

propName: PropTypes.array.isRequired











**************************************************
5) Simple React SPA with scribbles cafe-

- Image hosting website- ImgBB. Use direct link for the url.

- If we give the key props to something and it is being repeated due to multiple clicks, we might get a warning. To fix this, we can just use the idx.

- If we want to remove something, then we use the filter method.

- Lifting up states basically refers to finding a connection between 2 components that are not directly connected.

- Important to lift up the state to a common parent.

- Conditional Rendering (toggling between states)-
set the state in a parent container and then pass the updated state (gets updated through an event handler). The event handler takes something as a parameter, and then we use if-else to update the state. 
Next, we pass the updated state to the children container where the container contains buttons it will toggle between. In those buttons, we send the parameter to the event handler in the parent component. The buttons also have seperate components.

For conditional rendering of the button components, we use {updatedState? <Component-button-1> : <Component-button-2>}.

For conditional rendering of the button styles, use conditional rendering of the classname in each button.



Important)))))))))
Code for toggling between 2 buttons-

import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Banner from './Components/Banner/Banner'
import Toggle from './Components/Toggle/Toggle'
import Available from './Components/Available/Available'
import Selected from './Components/Selected/Selected'

function App() {

  // Active Toggle Buttons

  const [available, setavailable] = useState(true);

  const handleActive = (status) =>{
    if(status){
      setavailable(true)
    }
    else{
      setavailable(false)
    }
  }

  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <Toggle handleActive={handleActive} available={available}></Toggle>
        {
          available === true ? <Available players={players} handleSelected={handleSelected}></Available> : <Selected selected={selected}></Selected> 
        }
      </div>
    </>
  )
}

export default App


import Available from "../Available/Available";
import Selected from "../Selected/Selected";
import "./Toggle.css"
const Toggle = ({handleActive, available}) => {
    return (
        <div className="flex justify-end">
            <button onClick={() => handleActive(true)} className={`${available == true? `active`:`btn`}`}>Available</button>
            <button onClick={() => handleActive(false)} className={`${available == false? `active`:`btn`}`}>Selected </button>
        </div>

    );
};

export default Toggle;


- React-toastify is used to customize pop-up alerts.

- For removing something from an array, use the filter method. The logic is to select everything besides the one we selected.

const [selected, setSelected] = useState([])
const handleRemovePlayer = (removePlayer) =>{
    const remainingPlayers = selected.filter(player => player.name != removePlayer.name)
    setSelected(remainingPlayers)
  }


- React is called react, as it reacts to the changes and renders the changes accordingly. Normal JS doesnt react, but we can use a JS package called rxjx which makes it reactive.


















Milestone 8:
**************************************************
1) Tailwind CSS, Axios, Rechart, Awesome components

- We can use daisyUI by following the installation guide in their website. 2 steps- 1) install, 2) add plugins to the tailwind.congig.js file

- For navbars, we also use an array of object, with the path name, name of the link, and id.

- For hamburger menu, use react-icons, install the given package, and then import the icon and use it as a component.


- Full code for hamburger menu-

import { useState } from "react";
import Link from "../Link/Link";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const routes = [
        { id: 1, path: "/", name: "Home" },
        { id: 2, path: "/about", name: "About Us" },
        { id: 3, path: "/services", name: "Services" },
        { id: 4, path: "/contact", name: "Contact" },
        { id: 5, path: "/blog", name: "Blog" },
      ];
      

    return (
        <nav className="p-6">
            <div className="md:hidden text-xl" onClick={() => setOpen(!open)}>
                {
                    open === true? <IoMdClose /> : <CiMenuBurger />
                }
                
            </div>
            <ul className={`md:flex absolute md:static pl-4 ${open? "" : "hidden"}`}>
                {
                    routes.map(route => <Link key={route.id} route={route}></Link>)
                }
            </ul>
        </nav>
    );
};

export default Navbar;


- Flex-grow option is used to make an element or a div take the full space or as much space as it possibly can while allowing just the space needed for the other elements. for flex-grow, the container needs to have flex property.

- Use react icons for icons

- For charts or graphs, use recharts.

- Axios can be used instead of fetch. When we use axio, we dont need to convert it to json (can skip the second step that we use when using fetch).

- React awesome components github link can be used for wide array of components, like date picker, img zoomer, loading signs etc.





**************************************************
2) React Router Concept

- In index.html file, we give an id to a div, and in the main.jsx file, we take that id and place the react app inside it.

-https://reactrouter.com/6.28.0/start/tutorial (link to react-router)

- Nested route is used to make some part of the UI fixed, while one portion of the ui changes based on different routes. For nested routes, we need two things- 1) children key - this takes path and element for different routes, 2) outlet- this is used in the root route, and used where the other routes will be displayed keeping other things same.

- When using routes, we can use <Link to=""> component instead of <a href=""></a> tag. Because usng Link component, the page will not reload, unlike anchor tag.

- When we want to load data only when we get to a path, then we can use loader and useLoaderData.
We set a key called loader to the path we want to load the data to, which contains an arrow function which just fetches the url. 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/users",
        loader: () => fetch("https://jsonplaceholder.typicode.com/users"),
        element: <Users></Users>
      }
    ]
  },
]);

Next, to get the data, we use useLoaderData function, and set it to a variable and use that variable.

const users = useLoaderData();

- The difference between normal fetching and useLoaderData is, in normal fetching the data is fetched after the component renders, so there can be a spinner, but in case of useLoaderData, the data is fetched before the component renders, so no loading state or spinner.


- Dynamic Routing- When we have for example multiple users, we want to have different routes for each user, but for that it's complicated to set different route paths and elements for every user, so what we can do is use dynamic routing. Here, we will take a unique identifier for every user and dynamically set it to a link component. Eg-

const User = ({user}) => {
    const {id, name, email, phone} = user;
    return (
        <div>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <Link to={`/user/${id}`}>Show Details</Link>
        </div>
    );
};

Next, we set the path and element as a children of the root route. When defining the path, we need to use a colon ( : ) beside the last endpoint of a path, so that it can work as a variable. 

{
        path: `/user/:userId`,
        loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
        element: <UserDetils></UserDetils>
      }

Next, we set a loader to fetch the data for that exact id, where we need params as a parameter. paramas is an object, so we destructure it. Now when we access params, we will get the last endpoint of the path which is acting as a variable. 
Then, in the element component, we need to use useLoaderData() function.


- useNavigate hook- This is another way to go to a dynamic route instead of using link component. For this hook, we use button and an onclick (event handler), where we call a function, and in that function, we use the navigate function to direct us somewhere (could be to a path dynamically or -1 which indicates to go back to the previous route.)

const Post = ({post}) => {
    const {id, title} = post;

    const navigate = useNavigate()

    const handleShowDetail = () =>{
        navigate(`/post/${id}`)
    }
    return (
        <div className="flex flex-col mx-auto border-yellow-200 border rounded-xl p-4">
            <h4>Post of Id: {id}</h4>
            <p className="flex-grow">{title}</p>
            <button onClick={handleShowDetail}>Click to see details</button>
        </div>
    );
};


- errorElement is quite a useful one, as using this we can set the page not found page. It should be set to the parent route or the root route.

- useRouteError() hook- This is used along with the errorElement component, using this hook, we can get the error status etc.

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div>
            <h2>Oopps!</h2>
            <p>{error.statusText || error.message}</p>
            {
                error.status === 404 && <div>
                    <h3>Page Not found</h3>
                    <p>Go back to home page</p>
                    <Link className="text-blue-600" to={"/"}><button>Home</button></Link>
                </div>
            }
        </div>
    );
};


- useParams() hook- when checking the details of users or something (while dynamic routing), if we ever need the params value in the element we used for that routing, we use useParams hook.

const PostDetails = () => {
    const post = useLoaderData()
    const {postId} = useParams()
    const {id, title, body} = post

    console.log(postId)

    return (
        <div>
            <h2>Post details: {id}</h2>
            <p>Title: {title}</p>
            <p>{body}</p>
        </div>
    );
};

- Active Route is used to show which (child) route we are in. For this to work, we need to use <NavLink> instead of just <Link>, and then apply a css style to that <NavLink>, which turns into an anchor tag, as the browser doesnt understand all these different components, it only understands html and css. The <NavLink> gives an active classname to the element selected, then using that active class we can style.

const Header = () => {
    return (
        <div>
            <nav className="space-x-5 text-blue-600">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact Us</NavLink>
            </nav>
        </div>
    );
};

CSS style-

nav a.active{
    text-decoration: underline;
    color: aqua;
}


- If any hook, is used in the root route, then it will work with the children routes as well, like the 2 hooks below-

- useNavigation() hook - it is used in the root route, and used to primarily show a loading spinner or if not the component or the route that's been loaded. The loading spinner orthe loading only works, when that route is fetching something and not just a simple component.


const Home = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Header></Header>
            {
                navigation.state == "loading" ? <p>Loading..</p> : <Outlet></Outlet>
            }
            
            <Footer></Footer>
        </div>
    );
};

- useLocation() hook - used in the root route. This can be used to know the location or path.

const Home = () => {
    const location = useLocation();
    console.log(location)
    return (
        <div>
            <Header></Header>
            {
                navigation.state == "loading" ? <p>Loading..</p> : <Outlet></Outlet>
            }
            
            <Footer></Footer>
        </div>
    );
};













**************************************************
3) React Core Concept (part-3)

- To handle forms-
1)) use the onSubmit attribute with the form tag (works similar to an onclick), and that onSubmit attribute will contain an event handler. The event handler function will have a parameter e.

- Use e.preventDefault(), to stop the page from reloading, when the submit button is clicked. 

- Use (e.target.[name of the input field].value) e.target to get the form tag as a whole, and then using the name atrribute set to each input, we can get thoseparticluar inputs, and to get the value, just use value at the end. 

-const SimpleForm = () => {

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(e.target.name.value)
        console.log(e.target.email.value)
        console.log(e.target.number.value)
        console.log("Form submitted")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="name"/>
                <br />
                <br />
                <input type="email" name="email" id="" placeholder="email"/>
                <br />
                <br />
                <input type="number" name="number" id="" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

Difference between controlled element and uncontrolled element is that in controlled element, there's a state associated with every input field and also there's an event handler, but in uncontrolled element, there are no states, and we use the useRef hook.

2)) Controlled element: Using individual field state- In this option, we set eventhandlers to every inputs, but it will be onChange (not onClick or onSubmit). There will also be a state associated with every event handler functions. 

const StateFullForm = () => {

    const [email, setEmail] = useState(null)
    const [name, setName] = useState("nabil")
    const [password,setPassword] = useState(null)

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(email, name, password)
    }

    const handleEmailChange = e =>{
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    
    const handleNameChange = e=>{
        setName(e.target.value)
    }

    const handlePasswordChange = e=>{
        setPassword(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={name}
                onChange={handleNameChange}
                type="text" name="name" placeholder="name"/>
                <br />
                <br />
                <input
                    onChange={handleEmailChange}
                type="email" name="email" id="3" placeholder="email"/>
                <br />
                <br />
                <input
                onChange={handlePasswordChange}
                type="password" name="password" id="2" required />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

- We can also set the default value of each input, by using the value attribute in every input and setting it to the state. 
OR
By using the defaultValue attribute with the input field, and setting the value directly.


3)) Similar to the previous one, but here one object in a state holds all the input fields value.


4)) Uncontolled element: use the useRef hook to create a reference to the element and access value by using nameRef.current.value.

- When using the useRef hook (the useRef hook takes any value as an initializer, but we will use null), we should also use the ref form attribute with the input fields, and set it to the ref hook variable. Now to access the value use variableNameRef.current.value.

- We can also set the focus to an input field, but for this we need to use useEffect, and simply use variableNameRef.current.focus() function inside it.

const RefForm = () => {

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const numberRef = useRef(null)

    useEffect(() =>{
        nameRef.current.focus()
    }, [])

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(nameRef.current.value)
        console.log(emailRef.current.value)
        console.log(numberRef.current.value)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" name="name" placeholder="name"/>
                <br />
                <br />
                <input ref={emailRef} defaultValue={"rojoni@shojoni.com"} type="email" name="email" id="" placeholder="email"/>
                <br />
                <br />
                <input ref={numberRef} type="number" name="number" id="" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};


- In option 2, there was repition of code for states and event handlers. To minimize this, we can write our custom code to simplify it (or we can also call it custom hook).

Here custom hook is nothing but creating a js file which contains a function that takes in a default value, and initializes a state, and a generic eventhandler and returns the state and the eventhandler either as an array or an object.

- As an array-

// Below is the code for the JS file-

const useInputState = (defaultValue=null) =>{
    const [value, setValue] = useState(defaultValue)

    const handleChange = e =>{
        setValue(e.target.value)
    }
    return [value, handleChange]
}

export default useInputState

// Jsx file-

const HookForm = () => {

    const [name, handleNameChange] = useInputState('')

    const handleSubmit = e=>{
        console.log("Name changed to", name)
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={handleNameChange} type="text" name="name" placeholder="name"/>
                <br />
                <br />
                <input type="email" name="email" id="" placeholder="email"/>
                <br />
                <br />
                <input type="password" name="password" id="" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default HookForm;

- As an object-

// Below is the code for the JS file-

import { useState } from "react"

const useInputState = (defaultValue=null) =>{
    const [value, setValue] = useState(defaultValue)

    const onChange = e =>{
        setValue(e.target.value)
    }

    return {
        value,
        onChange
    }
}

// Jsx file-

const HookForm = () => {

    // const [name, handleNameChange] = useInputState('')

    const emailState = useInputState('')

    const handleSubmit = e=>{
        // console.log("Name changed to", name)
        console.log("Email changed to", emailState.value)
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* <input value={name} onChange={handleNameChange} type="text" name="name" placeholder="name"/> */}
                <br />
                <br />
                <input {...emailState} type="email" name="email" id="" placeholder="email"/>
                <br />
                <br />
                <input type="password" name="password" id="" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};


5)) Use hook to handle states and submit and error. Example react hook form


- There are multiple ways to reuse a form component. One of them is through props, where we will be calling the same component multiple times in app.jsx with different props. To get data from the the form component, we can just simply create a function from app.jsx with a parameter, and take the values of the input from the form component and keep it in an object and then call that function (the one created in app.jsx) from the form component.

In form component-

const handleLocalSubmit = e =>{
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            email: e.target.email.email,
            password: e.target.number.value
        }
        handleSubmit(data)
    }


In app.jsx-

const handleSignUpSubmit = data =>{
    console.log("Sign up data", data)
  }

  const handleUpdateProfile = data =>{
    console.log("Update profile data", data)
  }


- We can also use the children prop in the component, and when using that component in app.jsx, we simply use any HTML element we want inside the body of the component.

<ReusableForm formTitle={"Sign Up"} handleSubmit={handleSignUpSubmit}>
        <div>
          <h2>Sign Up</h2>
          <p>Sign up right now or leave</p>
        </div>
      </ReusableForm>
      <ReusableForm formTitle={"Profile Update"} handleSubmit={handleUpdateProfile} submitBtnText="Update">
        <div>
          <h2>Update profile</h2>
          <p>Always keep your profile updated.</p>
        </div>
      </ReusableForm>


- We can use the && operator to make sure that when one of the condition (the left side) is satisfied or true, we show a component.

Here if asset contains a value, or is true, then show the special component.

<section>
    {asset && <Special asset={asset}></Special>}
</section>


- For prop drilling, it's kinda tiring, so to overcome it, we use context api. There are three steps to it-

1) Create a context and export it-

export const AssetContext = createContext("Gold")

It's important to create it outisde the component function scope, as we're exporting it. We usually give the word "context" after the context we're creating, eg AssetContext. Here the variable starts with a capital letter.

2) Add provider for the context with a value (the value could be anything like function, or anything dynamic).

 <AssetContext.Provider value="gold">
    <section className="flex">
        <Dad asset={asset}></Dad>
        <Uncle asset={asset}></Uncle>
        <Aunty></Aunty>
    </section>
</AssetContext.Provider>

Can think of the provider as the tower of cellphones, where any components (be it nested like dad component has the components myself, brother, and sister) will get the context.

3) Use useContext to access value in the context API.

- Using context api, if we update the state in another component, it will affect the state in other components as well.


- Import tailwind and daisyUI plugins in index.css and not app.css


**************************************************
4) Book Vibe with Router-

- If we want to change a variable's name while destructuring, use :

eg- const { bookId: currentBookId, image } = book;

- We can use loader with no params for dynamic routing in main.jsx. We can simply fetch the data using the loader, and in the element, we have to use the useParams hook to get the param, and then use useLoaderData() hook to get the overall data, and then find the id we're looking for by using .find method, but here it's important that we convert the param key that we destructure to an int, as when we destructure it, it becomes a string. (OR we could just simply use "==" instead of "===").

main.jsx file-

children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "books/:bookId",
        element: <BookDetail></BookDetail>,
        loader: () => fetch("../public/data/booksData.json")
      },


The element file (BookDetail file)-

import { useLoaderData, useParams } from "react-router-dom";

const BookDetail = () => {
  const { bookId } = useParams();
  const data = useLoaderData();
  const id = parseInt(bookId);

  const book = data.find((book) => book.bookId === id);
  console.log(book);

  const { bookId: currentBookId, image } = book;

  return (
    <div className="">
      <h2 className="font-semibold text-center text-3xl">Book Number: {bookId}</h2>
      <div className="mx-auto w-fit">
        <img className="w-36 mx-auto my-3" src={image} alt="" />
        <br />
        <button className="btn btn-outline btn-accent mr-4">Read</button>
        <button className="btn btn-accent">Wish List</button>
      </div>
    </div>
  );
};

- When we deploy to netlify, and use react router and then click refresh, it will show page not founde error. To solve this, create a _redirects file under the public folder, and add the following line of code-
 /index.html  200
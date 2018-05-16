# Babmutna

The is a Babmutna Web client, implemented using [**React**](https://reactjs.org/). It can run on chrome, We don't consider any other browser. This is the **Design Project of** **CS374:Introduction to Human-Computer Interaction** made by Team Babmutna

## POV
The POV of our project is that Pakistani students at KAIST need an integrated management system that provides an easy way to organize and coordinate their diets because they are a party of people with specific food restrictions who eat and cook together in large groups.

## Tasks
Our project support 3 tasks
* Check Today’s menu and its recipe, after then announce that dinner is ready
* Check “when & what” you’re gonna cook with “whom”
* Trade your duty date with another member.

## How to Run

1. Prepare your environment: [Requirements](https://reactjs.org/docs/try-react.html)
2. Clone this repo, and goto the project root directory
3. run `npm install`
4. run `npm start`
5. Enjoy

## Implement
We using react library to implement this page. Our root JS file is `src/App.js`, We Load Data from firebase after component mount. The First Page is Today Menu. it implemented in `src/components/TodayMenu/`. You can change the page using menu implemented in `src/components/Header/`. Each Page (calendar, recipes and Trade) is implemented in `src/components/Calendar` ,`src/components/Recipe` and `src/components/Trade/`
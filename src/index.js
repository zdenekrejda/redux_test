import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';


/* Initial state of reducer - 2 initial tasks */
var initialState = ['First task', 'Second task', 'Active task'];

/* REDUCER */
function todo(state = initialState, action) {

    switch (action.type) {
        /* Firts action - add new  task*/
        case 'ADD':
            return [...state, action.text];

            /* Second action - remove task */
        case 'REMOVE':
            var newState = [...state];
            newState.splice(action.id, 1);
            return newState;

            /* Third action - sort tasks */
        case 'SORT':
            newState = [...state];
            if(action.sort_up) {
                newState.sort((a, b) => (a < b));
            }
            else {
                newState.sort((a, b) => (a > b));
            }
            return newState;

            /* Fourth action - remove all tasks */
        case 'REMOVE-ALL':
            return [];

        default:
            return state;
    }
}

/* Create store */
var store = createStore(todo);

/* Component for writing store content to console and to page */
store.subscribe(function() {
    var state = store.getState();
    console.log('New state:', state);
    /* document.body.innerHTML = 'Actual state:<br/>- ' + state.join('<br/>- '); */
});

/* few actions for test */
store.dispatch({
    type: 'ADD',
    text: 'Third task'
});

store.dispatch({
    type: 'ADD',
    text: 'Fourth task'
});

store.dispatch({
    type: 'REMOVE',
    id: 1
});

store.dispatch({
    type: 'SORT',
    sort_up: true
});

store.dispatch({
    type: 'SORT',
    sort_up: false
});


var removeItem = function(id) {
  store.dispatch({ type: 'REMOVE', id: id });
};

var addItem = function(text) {
  store.dispatch({ type: 'ADD', text: text });
};

ReactDOM.render(<App removeItem={removeItem} addItem={addItem} store={store}/>, document.getElementById("root"));

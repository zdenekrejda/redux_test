import React from 'react';

import Item from './item';
import Form from './form';

export default class App extends React.Component {
    updateState() {
        this.setState({todos: this.props.store.getState()});
    }

    /* Called when component before first render */
    componentWillMount() {
        /* First reading of state */
        this.updateState();

        /* State actualization */
        this.props.store.subscribe(this.updateState.bind(this));
    }

    render() {
        /* props has function for removing task */
        var removeItem = this.props.removeItem;

        /* Render each item */
        var items = this.state.todos.map(function(todo, id) {
          return <Item key={id} text={todo} removeItem={function() { removeItem(id) }}/>;
        });

        /* Draw whole component */
        return (<div>
                  <ul>{items}</ul>
                  <Form addItem={this.props.addItem}/>
                </div>);
  }
}

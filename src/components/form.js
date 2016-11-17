import React from 'react';

export default class Item extends React.Component {
    render() {
        var input;
        var addItem = this.props.addItem;

        return (<div>
                  <input ref={function(ref) { input = ref }}/>
                  <button onClick={function() {
                     addItem(input.value);
                     input.value = "";
                    }}>Vložit</button>
                </div>);
    }
};

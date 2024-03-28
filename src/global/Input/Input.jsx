import React from "react";

export default class Input extends React.Component {
    render() {
        let { type, name, value, id, accept, onChange } = this.props;
        return (
            <input
                type={type}
                name={name}
                value={value}
                id={id}
                accept={accept}
                onChange={onChange}
            />
        );
    }
}
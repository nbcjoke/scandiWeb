import React from "react";

import styles from "./style.module.css";

export class ChoiceColor extends React.Component {
  render() {
    const items = this.props.items || [];
    return (
      <div className={styles.details_choise_color}>
        {items.map(({ id, value }) => {
          return (
            <label key={id}>
              <input
                type="radio"
                name="color"
                value={id}
                checked={id === this.props.selected}
                onChange={(e) => {
                  this.props.select(e.target.value);
                }}
              />
              <span style={{ background: value }}></span>
            </label>
          );
        })}
      </div>
    );
  }
}

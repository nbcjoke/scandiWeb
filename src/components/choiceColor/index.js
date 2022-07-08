import React from "react";
import * as uuid from "uuid";

import styles from "./style.module.css";

export class ChoiceColor extends React.Component {
  render() {
    const items = this.props.items || [];
    const key = uuid.v4();
    return (
      <div className={styles.details_choise_color}>
        {items.map(({ id, value }) => {
          return (
            <label key={id}>
              <input
                type="radio"
                name={key}
                value={id}
                checked={id === this.props.selected}
                onChange={(e) => {
                  this.props.select(e.target.value);
                }}
              />
              <span style={{ color: value }}></span>
            </label>
          );
        })}
      </div>
    );
  }
}

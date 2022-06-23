import React from "react";

import styles from "./style.module.css";

export class ChoiceSize extends React.Component {
  render() {
    const items = this.props.items || [];
    return (
      <div className={styles.details_choise_size}>
        {items.map(({ id, value }) => {
          return (
            <label key={id}>
              <input
                type="radio"
                name="size"
                value={id}
                checked={id === this.props.selected}
                onChange={(e) => {
                  this.props.select(e.target.value);
                }}
              />
              <span>{value}</span>
            </label>
          );
        })}
      </div>
    );
  }
}

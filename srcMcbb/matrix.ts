import { Latex, Layout } from "@motion-canvas/2d";
import type { PossibleColor } from "@motion-canvas/core";

/**
 * You could use just array environment in Latex.
 * But i like to suffer.
 */
export class Matrix {
  public values: number[][];
  public texComponents: Latex[][];
  public rowsLayouts: Layout[];
  public completeLayout: Layout;

  constructor(values: number[][], fillColor: PossibleColor) {
    this.values = structuredClone(values);
    this.rowsLayouts = [];

    // Double-for. Pain.
    for (let i = 0; i < values.length; i++) {
      const tRow = values[i];
      const texsRow = [];
      for (let j = 0; j < tRow.length; j++) {
        const val = tRow[j];
        const newTex = new Latex({
          fill: fillColor,
          fontSize: 48,
          tex: val.toString(),
        });
        texsRow.push(newTex);
      }
      const rowLayout = new Layout({
        direction: "row",
        columnGap: 24,
        children: texsRow,
      });
      this.rowsLayouts.push(rowLayout);
    }

    this.completeLayout = new Layout({
      direction: "column",
      rowGap: 16,
      children: this.rowsLayouts,
      layout: true,
    });
  }
}

import { type Curve, Line } from "@motion-canvas/2d";
import type { MarkovState } from "./state";
import { all, easeOutBounce, type SignalGenerator } from "@motion-canvas/core";

export class MarkovTransition {
  public curve: Curve;

  constructor(source: MarkovState, target: MarkovState) {
    const sourcePoint = source.circle.right().add(source.layout.position());
    const targetPoint = target.circle.left().add(target.layout.position());
    this.curve = new Line({
      points: [sourcePoint, targetPoint],
      stroke: "white",
      lineWidth: 4.0,
      endArrow: true,
      arrowSize: 12,
    });
  }

  public getTransitionDrawingAnimation() {
    const attrs = ["opacity", "end"] as const;
    const transitions: SignalGenerator<number, number>[] = [];
    for (const key of attrs) {
      transitions.push(this.curve[key](0.0, 0.0).to(1.0, 1, easeOutBounce));
    }
    return all(...transitions);
  }
}

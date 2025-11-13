import { type Curve, Knot, Line, Spline } from "@motion-canvas/2d";
import { all, easeInOutCubic, type SignalGenerator } from "@motion-canvas/core";
import { type Anchor, anchorVectorMapping } from "../anchors";
import type { MarkovState } from "./state";

export type MarkovTransitionOptions = Partial<{
  useBezier: boolean;
  anchorSource: Anchor;
  anchorEnd: Anchor;
  circleAround: Anchor;
}>;

const SMOOTHING_FACTOR = 0.1;

export class MarkovTransition {
  public curve: Curve;

  constructor(
    source: MarkovState,
    target: MarkovState,
    options?: MarkovTransitionOptions,
  ) {
    if (source === target) {
      this.handleAutoTransition(source, options);
    } else {
      this.simpleTransition(source, target, options);
    }
  }

  private simpleTransition(
    source: MarkovState,
    target: MarkovState,
    options?: MarkovTransitionOptions,
  ) {
    options ??= {};
    options.anchorSource ??= "right";
    options.anchorEnd ??= "left";

    const sourceRadius = (0.5 - SMOOTHING_FACTOR) * source.circle.height();
    const targetRadius = 0.5 * target.circle.height();
    const sourcePoint = anchorVectorMapping[options.anchorSource]
      .scale(sourceRadius)
      .add(source.layout.position());
    const targetPoint = anchorVectorMapping[options.anchorEnd]
      .scale(targetRadius)
      .add(target.layout.position());

    this.curve = new Line({
      points: [sourcePoint, targetPoint],
      stroke: "white",
      lineWidth: 4.0,
      endArrow: true,
      arrowSize: 12,
      zIndex: -1,
    });
  }

  private handleAutoTransition(
    state: MarkovState,
    options?: MarkovTransitionOptions,
  ) {
    // Impossible to not use Bezier in this case.
    if (options === undefined) {
      // Default
      options = {
        useBezier: true,
      };
    } else {
      options.useBezier = true;
    }

    options.anchorSource ??= "right";
    options.anchorEnd ??= "left";
    options.circleAround ??= "top";

    const startPoint = state.circle[options.anchorSource]().add(
      state.layout.position(),
    );
    const endPoint = state.circle[options.anchorEnd]().add(
      state.layout.position(),
    );
    const controlPoint = anchorVectorMapping[options.circleAround]
      .scale(state.circle.height() * 0.777)
      .add(state.layout.position());

    const bezier = new Spline({
      children: [
        new Knot({ position: startPoint, endHandle: [100, 0] }),
        new Knot({
          position: controlPoint,
          startHandle: [200, 0],
          endHandle: [-200, 0],
        }),
        new Knot({ position: endPoint, startHandle: [-100, 0] }),
      ],
      stroke: "white",
      lineWidth: 4.0,
      endArrow: true,
      arrowSize: 12,
    });
    this.curve = bezier;
  }

  public getTransitionDrawingAnimation() {
    const attrs = ["opacity", "end"] as const;
    const transitions: SignalGenerator<number, number>[] = [];
    for (const key of attrs) {
      transitions.push(this.curve[key](0.0, 0.0).to(1.0, 1, easeInOutCubic));
    }
    return all(...transitions);
  }
}

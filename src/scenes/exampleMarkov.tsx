import { makeScene2D } from "@motion-canvas/2d";
import { all, sequence, Vector2, waitFor } from "@motion-canvas/core";
import { MarkovState } from "../../srcMcbb/markov/state";
import { MarkovTransition } from "../../srcMcbb/markov/transition";
import { Matrix } from "../../srcMcbb/matrix";

export default makeScene2D(function* (view) {
  view.fill("#121212");

  const s1 = new MarkovState("S_1");
  const s2 = new MarkovState("S_2");
  const s3 = new MarkovState("S_3");

  s1.layout.position(new Vector2(-200, 0));
  s2.layout.position(new Vector2(200, 0));
  s3.layout.position(new Vector2(0, 300));
  view.add(s1.layout);
  view.add(s2.layout);
  view.add(s3.layout);

  const t1to2 = new MarkovTransition(s1, s2, {
    anchorSource: "topRight",
    anchorEnd: "left",
  });
  const t1to1 = new MarkovTransition(s1, s1);
  const t2to1 = new MarkovTransition(s2, s1, {
    anchorSource: "bottomLeft",
    anchorEnd: "right",
  });
  const t1to3 = new MarkovTransition(s1, s3, {
    anchorSource: "top",
    anchorEnd: "top",
  });
  const t3to2 = new MarkovTransition(s3, s2, {
    anchorSource: "left",
    anchorEnd: "bottom",
  });

  const allTransitions = [t1to2, t2to1, t1to1, t1to3, t3to2];
  allTransitions.forEach((a) => {
    a.curve.opacity(0.0);
    view.add(a.curve);
  });
  const transitionAnimations = allTransitions.map((a) =>
    a.getTransitionDrawingAnimation(),
  );
  yield* sequence(1 / 4, ...transitionAnimations);

  const matrixVals = [
    [5, 2, 1],
    [2, 3, 1],
    [4, 2, 3],
  ];
  const matrixObj = new Matrix(matrixVals, "white");

  view.add(matrixObj.completeLayout);
  yield* all(
    matrixObj.completeLayout.opacity(0.0, 0.0).to(0.5, 0.333).to(1.0, 1.0),
    matrixObj.completeLayout
      .position(new Vector2(0, 0), 0.0)
      .to(new Vector2(600, 400), 1.0),
  );
  yield* waitFor(2.0);
});

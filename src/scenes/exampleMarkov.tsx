import { makeScene2D } from "@motion-canvas/2d";
import { Vector2 } from "@motion-canvas/core";
import { MarkovState } from "../../srcMcbb/markov/state";
import { MarkovTransition } from "../../srcMcbb/markov/transition";

export default makeScene2D(function* (view) {
  view.fill("#121212");

  const s1 = new MarkovState("S_1");
  const s2 = new MarkovState("S_2");

  s1.layout.position(new Vector2(-200, 0));
  s2.layout.position(new Vector2(200, 0));
  view.add(s1.layout);
  view.add(s2.layout);

  const transition = new MarkovTransition(s1, s2);
  view.add(transition.curve);
  yield* transition.getTransitionDrawingAnimation();

  const autoTransition = new MarkovTransition(s1, s1);
  view.add(autoTransition.curve);
  yield* autoTransition.getTransitionDrawingAnimation();
});

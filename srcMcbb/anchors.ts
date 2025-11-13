import { Vector2 } from "@motion-canvas/core";

export type Anchor =
  | "top"
  | "topRight"
  | "right"
  | "bottomRight"
  | "bottom"
  | "bottomLeft"
  | "left"
  | "topLeft";

export const anchorVectorMapping: Record<Anchor, Vector2> = {
  top: new Vector2(0, -1),
  topRight: new Vector2(1, -1).normalized,
  right: new Vector2(1, 0),
  bottomRight: new Vector2(-1, 1).normalized,
  bottom: new Vector2(0, 1),
  bottomLeft: new Vector2(-1, 1).normalized,
  left: new Vector2(-1, 0),
  topLeft: new Vector2(-1, -1).normalized,
};

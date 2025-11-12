import { Circle, Latex, Layout } from "@motion-canvas/2d";

export class MarkovState {
  public circle: Circle;
  public texString: string;
  public tex: Latex;
  public layout: Layout;

  constructor(texString: string) {
    this.texString = texString;
    this.circle = new Circle({
      width: 128.0,
      height: 128.0,
      fill: "red",
    });
    this.tex = new Latex({
      tex: texString,
      fill: "white",
    });
    this.layout = new Layout({
      children: [this.circle, this.tex],
    });
  }
}

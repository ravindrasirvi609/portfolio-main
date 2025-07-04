declare module "three-globe" {
  import { Object3D } from "three";
  export default class ThreeGlobe extends Object3D {
    globeImageUrl(url: string): this;
    atmosphereColor(color: string): this;
    atmosphereAltitude(altitude: number): this;
    hexPolygonsData(data: any[]): this;
    hexPolygonResolution(res: number): this;
    hexPolygonMargin(margin: number): this;
    hexPolygonColor(fn: (e: any) => string): this;
    clone(): this;
  }
}
declare module "three/examples/jsm/controls/OrbitControls";

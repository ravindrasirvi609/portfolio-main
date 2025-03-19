declare module "three-globe" {
  import { Object3D } from "three";

  export default class ThreeGlobe extends Object3D {
    globeMaterial(): any;
    hexPolygonsData(data: any): this;
    hexPolygonResolution(resolution: number): this;
    hexPolygonMargin(margin: number): this;
    showAtmosphere(show: boolean): this;
    atmosphereColor(color: string): this;
    atmosphereAltitude(altitude: number): this;
    hexPolygonColor(callback: (d: any) => string): this;
    arcsData(data: any[]): this;
    arcStartLat(callback: (d: any) => number): this;
    arcStartLng(callback: (d: any) => number): this;
    arcEndLat(callback: (d: any) => number): this;
    arcEndLng(callback: (d: any) => number): this;
    arcColor(callback: (d: any) => string): this;
    arcAltitude(callback: (d: any) => number): this;
    arcStroke(callback: (d: any) => number): this;
    arcDashLength(length: number): this;
    arcDashInitialGap(callback: (d: any) => number): this;
    arcDashGap(gap: number): this;
    arcDashAnimateTime(callback: (d: any) => number): this;
    pointsData(data: any[]): this;
    pointColor(callback: (d: any) => string): this;
    pointsMerge(merge: boolean): this;
    pointAltitude(altitude: number): this;
    pointRadius(radius: number): this;
    ringsData(data: any[]): this;
    ringColor(callback: (d: any) => (t: number) => string): this;
    ringMaxRadius(radius: number): this;
    ringPropagationSpeed(speed: number): this;
    ringRepeatPeriod(period: number): this;
  }
}

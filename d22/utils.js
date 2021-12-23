"use strict";

export const getMinMaxAsArray = (cuboid) => [cuboid.xMax, cuboid.xMin, cuboid.yMax, cuboid.yMin, cuboid.zMax, cuboid.zMin]


export class Cuboid{
    constructor(xRange, yRange, zRange, status = true){
        this.xMin = xRange[0];
        this.xMax = xRange[1];
        this.yMin = yRange[0];
        this.yMax = yRange[1];
        this.zMin = zRange[0];
        this.zMax = zRange[1];
        this.status = status;
    }

    volume(){
        return ((1 + this.xMax - this.xMin) * (1 + this.yMax - this.yMin) * (1 + this.zMax - this.zMin));
    }

    isOverlapping(otherCuboid){
        return otherCuboid.xMin <= this.xMax && this.xMin <=  otherCuboid.xMax
            && otherCuboid.yMin <= this.yMax && this.yMin <=  otherCuboid.yMax
            && otherCuboid.zMin <= this.zMax && this.zMin <=  otherCuboid.zMax;
    }

    splitCuboid(cuttingCuboid){
        let splitCuboids = [];
        if (cuttingCuboid.xMin > this.xMin){
            splitCuboids.push(new Cuboid([this.xMin, cuttingCuboid.xMin - 1], [this.yMin, this.yMax], [this.zMin, this.zMax]))
        }
        if (cuttingCuboid.xMax < this.xMax){
            splitCuboids.push(new Cuboid([cuttingCuboid.xMax + 1, this.xMax], [this.yMin, this.yMax], [this.zMin, this.zMax]))
        }

        let middleXRange = [Math.max(this.xMin, cuttingCuboid.xMin), Math.min(this.xMax, cuttingCuboid.xMax)];
        if (cuttingCuboid.yMin > this.yMin){
            splitCuboids.push(new Cuboid(middleXRange, [this.yMin, cuttingCuboid.yMin - 1], [this.zMin, this.zMax]));
        }
        if (cuttingCuboid.yMax < this.yMax){
            splitCuboids.push(new Cuboid(middleXRange, [cuttingCuboid.yMax + 1, this.yMax], [this.zMin, this.zMax]));
        }

        let middleYRange = [Math.max(this.yMin, cuttingCuboid.yMin), Math.min(this.yMax, cuttingCuboid.yMax)];
        if (cuttingCuboid.zMin > this.zMin){
            splitCuboids.push(new Cuboid(middleXRange, middleYRange, [this.zMin, cuttingCuboid.zMin - 1]));
        }
        if (cuttingCuboid.zMax < this.zMax){
            splitCuboids.push(new Cuboid(middleXRange, middleYRange, [cuttingCuboid.zMax + 1, this.zMax]));
        }

        return splitCuboids;
    }
}
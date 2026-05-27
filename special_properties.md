# Special Properties Handling in Voxel-Box

This document describes how to implement Sandboxels-specific properties within the Voxel-Box material system.

## 1. stain
- **Property**: `stain: number (0-1)`
- **Effect**: Probability per tick to tint the color of a neighboring cell.
- **Implementation**:
  ```javascript
  if (material.stain > 0 && rng() < material.stain) {
    applyTemporaryColorTint(neighborX, neighborY, material.color);
  }
  ```

## 2. burnInto
- **Property**: `burnInto: MAT.ID`
- **Effect**: Determines what a material becomes after it has finished burning.
- **Example**: Wood `burnInto` Charcoal.
- **Implementation**: When `temp >= ignitePoint` and the material is flammable, start a burn timer. When the timer expires, replace the cell with the `burnInto` material (or `ASH` if none specified).

## 3. fireColor
- **Property**: `fireColor: '#hexcode'`
- **Effect**: Overrides the default fire rendering color for that specific element.
- **Implementation**: The `renderer.jsx` should check for `fireColor` property when the cell state is 4 (FIRE).

## 4. hidden
- **Property**: `hidden: boolean`
- **Effect**: Excludes the material from the default UI palette.
- **Implementation**: The sidebar UI component should filter out materials where `hidden: true` unless "Cheat Mode" or "Debug Mode" is enabled.

## 5. conduct (Electrical)
- **Property**: `electricalConductivity: number (0-1)`
- **Effect**: Determines how easily electricity (state 5) passes through the material.
- **Scale**:
  - `1.0`: Superconductor (Metals like Copper, Silver)
  - `0.5-0.8`: Wet materials, impure Water
  - `0.0`: Insulator (Glass, Plastic, Wood)

## 6. sandbucketMovable
- **Property**: `sandbucketMovable: boolean`
- **Effect**: Determines if the material can be picked up or manipulated by standard player tools.
- **Implementation**: Check this flag in the tool interaction logic.

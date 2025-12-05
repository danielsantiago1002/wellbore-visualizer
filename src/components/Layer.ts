import {
  GridLayer,
  WellborepathLayer,
  CalloutCanvasLayer,
  PixiRenderApplication,
  IntersectionReferenceSystem,
  Controller,
  SchematicLayer,
} from '@equinor/esv-intersection';

import type {
  Annotation,
  SchematicLayerOptions,
  InternalLayerOptions,
  Perforation,
  SchematicData,
  CasingOptions,
} from '@equinor/esv-intersection';

import type { IRendererOptionsAuto } from 'pixi.js';
import { createLayerContainer, createRootContainer } from './utils';
import { exampleData } from './data/data.ts';

export const intersection = (dimensions: { width: number; height: number }) => {
  const xBounds: [number, number] = [0, 1000];
  const yBounds: [number, number] = [0, 1000];

  const scaleOptions = { xBounds, yBounds };

  return renderIntersection(scaleOptions, dimensions);
};

const renderIntersection = (
  scaleOptions: any,
  dimensions: { width: number; height: number }
) => {
  const axisOptions = {
    xLabel: 'Displacement',
    yLabel: 'TVD MSL',
    unitOfMeasure: 'm',
  };

  const width = dimensions.width;
  const height = dimensions.height;

  // helper container elements
  const root = createRootContainer(width);
  const container = createLayerContainer(width, height);
  const [path, completion, casings, holeSizes, cement, cementSqueezes] =
    exampleData as any;

  const referenceSystem = new IntersectionReferenceSystem(path);
  referenceSystem.offset = path[0][2]; // Offset should be md at start of path

  casings[0]['hasShoe'] = false;
  const pixiContext2 = new PixiRenderApplication({
    width,
    height,
  } as IRendererOptionsAuto);

  // Instantiate layers
  const gridLayer = new GridLayer('grid', {
    majorColor: 'lightgray',
    minorColor: 'gray',
    majorWidth: 1,
    minorWidth: 0.5,
    order: 1,
    referenceSystem,
  });
  const wellboreLayer = new WellborepathLayer('wellborepath', {
    order: 3,
    strokeWidth: '2px',
    stroke: 'red',
    referenceSystem,
  });

  const CSDSVGs = {
    completionSymbol1:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMCAwSDkwVjEwMEgxMFYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMCAyNUgxMFY3NUgwVjI1WiIgZmlsbD0iI0I1QjJCMiIvPgo8cGF0aCBkPSJNNDUgMjVINTVWNzVINDVWMjVaIiBmaWxsPSIjQjVCMkIyIi8+CjxwYXRoIGQ9Ik05MCAyNUgxMDBWNzVIOTBWMjVaIiBmaWxsPSIjQjVCMkIyIi8+Cjwvc3ZnPgo=',
    completionSymbol2:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNMTAgMEg5MFYxMDBIMTBWMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPC9zdmc+Cg==',
    completionSymbol3:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMCAwSDkwVjEwMEgxMFYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMCAyNUgxMFY3NUgwVjI1WiIgZmlsbD0iI0I1QjJCMiIvPgo8cGF0aCBkPSJNNDUgMjVINTVWNzVINDVWMjVaIiBmaWxsPSIjQjVCMkIyIi8+CjxwYXRoIGQ9Ik0yNSA2NUgzMFY4MEgyNVY2NVoiIGZpbGw9IiMzMTMxMzEiLz4KPHBhdGggZD0iTTI1IDQySDMwVjU3SDI1VjQyWiIgZmlsbD0iIzMxMzEzMSIvPgo8cGF0aCBkPSJNMjUgMjFIMzBWMzZIMjVWMjFaIiBmaWxsPSIjMzEzMTMxIi8+CjxwYXRoIGQ9Ik03MCA2NEg3NVY3OUg3MFY2NFoiIGZpbGw9IiMzMTMxMzEiLz4KPHBhdGggZD0iTTcwIDQxSDc1VjU2SDcwVjQxWiIgZmlsbD0iIzMxMzEzMSIvPgo8cGF0aCBkPSJNNzAgMjBINzVWMzVINzBWMjBaIiBmaWxsPSIjMzEzMTMxIi8+CjxwYXRoIGQ9Ik05MCAyNUgxMDBWNzVIOTBWMjVaIiBmaWxsPSIjQjVCMkIyIi8+Cjwvc3ZnPgo=',
  };

  const completionSymbols = [
    {
      kind: 'completionSymbol',
      id: 'completion-svg-1',
      start: 5250,
      end: 5252,
      diameter: 8.5,
      symbolKey: 'completionSymbol1',
    },
    {
      kind: 'completionSymbol',
      id: 'completion-svg-2',
      start: 5252,
      end: 5274,
      diameter: 8.5,
      symbolKey: 'completionSymbol2',
    },
    {
      kind: 'completionSymbol',
      id: 'completion-svg-3',
      start: 5274,
      end: 5276,
      diameter: 8.5,
      symbolKey: 'completionSymbol3',
    },
  ];

  const pAndASVGs = {
    mechanicalPlug:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMSAxSDk5Vjk5SDFWMVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl81MF81KSIvPgo8cGF0aCBkPSJNMSAxSDk5Vjk5SDFWMVoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl81MF81KSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPHBhdGggZD0iTTEgMUg5OVY5OUgxVjFaIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjEuNzEwNzIiIHkxPSIxLjI5NjUzIiB4Mj0iOTguNzEwNyIgeTI9Ijk5LjI5NjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB4MT0iOTguNzA3MSIgeTE9IjAuNzA3MTA3IiB4Mj0iMC43MDcxIiB5Mj0iOTguNzA3MSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNTBfNSIgeDE9IjAiIHkxPSI1MCIgeDI9IjUwIiB5Mj0iNTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0NDMjYyNiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjQ3MUEiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzUwXzUiIHgxPSI1MCIgeTE9IjUwIiB4Mj0iMTAwIiB5Mj0iNTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGNDcxQSIvPgo8c3RvcCBvZmZzZXQ9IjAuOTk5OSIgc3RvcC1jb2xvcj0iI0NDMjYyNiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjQ3MUEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
  };

  const pAndASymbols = [
    {
      kind: 'pAndASymbol' as const,
      id: 'mechanical-plug-1',
      start: 5100,
      end: 5110,
      diameter: 8.5,
      symbolKey: 'mechanicalPlug',
    },
    {
      kind: 'cementPlug' as const,
      id: 'cement-plug-2',
      start: 5000,
      end: 5110,
      referenceIds: ['casing-07'],
    },
  ];

  const perforations: Perforation[] = [
    {
      kind: 'perforation',
      subKind: 'Perforation',
      id: 'PerforationDemo1',
      start: 4000,
      end: 4500,
      isOpen: true,
    },
    {
      kind: 'perforation',
      subKind: 'Cased hole frac pack',
      id: 'PerforationDemo2',
      start: 3500,
      end: 4500,
      isOpen: true,
    },
  ];

  const schematicData: SchematicData = {
    holeSizes,
    cements: cement,
    casings,
    completion: [...completion, ...completionSymbols],
    pAndA: [...pAndASymbols, ...cementSqueezes],
    perforations,
    symbols: { ...CSDSVGs, ...pAndASVGs },
  };

  const internalLayerIds: InternalLayerOptions = {
    holeLayerId: 'hole-id',
    casingLayerId: 'casing-id',
    completionLayerId: 'completion-id',
    cementLayerId: 'cement-id',
    pAndALayerId: 'pAndA-id',
    perforationLayerId: 'perforation-id',
  };

  const customCasingOptions: CasingOptions = {
    solidColor: '#dcdcdc',
    lineColor: '#575757',
    shoeSize: {
      width: 8,
      length: 12,
    },
    windowOptions: {
      dashColor: '#dc0000',
      dashLength: 5,
      spaceLength: 3,
    },
  };

  const schematicLayerOptions: SchematicLayerOptions<SchematicData> = {
    order: 5,
    referenceSystem,
    internalLayerOptions: internalLayerIds,
    data: schematicData,
    exaggerationFactor: 5,
    casingOptions: customCasingOptions,
  };

  const schematicLayer = new SchematicLayer(
    pixiContext2,
    'schematic-webgl-layer',
    schematicLayerOptions
  );
  const calloutLayer = new CalloutCanvasLayer<Annotation[]>('callout', {
    minFontSize: 14,
    maxFontSize: 14,
    order: 100,
    data: [
      {
        title: 'Wellhead',
        label: 'Wellhead at surface',
        color: '#212529',
        group: 'wellhead',
        md: 0,
      },
      {
        title: 'Kickoff point',
        label: 'Kickoff point at md 240m',
        color: '#212529',
        group: 'KOP',
        md: 240,
      },
      {
        title: 'First Perforation',
        label: 'First perforation at md 4000m',
        color: '#212529',
        group: 'Perforations',
        md: 4000,
      },
      {
        title: 'Last Perforation',
        label: 'Last perforation at md 4500m',
        color: '#212529',
        group: 'Perforations',
        md: 4500,
      },
      {
        title: 'Total Depth',
        label: 'Total depth at md 6000m',
        color: '#212529',
        group: 'TD',
        md: 6000,
      },
      {
        title: 'Top of Cement 1',
        label: "Top of Cement for casing 'casing-01' at md 143m",
        color: '#212529',
        group: 'Cement Tops',
        md: 143,
      },
      {
        title: 'Cement Plug',
        label: "Cement plug for casing 'casing-07' from md 5000m to 5110m",
        color: '#212529',
        group: 'P&A',
        md: 5000,
      },
      {
        title: 'Casing Shoe',
        label: "Casing shoe for casing 'casing-03' at md 2607m",
        color: '#212529',
        group: 'Casing Shoes',
        md: 2607,
      },
      {
        title: 'Casing Shoe',
        label: "Casing shoe for casing 'casing-02' at md 1389m",
        color: '#212529',
        group: 'Casing Shoes',
        md: 1389,
      },
    ] as Annotation[],
    referenceSystem,
  });

  const layers = [gridLayer, wellboreLayer, schematicLayer, calloutLayer];

  const opts = {
    scaleOptions,
    axisOptions,
    container,
    referenceSystem,
  };

  const controller = new Controller({ layers, ...opts });
  controller.setXAxisOffset(10);
  controller.setYAxisOffset(10);

  controller.adjustToSize(width, height);
  controller.setViewport(1000, 1000, 6000);
  controller.zoomPanHandler.zFactor = 1;

  root.appendChild(container);
  return root;
};

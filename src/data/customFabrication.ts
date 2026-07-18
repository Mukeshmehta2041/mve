import { ASSETS } from '../lib/assets';

export interface FabricationCategory {
  id: string;
  name: string;
  desc: string;
  icon: string;
  productSlug?: string;
}

export interface CustomizationParameter {
  label: string;
  explanation: string;
  icon: string;
}

export interface FabricationMaterial {
  name: string;
  type: string;
  desc: string;
}

export interface FabricationProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

export interface FabricationQualityCheck {
  title: string;
  description: string;
  icon: string;
}

export const customCategoriesData: FabricationCategory[] = [
  {
    id: 'cat-1',
    name: 'Process Storage Tanks',
    desc: 'Mild steel and stainless steel storage vessels custom-sized for liquids, chemical loads, and petroleum bulk storage.',
    icon: ASSETS.productIcons.storageTank,
    productSlug: 'storage-tank',
  },
  {
    id: 'cat-2',
    name: 'Industrial Reaction Vessels',
    desc: 'Heavy kettles and jacketed reactors engineered for chemical blending, resin fabrication, and high-temperature processing.',
    icon: ASSETS.productIcons.resinGlueKettle,
    productSlug: 'resin-glue-kettle',
  },
  {
    id: 'cat-3',
    name: 'Material Handling Hoppers',
    desc: 'Pyramidal, square-to-round, or conical gravity feed bins designed for granular solids, sand, and aggregate dosing.',
    icon: ASSETS.productIcons.hopper,
    productSlug: 'hopper',
  },
  {
    id: 'cat-4',
    name: 'Venting & Exhaust Chimneys',
    desc: 'Self-supporting or guy-wired boiler stacks fabricated in sections for heat-resistant exhaust venting.',
    icon: ASSETS.productIcons.industrialChimney,
    productSlug: 'industrial-chimney',
  },
  {
    id: 'cat-5',
    name: 'Safety Height Barriers',
    desc: 'Heavy-duty structural portal frames built to protect railway OHE lines and low underpasses from overhead impact.',
    icon: ASSETS.productIcons.railwayHeightGauge,
    productSlug: 'railway-height-gauge',
  },
  {
    id: 'cat-6',
    name: 'Concrete Shuttering Work',
    desc: 'Stiffened steel formwork plates and columns designed to sustain concrete pouring hydrostatic pressure.',
    icon: ASSETS.productIcons.shutteringPlate,
    productSlug: 'shuttering-plate',
  },
  {
    id: 'cat-7',
    name: 'Custom Structural Assemblies',
    desc: 'Platform channels, heavy framing, mounting skids, and support columns fabricated exactly to custom drawing parameters.',
    icon: ASSETS.icons.construction,
  },
];

export const customizationParametersData: CustomizationParameter[] = [
  {
    label: 'Engineering Blueprints',
    explanation: 'We fabricate components directly matching user-provided layout designs or structural blueprints.',
    icon: ASSETS.icons.fileText,
  },
  {
    label: 'Shell Dimensions',
    explanation: 'Height, diameter, and width parameters customized to fit your specific workshop clearances or site restrictions.',
    icon: ASSETS.icons.ruler,
  },
  {
    label: 'Target Volume Capacity',
    explanation: 'Custom volumetric ranges built according to fluid loads and daily operational demands.',
    icon: ASSETS.icons.droplet,
  },
  {
    label: 'Jackets & Heating',
    explanation: 'Jacket types (limpet coil or double jacket) and nozzle ports aligned with target temperature profiles.',
    icon: ASSETS.icons.gear,
  },
  {
    label: 'Surface Protection',
    explanation: 'Selection of anti-rust red-oxide primers, epoxy paint systems, or hot-dip galvanization finishing.',
    icon: ASSETS.icons.wrench,
  },
  {
    label: 'Structural Supports',
    explanation: 'Heavy-duty structural legs, guy-wire anchors, baseplates, or platform beams integrated directly.',
    icon: ASSETS.icons.hardHat,
  },
];

export const fabricationMaterialsData: FabricationMaterial[] = [
  {
    name: 'Mild Steel (MS)',
    type: 'IS 2062 Structural Steel',
    desc: 'Ideal for structural assemblies, material bins, shuttering plates, height barriers, and standard industrial containment.',
  },
  {
    name: 'Stainless Steel (SS)',
    type: 'SS304 & SS316 Food/Chemical Grades',
    desc: 'Used for chemical reaction vessels, processing kettles, and storage tanks requiring high corrosion resistance.',
  },
];

export const customFabricationProcessSteps: FabricationProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Share Requirement',
    description: 'Provide basic dimension limits, hand sketches, or complete engineering drawing files.',
    icon: ASSETS.icons.users,
  },
  {
    stepNumber: 2,
    title: 'Drawing Verification',
    description: 'Technicians inspect layout dimensions and check raw specs for fabrication feasibility.',
    icon: ASSETS.icons.fileText,
  },
  {
    stepNumber: 3,
    title: 'Technical Review',
    description: 'Confirm material grades, jacket layers, nozzle parameters, and operational loads.',
    icon: ASSETS.icons.gear,
  },
  {
    stepNumber: 4,
    title: 'Scope & Proposal',
    description: 'Receive an itemized quote detailing cost, raw weights, finishing coats, and delivery dates.',
    icon: ASSETS.icons.certificate,
  },
  {
    stepNumber: 5,
    title: 'Precision Fabrication',
    description: 'Execution of steel cutting, rolling, shaping, and structural welding under quality audit.',
    icon: ASSETS.icons.wrench,
  },
  {
    stepNumber: 6,
    title: 'Site Delivery & Setup',
    description: 'Pan-India logistics dispatch with transit safety checks and optional alignment assistance.',
    icon: ASSETS.icons.truck,
  },
];

export const fabricationQualityChecksData: FabricationQualityCheck[] = [
  {
    title: 'Drawing Match Review',
    description: 'Confirming fabrication matches the critical layout clearances and client drawing blueprints.',
    icon: ASSETS.icons.fileText,
  },
  {
    title: 'Steel Plate Verification',
    description: 'Inspecting incoming steel plates for thickness consistency and raw surface defects before rolling.',
    icon: ASSETS.icons.shieldCheck,
  },
  {
    title: 'Seam Weld Checks',
    description: 'Visual checks of core weld seam profiles, checking root run execution for high structural integrity.',
    icon: ASSETS.icons.wrench,
  },
  {
    title: 'Dimensional Tolernaces',
    description: 'Strict checks of outlet flange alignments, axis orientations, and overall layout heights.',
    icon: ASSETS.icons.ruler,
  },
  {
    title: 'Hydrostatic Leak Audit',
    description: 'Subjecting containment tanks and vessels to static water fill checks to ensure zero joint leakage.',
    icon: ASSETS.icons.droplet,
  },
  {
    title: 'DFT Protective Coats Check',
    description: 'Measuring primer and industrial epoxy dry film thickness (DFT) to verify anti-rust paint life.',
    icon: ASSETS.icons.check,
  },
];

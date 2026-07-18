// Statically import all assets so that Vite resolves and bundles them properly

// Branding
import logoHomeConcept from '../assets/images/branding/logo-home-concept.png';
import logoDarkHeader from '../assets/images/branding/logo-dark-header.png';

// Heros
import homeHero from '../assets/images/hero/home-industrial-hero.jpg';
import aboutHero from '../assets/images/hero/about-industrial-hero.jpg';
import productsHero from '../assets/images/hero/products-industrial-hero.jpg';
import fabricationHero from '../assets/images/hero/custom-fabrication-hero.jpg';
import projectsHero from '../assets/images/hero/projects-industrial-hero.jpg';
import qualityHero from '../assets/images/hero/quality-welding-hero.jpg';
import quoteHero from '../assets/images/hero/quote-page-industrial-background.jpg';

// Facilities
import companyBuilding from '../assets/images/facilities/company-building.jpg';
import factoryBuildingHome from '../assets/images/facilities/factory-building-home.jpg';
import manufacturingFacility from '../assets/images/facilities/manufacturing-facility.jpg';

// Products
import resinGlueKettle from '../assets/images/products/resin-glue-kettle.jpg';
import storageTank from '../assets/images/products/storage-tank.jpg';
import shutteringPlate from '../assets/images/products/shuttering-plate.jpg';
import hopper from '../assets/images/products/hopper.jpg';
import industrialChimney from '../assets/images/products/industrial-chimney.jpg';
import hotWaterGenerator from '../assets/images/products/hot-water-generator.jpg';
import railwayHeightGauge from '../assets/images/products/railway-height-gauge.jpg';
import storageTankMain from '../assets/images/products/storage-tank-main.jpg';

// Fabrication
import productsWeldingBanner from '../assets/images/fabrication/products-page-welding-banner.jpg';
import homeWeldingBanner from '../assets/images/fabrication/home-welding-banner.jpg';
import materialsMetalPipes from '../assets/images/fabrication/materials-metal-pipes.jpg';
import fabricationWelding from '../assets/images/fabrication/fabrication-welding.jpg';
import qualityInspection from '../assets/images/fabrication/quality-inspection.jpg';

// Projects
import projectReactorVessel from '../assets/images/projects/fabrication-custom-reactor-vessel.jpg';
import projectStorageTank from '../assets/images/projects/fabrication-storage-tank.jpg';
import projectHopperConveyor from '../assets/images/projects/fabrication-hopper-screw-conveyor.jpg';
import projectFeaturedBitumen from '../assets/images/projects/featured-bitumen-storage.jpg';

// Quality Process
import qualityMaterialInspection from '../assets/images/quality/material-inspection.jpg';
import qualityWeldingChecks from '../assets/images/quality/welding-checks.jpg';
import qualityDimensionalChecks from '../assets/images/quality/dimensional-checks.jpg';
import qualityTesting from '../assets/images/quality/testing.jpg';

// Reusable SVG Icons are represented as React components or loaded from assets
import iconSearch from '../assets/icons/general/search.svg';
import iconChevronDown from '../assets/icons/general/chevron-down.svg';
import iconHardHat from '../assets/icons/general/hard-hat.svg';
import iconFileText from '../assets/icons/general/file-text.svg';
import iconDroplet from '../assets/icons/general/droplet.svg';
import iconCertificate from '../assets/icons/general/certificate.svg';
import iconArrowRight from '../assets/icons/general/arrow-right.svg';
import iconExperience from '../assets/icons/general/experience.svg';
import iconRuler from '../assets/icons/general/ruler.svg';
import iconFactory from '../assets/icons/general/factory.svg';
import iconCheck from '../assets/icons/general/check.svg';
import iconFlask from '../assets/icons/general/flask.svg';
import iconEmail from '../assets/icons/general/email.svg';
import iconGear from '../assets/icons/general/gear.svg';
import iconZoomIn from '../assets/icons/general/zoom-in.svg';
import iconRail from '../assets/icons/general/rail.svg';
import iconTruck from '../assets/icons/general/truck.svg';
import iconWhatsapp from '../assets/icons/general/whatsapp.svg';
import iconConstruction from '../assets/icons/general/construction.svg';
import iconWrench from '../assets/icons/general/wrench.svg';
import iconClock from '../assets/icons/general/clock.svg';
import iconPhone from '../assets/icons/general/phone.svg';
import iconMapPin from '../assets/icons/general/map-pin.svg';
import iconUpload from '../assets/icons/general/upload.svg';
import iconMenu from '../assets/icons/general/menu.svg';
import iconShieldCheck from '../assets/icons/general/shield-check.svg';
import iconUsers from '../assets/icons/general/users.svg';

// Product Category Icons
import prodIconGauge from '../assets/icons/products/railway-height-gauge.svg';
import prodIconTank from '../assets/icons/products/storage-tank.svg';
import prodIconChimney from '../assets/icons/products/industrial-chimney.svg';
import prodIconGenerator from '../assets/icons/products/hot-water-generator.svg';
import prodIconPlate from '../assets/icons/products/shuttering-plate.svg';
import prodIconKettle from '../assets/icons/products/resin-glue-kettle.svg';
import prodIconHopper from '../assets/icons/products/hopper.svg';

export const ASSETS = {
  branding: {
    logoHome: logoHomeConcept,
    logoDarkHeader: logoDarkHeader,
  },
  hero: {
    home: homeHero,
    about: aboutHero,
    products: productsHero,
    fabrication: fabricationHero,
    projects: projectsHero,
    quality: qualityHero,
    quote: quoteHero,
  },
  facilities: {
    companyBuilding,
    factoryHome: factoryBuildingHome,
    manufacturing: manufacturingFacility,
  },
  products: {
    resinGlueKettle,
    storageTank,
    shutteringPlate,
    hopper,
    industrialChimney,
    hotWaterGenerator,
    railwayHeightGauge,
    storageTankMain,
  },
  fabrication: {
    productsBanner: productsWeldingBanner,
    homeBanner: homeWeldingBanner,
    materialsPipes: materialsMetalPipes,
    welding: fabricationWelding,
    inspection: qualityInspection,
  },
  projects: {
    reactorVessel: projectReactorVessel,
    storageTank: projectStorageTank,
    hopperConveyor: projectHopperConveyor,
    featuredBitumen: projectFeaturedBitumen,
  },
  quality: {
    materialInspection: qualityMaterialInspection,
    weldingChecks: qualityWeldingChecks,
    dimensionalChecks: qualityDimensionalChecks,
    testing: qualityTesting,
  },
  icons: {
    search: iconSearch,
    chevronDown: iconChevronDown,
    hardHat: iconHardHat,
    fileText: iconFileText,
    droplet: iconDroplet,
    certificate: iconCertificate,
    arrowRight: iconArrowRight,
    experience: iconExperience,
    ruler: iconRuler,
    factory: iconFactory,
    check: iconCheck,
    flask: iconFlask,
    email: iconEmail,
    gear: iconGear,
    zoomIn: iconZoomIn,
    rail: iconRail,
    truck: iconTruck,
    whatsapp: iconWhatsapp,
    construction: iconConstruction,
    wrench: iconWrench,
    clock: iconClock,
    phone: iconPhone,
    mapPin: iconMapPin,
    upload: iconUpload,
    menu: iconMenu,
    shieldCheck: iconShieldCheck,
    users: iconUsers,
  },
  productIcons: {
    railwayHeightGauge: prodIconGauge,
    storageTank: prodIconTank,
    industrialChimney: prodIconChimney,
    hotWaterGenerator: prodIconGenerator,
    shutteringPlate: prodIconPlate,
    resinGlueKettle: prodIconKettle,
    hopper: prodIconHopper,
  },
} as const;

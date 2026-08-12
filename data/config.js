/**
 * ROVAR - Central Configuration File
 * Single source of truth for product sizes, packaging formats, and options.
 * Edit this file to update product sizing and details across the entire website.
 */

window.ROVAR_CONFIG = {
  // Product Sizes
  sizes: {
    // Hotel Soaps
    soaps: {
      title: "Available Sizing Options",
      list: ["10g", "12g", "15g", "20g", "25g", "30g", "40g", "50g"],
      note: "Custom formulations, shapes, and weights can be custom manufactured for bulk hotel partners."
    },
    // Bath & Body Care
    bathBody: {
      title: "Available Packaging Formats",
      list: [
        "Guest Bottles (20ml, 25ml, 30ml, 35ml, 50ml)",
        "Guest Tubes (20ml, 25ml, 30ml, 35ml, 50ml)",
        "Dispenser Bottles (200ml, 250ml, 300ml, 500ml)",
        "Refill Cans (5 Litres)"
      ],
      note: "All formulations can be customized with specific fragrance profiles and packaging materials depending on B2B requirements."
    },
    // Guest Room Essentials
    essentials: {
      title: "Packaging Options",
      list: [
        "Standard Recycled Paper Boxes",
        "Wheat Straw / Eco-friendly Boxes",
        "Minimalist Kraft Paper Sleeves",
        "Compostable Corn-starch Pouches"
      ],
      note: "Amenities can be supplied individually or pre-packed into custom guest kits with hotel branding."
    },
    // Hotel Slippers
    slippers: {
      title: "Sizing & Construction Specs",
      list: [
        "Standard Unisex Length: 27cm (10.5 inches)",
        "Large Unisex Length: 29cm (11.5 inches)",
        "Sole Thickness: 3mm, 4mm, 5mm, 6mm",
        "Sole Materials: EVA Sole, Anti-slip Rubber Dotted Sole",
        "Styles: Closed-toe, Open-toe, Waffle-pattern, Terry-towel"
      ],
      note: "Slippers can be customized with printed, embroidered, or embossed logo branding."
    }
  },

  // Fragrances for Bath & Body Care
  fragrances: [
    "Black Orchid & Lavender",
    "Japanese Cherry Blossom",
    "Peach & Avocado",
    "Patchouli & Macadamia",
    "Lemongrass & Wild Mint",
    "White Musk",
    "Aqua Fresh"
  ]
};

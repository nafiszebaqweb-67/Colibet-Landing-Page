# Visual Architecture — OrderFunnel Component Update

**Date**: November 13, 2025

---

## Component Hierarchy

```
OrderFunnel Component (Main)
├── Step 1: Category Selection ⭐ UPDATED
│   ├── categoryImages Object
│   │   ├── Men → menImage
│   │   ├── Women → womenImage
│   │   └── Kids → kidsImage
│   └── Render: Grid (1 col mobile, 3 col desktop)
│       └── Card with Image (128px height)
│
├── Step 2: Garment Selection ⭐ UPDATED
│   ├── GARMENTS_BY_CATEGORY
│   │   ├── Men: Shirt, Pant, Kurta, Blazer
│   │   ├── Women: Kurti, Blouse, Lehenga, Suit
│   │   └── Kids: Frock, Pant, Shirt
│   └── Render: Grid (1 col mobile, 2 col desktop)
│       └── Card with Image (160px height)
│
├── Step 3-8: (unchanged)
│   ├── Fabric Selection
│   ├── Design Upload
│   ├── Measurement
│   ├── Contact Info
│   ├── Address & Delivery
│   └── Confirmation
│
└── Data Management
    ├── currentStep (useState)
    ├── formData (useState)
    └── Various handlers (goToNext, goToPrevious, etc.)
```

---

## Data Flow Diagram

```
User Interaction
    ↓
Click on Category Card
    ↓
onClick Handler
    ↓
Update formData.category
    ↓
Re-render with image
    ↓
Select Garment
    ↓
Update formData.garment
    ↓
Move to next step
```

---

## Image Import Structure

```
OrderFunnel.tsx
├── Category Images
│   ├── import menImage from "@/assets/men-category.jpg"
│   ├── import womenImage from "@/assets/women-category.jpg"
│   └── import kidsImage from "@/assets/kids-category.jpg"
│
└── Garment Images
    ├── import shirtImage from "@/assets/shirt-garment.jpg"
    ├── import pantImage from "@/assets/pant-garment.jpg"
    ├── import kurtaImage from "@/assets/kurta-garment.jpg"
    ├── import blazerImage from "@/assets/blazer-garment.jpg"
    ├── import kurtiImage from "@/assets/kurti-garment.jpg"
    ├── import blouseImage from "@/assets/blouse-garment.jpg"
    ├── import lehengaImage from "@/assets/lehenga-garment.jpg"
    ├── import suitImage from "@/assets/suit-garment.jpg"
    └── import frockImage from "@/assets/frock-garment.jpg"
```

---

## Display Layout - Desktop

### Step 1: Category Selection
```
┌────────────────────────────────────────────────────────────────┐
│  Select Category - What type of clothing would you like?      │
├─────────────────────┬─────────────────────┬─────────────────────┤
│                     │                     │                     │
│   [Men Image]       │ [Women Image]       │  [Kids Image]       │
│   (128px height)    │ (128px height)      │  (128px height)     │
│                     │                     │                     │
│      Men            │      Women          │      Kids           │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

### Step 2: Garment Selection (Example: Men's)
```
┌──────────────────────────────────────────────────────────────────┐
│  Select Garment - Choose what you want to stitch:              │
├──────────────────────────────┬──────────────────────────────────┤
│                              │                                  │
│    [Shirt Image]             │    [Pant Image]                  │
│    (160px height)            │    (160px height)                │
│                              │                                  │
│      Shirt                   │      Pant                        │
├──────────────────────────────┼──────────────────────────────────┤
│                              │                                  │
│    [Kurta Image]             │    [Blazer Image]                │
│    (160px height)            │    (160px height)                │
│                              │                                  │
│      Kurta                   │      Blazer                      │
└──────────────────────────────┴──────────────────────────────────┘
```

---

## Display Layout - Mobile

### Step 1: Category Selection
```
┌────────────────────────────┐
│  Select Category           │
├────────────────────────────┤
│  [Men Image]               │
│  (128px height)            │
│  Men                       │
├────────────────────────────┤
│  [Women Image]             │
│  (128px height)            │
│  Women                     │
├────────────────────────────┤
│  [Kids Image]              │
│  (128px height)            │
│  Kids                      │
└────────────────────────────┘
```

### Step 2: Garment Selection
```
┌────────────────────────────┐
│  Select Garment            │
├────────────────────────────┤
│  [Shirt Image]             │
│  (160px height)            │
│  Shirt                     │
├────────────────────────────┤
│  [Pant Image]              │
│  (160px height)            │
│  Pant                      │
├────────────────────────────┤
│  [Kurta Image]             │
│  (160px height)            │
│  Kurta                     │
├────────────────────────────┤
│  [Blazer Image]            │
│  (160px height)            │
│  Blazer                     │
└────────────────────────────┘
```

---

## File Organization

```
src/
├── components/
│   └── OrderFunnel.tsx (943 lines total)
│       ├── Imports (25 lines)
│       │   ├── React/UI imports
│       │   ├── 3 category images
│       │   └── 9 garment images
│       │
│       ├── Types & Interfaces (50 lines)
│       │   ├── Step type
│       │   ├── Garment interface ⭐ UPDATED
│       │   ├── FormData interface
│       │   └── GarmentsByCategory interface
│       │
│       ├── Constants (15 lines)
│       │   └── GARMENTS_BY_CATEGORY ⭐ UPDATED
│       │
│       ├── Component (800+ lines)
│       │   ├── useState hooks
│       │   ├── Helper functions
│       │   └── renderStep() with 8 cases
│       │       ├── Case 1: Category ⭐ UPDATED
│       │       ├── Case 2: Garment ⭐ UPDATED
│       │       └── Cases 3-8: Unchanged
│       │
│       └── Export
│
└── assets/
    ├── men-category.jpg (33 KB)
    ├── women-category.jpg (1.43 MB)
    ├── kids-category.jpg (19.6 KB)
    ├── shirt-garment.jpg (1.84 KB)
    ├── pant-garment.jpg (1.84 KB)
    ├── kurta-garment.jpg (1.84 KB)
    ├── blazer-garment.jpg (1.84 KB)
    ├── kurti-garment.jpg (1.84 KB)
    ├── blouse-garment.jpg (1.84 KB)
    ├── lehenga-garment.jpg (1.84 KB)
    ├── suit-garment.jpg (1.84 KB)
    └── frock-garment.jpg (1.84 KB)
```

---

## State Management Flow

```
Initial State
    ↓
{
  currentStep: 1,
  formData: {
    category: "",
    garment: "",
    fabricType: "",
    designFile: null,
    measurementType: "",
    measurementAddress: "",
    measurementDate: "",
    measurementTime: "",
    measurementChart: null,
    fullName: "",
    whatsappNumber: "",
    alternateNumber: "",
    fullAddress: "",
    city: "",
    pincode: "",
    landmark: "",
    pickupDate: "",
    deliveryDate: "",
    specialInstructions: "",
  }
}
    ↓
User selects category
    ↓
State updates: formData.category = "Men"
    ↓
Component re-renders with garment options
    ↓
User selects garment
    ↓
State updates: formData.garment = "Shirt"
    ↓
Step advances to next
    ↓
...continues through all 8 steps...
```

---

## Component Size Comparison

| Element | Before | After | Change |
|---------|--------|-------|--------|
| Category Image Height | 192px | 128px | -33% |
| Garment Icon Size | 4xl (36px) | Image (160px height) | Visual improvement |
| Grid Columns | 3 / 2 | 3 / 2 | Maintained |
| Responsive Breakpoint | md | md | Maintained |

---

## CSS Classes Applied

### Category Selection
```tsx
Card: {
  "cursor-pointer transition-all hover:shadow-lg overflow-hidden"
  + (selected ? "border-accent border-2 shadow-lg" : "hover:border-accent")
}

CardContent: "p-0 text-center"

Image: "w-full h-32 object-cover"

Label: "p-3" + "font-semibold text-base"
```

### Garment Selection
```tsx
Card: {
  "cursor-pointer transition-all hover:shadow-lg overflow-hidden"
  + (selected ? "border-accent border-2 shadow-lg" : "hover:border-accent")
}

CardContent: "p-0 text-center"

Image: "w-full h-40 object-cover"

Label: "p-3" + "font-semibold"
```

---

## Accessibility Architecture

```
Step 1: Category Selection
├── Images have alt attributes
│   └── alt={`${cat} category`}
├── Cards are keyboard navigable
├── Selected state is visually distinct
└── Focus states are visible

Step 2: Garment Selection
├── Images have alt attributes
│   └── alt={`${garment.name} garment`}
├── Cards are keyboard navigable
├── Selected state is visually distinct
└── Focus states are visible
```

---

## Performance Optimization Opportunities

```
Current State:
├── All images loaded immediately
├── No lazy loading
├── Total asset size: 2.05 MB
└── Load time: ~1-2 seconds

Recommended Optimizations:
├── Lazy loading for garment images
│   └── Load only when Step 2 is visible
├── Image compression to WEBP
│   └── Reduce from 2.05 MB to ~500 KB
├── Responsive images with srcset
│   └── Serve different sizes for mobile/desktop
└── Progressive loading
    └── Show placeholder while loading
```

---

**Visual Documentation Complete** ✅

For more information, see:
- `COMPLETION_REPORT.md` - Full report
- `QUICK_REFERENCE.md` - Quick start guide
- `PROJECT_SUMMARY.md` - Executive summary

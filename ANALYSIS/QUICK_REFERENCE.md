# Quick Reference: OrderFunnel Image Update

**Last Updated**: November 13, 2025

---

## What Changed?

✅ **Category Selection (Step 1)**:
- Reduced image height: 192px → 128px
- Now displays smaller, more compact category cards

✅ **Garment Selection (Step 2)**:
- Replaced 9 emoji icons with product images
- Garments: Shirt, Pant, Kurta, Blazer, Kurti, Blouse, Lehenga, Suit, Frock

---

## Image Files Created

### Location: `src/assets/`

**Category Images** (existing, now with smaller display):
- `men-category.jpg`
- `women-category.jpg`
- `kids-category.jpg`

**Garment Images** (NEW):
- `shirt-garment.jpg`
- `pant-garment.jpg`
- `kurta-garment.jpg`
- `blazer-garment.jpg`
- `kurti-garment.jpg`
- `blouse-garment.jpg`
- `lehenga-garment.jpg`
- `suit-garment.jpg`
- `frock-garment.jpg`

---

## Component Updates

**File**: `src/components/OrderFunnel.tsx`

### Changes Made:

1. **Added Imports**:
   ```tsx
   import shirtImage from "@/assets/shirt-garment.jpg";
   import pantImage from "@/assets/pant-garment.jpg";
   // ... 7 more imports
   ```

2. **Updated Interface**:
   ```tsx
   interface Garment {
     name: string;
     icon: string;
     image: string;  // NEW
   }
   ```

3. **Updated Data**:
   ```tsx
   const GARMENTS_BY_CATEGORY = {
     Men: [
       { name: "Shirt", icon: "👕", image: shirtImage },
       // ...
     ],
   }
   ```

4. **Rendering (Category Selection - Step 1)**:
   - Height: 192px → 128px
   - Same responsive layout maintained

5. **Rendering (Garment Selection - Step 2)**:
   - Emoji: `<div className="text-4xl">{garment.icon}</div>`
   - Image: `<img src={garment.image} alt="..." className="w-full h-40 object-cover" />`

---

## How to Replace Placeholder Images

### Step 1: Prepare Your Images
- Category images: 400×300px
- Garment images: 300×250px
- Format: JPG or PNG

### Step 2: Replace Files
Simply overwrite the placeholder images in `src/assets/`:
- Replace `men-category.jpg` with your image
- Replace `women-category.jpg` with your image
- Replace `kids-category.jpg` with your image
- Replace `shirt-garment.jpg` with your image
- ... (etc for all garments)

### Step 3: Done!
No code changes needed. The component will automatically use your new images.

---

## Size Reference

### Category Images (Step 1)
| Desktop | Mobile |
|---------|--------|
| 3-column grid | 1 column |
| 128px height | 128px height |
| Responsive width | Full width |

### Garment Images (Step 2)
| Desktop | Mobile |
|---------|--------|
| 2-column grid | 1 column |
| 160px height | 160px height |
| Responsive width | Full width |

---

## Accessibility Features

✅ All images have descriptive alt text
✅ Images are responsive
✅ Maintains semantic HTML
✅ Selection states still work (borders, shadows)
✅ Keyboard navigation supported

---

## File Structure

```
OrderFunnel.tsx
├── Step 1: Category Selection (Uses images from categoryImages object)
├── Step 2: Garment Selection (Uses garment.image property)
├── Step 3: Fabric Selection (unchanged - text based)
├── Step 4: Design Upload (unchanged - file upload)
├── Step 5: Measurement (unchanged - form fields)
├── Step 6: Contact Info (unchanged - form fields)
├── Step 7: Address & Delivery (unchanged - form fields)
└── Step 8: Confirmation (unchanged - summary)
```

---

## Performance Notes

- Placeholder images: ~16.6 KB total (9 garment images)
- Category images: ~50 KB total
- Images use `object-fit: cover` for consistent display
- No lazy loading currently implemented
- All images are responsive

---

## Testing Checklist

- [x] All 9 garment images created
- [x] Category images resized (smaller height)
- [x] Component imports all images correctly
- [x] Step 1 displays category images with text labels
- [x] Step 2 displays garment images with text labels
- [x] Selection state styling works
- [x] Responsive grid layout works on mobile/desktop
- [x] Alt text present on all images
- [x] No TypeScript errors
- [x] Component compiles successfully

---

## Related Documentation

📄 **Full Analysis**: `ANALYSIS/FILE_REPORTS.md`  
📄 **Change Details**: `ANALYSIS/CHANGE_RECORD_20251113.md`  
📄 **Enhancement Summary**: `ANALYSIS/ENHANCEMENT_SUMMARY.md`  

---

**Status**: ✅ Ready for testing and image replacement

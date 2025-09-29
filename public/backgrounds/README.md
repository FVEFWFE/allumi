# Link Background Images

## Image Specifications

Place your background images in this directory with the following specifications:

### Recommended Image Properties:
- **Format**: WebP (preferred) or PNG with transparency
- **Resolution Options**:
  - Wide format: 1920x400px (recommended for link boxes)
  - Standard format: 800x600px
  - Mobile optimized: 600x400px
- **File Size**: Keep under 100KB per image for optimal loading
- **Compression**: Use WebP for best quality-to-size ratio

### File Naming:
- `link-bg-1.webp` - For "Exclusive Content Vault" link
- `link-bg-2.webp` - For "FREE BOOK: The AI Kill Switch" link
- `link-bg-3.webp` - For "Premium Tech Deals" link
- `link-bg-4.webp` - For "Dating App" link

### Design Guidelines:
- Use abstract, gradient, or subtle pattern designs
- Light colors work best (they'll be displayed at 8% opacity)
- Avoid busy patterns or high contrast elements
- Consider using:
  - Soft gradients
  - Geometric patterns
  - Abstract shapes
  - Blurred photography
  - Minimalist designs

### Implementation Notes:
- Images are automatically displayed at 8% opacity with a 1px blur
- The opacity increases slightly on hover (to 12%)
- Images are set as background-size: cover for responsive scaling
- Images are lazy-loaded for performance

### Converting Images to WebP:
If you have PNG/JPG images, convert them to WebP using:
```bash
# Using cwebp (install with: apt-get install webp)
cwebp -q 80 input.png -o link-bg-1.webp

# Or use online converters like:
# - https://cloudconvert.com/png-to-webp
# - https://convertio.co/png-webp/
```

### Testing:
After adding your images, test them by:
1. Placing the images in this directory
2. Refreshing your homepage
3. Checking that backgrounds appear behind each link
4. Verifying the opacity is subtle and non-intrusive
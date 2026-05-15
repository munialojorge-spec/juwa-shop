# Juwa World - Luxury Beauty Studio

Professional luxury beauty website with e-commerce functionality, payment processing, and WhatsApp integration.

## 📋 Features

✅ **Responsive Design** - Mobile, tablet, and desktop optimized  
✅ **E-Commerce** - Full shopping cart with multiple products  
✅ **Multiple Payment Methods** - Card, M-Pesa, PayPal  
✅ **WhatsApp Integration** - Direct customer communication  
✅ **Professional Styling** - Gold & black luxury theme  
✅ **Animated Hero** - Staggered tile animations  
✅ **Contact Encryption** - Client-side data security  
✅ **Order Confirmation** - Real-time order processing  

## 📁 File Structure

```
juwa-world/
├── index.html              # Home page with hero, features, products
├── shop.html              # Product catalog
├── checkout.html          # Checkout & payment processing
├── contact.html           # Contact form & information
├── services.html          # Services listing
├── gallery.html           # Photo gallery
├── styles.css             # Main stylesheet (responsive design)
├── script.js              # All JavaScript functionality
├── logo.jpeg              # Brand logo
├── nail.jpeg through nail9.jpeg  # Product images
├── netlify.toml           # Netlify deployment config
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🚀 Quick Deployment to Netlify

### **Option 1: Drag & Drop (Easiest)**
1. Go to https://app.netlify.com/drop
2. Drag the entire `juwa world` folder into the zone
3. Your site will be live immediately with a Netlify subdomain!

### **Option 2: Git Repository**
1. Create a GitHub account (https://github.com)
2. Create a new public repository named `juwa-world`
3. Upload all files from this folder
4. Go to https://app.netlify.com
5. Click "New site from Git"
6. Select your GitHub repository
7. Deploy!

### **Option 3: Netlify CLI**
```bash
npm install -g netlify-cli
cd "path/to/juwa world"
netlify deploy
```

## 🔧 Configuration

### **Contact Information**
- **Email**: josephwanyama093@gmail.com
- **Phone**: +254 799 457413
- **WhatsApp**: Direct messaging enabled

To update contact details, edit:
- `script.js` - Lines with phone/email
- `index.html` - Contact section
- `contact.html` - Info section

### **Payment Methods**
Configured for:
- 💳 Debit/Credit Card (16-digit validation)
- 📱 M-Pesa (Kenyan mobile money)
- 🅿️ PayPal

## 📊 Pricing (Kenyan Shillings - Ksh)

| Product | Price |
|---------|-------|
| Gel Nails | Ksh 500 |
| Acrylic Nails | Ksh 3,000 |
| Gungel Tips | Ksh 2,500 |
| Acrylic Sculpting | Ksh 4,000 |
| Nail Tips | Ksh 1,500 |
| Manicure | Ksh 500 |
| Stick On Nails | Ksh 1,000 |
| Gungel Overlay | Ksh 2,000 |

## 🎨 Customization

### **Colors**
Edit `styles.css` to change colors:
```css
--gold: #d4af37          /* Primary accent */
--dark: #0f0f0f          /* Dark background */
--light-bg: #f9f7f4      /* Light background */
```

### **Fonts**
- **Headings**: Cormorant Garamond (serif)
- **Body**: Poppins (sans-serif)

### **Images**
Replace with your own:
- `logo.jpeg` - Brand logo
- `nail.jpeg` through `nail9.jpeg` - Product images

## 🔒 Security

- ✅ Client-side contact encryption
- ✅ Form validation on all inputs
- ✅ Card number validation (Luhn algorithm)
- ✅ Secure payment method handling
- ✅ No sensitive data stored in localStorage

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (3-column layouts)
- **Tablet**: 1024px (2-column layouts)
- **Mobile**: 768px (1-column layouts)
- **Small Mobile**: 480px (optimized touch)

## 🛒 Cart Functionality

- Add/remove products
- Update quantities
- Persistent storage (localStorage)
- Real-time total calculation
- Shipping fee: Ksh 10

## 📧 Contact Form Integration

Uses **Formspree** for email:
- Action: `https://formspree.io/f/mgvewvqk`
- Emails sent to: josephwanyama093@gmail.com

## 🌐 Custom Domain (Optional)

1. Purchase domain from:
   - GoDaddy, Namecheap, Google Domains, etc.
   - Free options: Freenom (.tk, .ml)

2. In Netlify:
   - Go to Site Settings → Domain Management
   - Add your custom domain
   - Update DNS records (Netlify provides instructions)

## ⚡ Performance Tips

- Images are optimized (JPEGs)
- CSS minified for faster loading
- Lazy loading on images
- Caching enabled via netlify.toml

## 🆘 Troubleshooting

**Issue**: Forms not sending
- **Fix**: Verify Formspree endpoint is correct

**Issue**: Styles not loading
- **Fix**: Ensure `styles.css` path is correct (check case sensitivity)

**Issue**: Images not showing
- **Fix**: Verify image filenames match exactly (case-sensitive on servers)

**Issue**: Cart not persisting
- **Fix**: Check browser localStorage is enabled

## 📞 Support

For updates or issues:
- WhatsApp: +254 799 457413
- Email: josephwanyama093@gmail.com

## 📄 License

This website is proprietary to Juwa World. All rights reserved.

---

**Last Updated**: May 2026  
**Version**: 1.0  
**Status**: Ready for Production ✅

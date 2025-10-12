# Petrus & Mariëtte Wedding Website

A beautiful, mobile-optimized wedding website for Petrus & Mariëtte's wedding on April 18, 2026.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive design
- **Wedding Color Palette**: Dark green, white, light yellow, and dove gray
- **RSVP System**: Complete RSVP form with validation and data storage
- **Elegant Typography**: Beautiful fonts including Dancing Script for the main heading
- **Smooth Animations**: Subtle animations and transitions for enhanced user experience
- **Accessibility**: Focus on accessibility with proper focus states and reduced motion support

## Setup Instructions

1. **Add Your Couple Photo**: 
   - Replace `couple-photo.jpg` with your actual couple photo
   - Recommended size: 600x600px or larger (square aspect ratio)
   - The image will be automatically cropped to a circle

2. **Customize Content**:
   - Update wedding details in `index.html`
   - Modify the story section with your personal story
   - Adjust timing and venue information as needed

3. **RSVP Data Management**:
   - RSVP data is currently stored in browser localStorage (for demo purposes)
   - For production, integrate with a backend service or email service
   - Use the provided utility functions to export RSVP data

## File Structure

```
trou-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── couple-photo.jpg    # Couple photo (replace with your image)
└── README.md           # This file
```

## Color Palette

- **Dark Green**: `#2d5016` - Primary color for headings and accents
- **White**: `#ffffff` - Background and clean spaces
- **Light Yellow**: `#fef3c7` - Accent color for forms and highlights
- **Dove Gray**: `#d1d5db` - Secondary background and subtle elements

## RSVP Functionality

The RSVP form includes:
- Name and email validation
- Attendance confirmation (Yes/No)
- Guest count selection (when attending)
- Dietary restrictions and allergies
- Personal message to the couple
- Data validation and error handling

## Mobile Optimization

- Responsive navigation with hamburger menu
- Touch-friendly form elements
- Optimized typography for mobile reading
- Smooth scrolling and animations
- Fast loading with minimal dependencies

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Customization

To customize the website:

1. **Colors**: Update CSS variables in `styles.css`
2. **Content**: Modify text in `index.html`
3. **Images**: Replace `couple-photo.jpg` with your photo
4. **Fonts**: Change Google Fonts imports in `index.html`

## Production Deployment

For production use:

1. Set up a backend service for RSVP data collection
2. Replace localStorage with proper database storage
3. Add email notifications for new RSVPs
4. Consider adding a photo gallery or additional sections
5. Set up proper hosting with HTTPS

## Utility Functions

The website includes utility functions for RSVP management:

- `getRSVPData()`: Retrieve all RSVP submissions
- `exportRSVPData()`: Export RSVP data as CSV file

Access these functions in the browser console for admin purposes.

## License

This wedding website template is created with love for Petrus & Mariëtte's special day.

export const categoryData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  sections: Array<{
    title: string;
    description: string;
    image: string;
    features: string[];
  }>;
}> = {
  'laundry-services': {
    title: 'Premium Laundry Services',
    subtitle: 'Professional Care for Your Everyday Garments',
    description: 'Experience exceptional laundry service with our comprehensive cleaning solutions. We handle everything from delicate fabrics to everyday wear with precision and care.',
    heroImage: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1200&q=80',
    sections: [
      {
        title: 'Complete Washing Solutions',
        description: 'Our state-of-the-art laundry facilities use premium detergents and advanced washing techniques to ensure your clothes are impeccably clean and fresh. Every load receives individual attention with customized wash cycles.',
        image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80',
        features: [
          'Temperature-controlled washing for fabric preservation',
          'Hypoallergenic detergent options available',
          'Gentle cycle for delicate items',
          'Professional stain removal treatment',
          'Color separation and protection'
        ]
      },
      {
        title: 'Expert Drying & Folding',
        description: 'Every garment is carefully dried at optimal temperatures and professionally folded to maintain quality and prevent wrinkles. Our expert team ensures your clothes look pristine and ready to wear.',
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80',
        features: [
          'Low-heat drying to prevent shrinkage',
          'Meticulous folding techniques',
          'Sorted and organized by item type',
          'Eco-friendly drying processes',
          'Anti-wrinkle treatment included'
        ]
      },
      {
        title: 'Same-Day Express Service',
        description: 'Need your laundry fast? Our express service ensures your clothes are cleaned, dried, and ready within hours. Perfect for busy professionals and urgent situations.',
        image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=800&q=80',
        features: [
          '24-hour standard turnaround',
          'Express 12-hour service available',
          'Weekend and holiday service',
          'Real-time order tracking',
          'Priority processing guarantee'
        ]
      },
      {
        title: 'Sustainable Practices',
        description: 'We\'re committed to environmental responsibility with eco-friendly detergents and efficient water management systems. Our green approach doesn\'t compromise on cleaning quality.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
        features: [
          'Biodegradable cleaning products',
          'Water-saving washing technology',
          'Energy-efficient equipment',
          'Carbon-neutral delivery options',
          'Recyclable packaging materials'
        ]
      },
      {
        title: 'Fabric Care Specialists',
        description: 'Our trained specialists understand different fabric types and their unique care requirements. From cotton to synthetic blends, we provide expert treatment for all materials.',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80',
        features: [
          'Cotton and linen expertise',
          'Synthetic blend handling',
          'Wool and cashmere care',
          'Performance fabric treatment',
          'Fabric softening options'
        ]
      },
      {
        title: 'Quality Inspection Process',
        description: 'Every item undergoes thorough inspection before and after cleaning. We check for stains, damage, and ensure perfect results before delivery to your doorstep.',
        image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80',
        features: [
          'Pre-wash inspection and tagging',
          'Post-wash quality verification',
          'Stain removal confirmation',
          'Button and zipper checks',
          'Final packaging inspection'
        ]
      },
      {
        title: 'Convenient Collection & Delivery',
        description: 'Enjoy hassle-free service with our complimentary collection and delivery across London. Schedule pickups at your convenience and receive your fresh laundry at your doorstep.',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80',
        features: [
          'Free pickup and delivery service',
          'Flexible scheduling options',
          'SMS and email notifications',
          'Contactless drop-off available',
          'Secure packaging for transport'
        ]
      }
    ]
  },
  'shirts-and-tops': {
    title: 'Shirts & Tops Care',
    subtitle: 'Specialized Care for Your Professional Wardrobe',
    description: 'Keep your shirts and tops looking pristine with our expert cleaning and pressing services. Perfect for business professionals who demand excellence.',
    heroImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80',
    sections: [
      {
        title: 'Professional Shirt Service',
        description: 'Our specialized shirt service includes expert cleaning, precise pressing, and presentation on hangers for a perfectly professional appearance. Each shirt receives individual attention from our experienced team.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
        features: [
          'Professional collar and cuff treatment',
          'Precision steam pressing technology',
          'Starch preferences accommodated',
          'Individual garment inspection',
          'Wrinkle-free guarantee'
        ]
      },
      {
        title: 'Delicate Fabric Expertise',
        description: 'From silk blouses to linen shirts, we have the expertise to handle all fabric types with appropriate care techniques. Our specialists are trained in treating premium and designer fabrics.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
        features: [
          'Hand-washing for delicate materials',
          'Specialized treatment for silk and satin',
          'Color preservation techniques',
          'Custom care for designer pieces',
          'Temperature-controlled processing'
        ]
      },
      {
        title: 'Stain & Spot Treatment',
        description: 'Expert removal of common shirt stains including collar rings, underarm marks, and food stains without fabric damage. Our advanced stain removal techniques ensure pristine results.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
        features: [
          'Pre-treatment of stubborn stains',
          'Oil and grease stain removal',
          'Wine and food stain specialists',
          'Ink and dye stain solutions',
          'Enzyme-based stain treatments'
        ]
      },
      {
        title: 'Premium Finishing',
        description: 'Every shirt receives meticulous finishing touches including button inspection, loose thread removal, and quality assurance. We ensure perfection in every detail.',
        image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&q=80',
        features: [
          'Button tightening and replacement',
          'Wrinkle-free guarantee',
          'Protective packaging',
          'Hanging or folded delivery options',
          'Final quality inspection'
        ]
      },
      {
        title: 'Business Shirt Packages',
        description: 'Exclusive packages for professionals who need regular shirt cleaning. Save time and money with our subscription services designed for busy executives.',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
        features: [
          'Weekly and monthly packages available',
          'Priority service for members',
          'Discounted bulk rates',
          'Dedicated account manager',
          'Flexible scheduling options'
        ]
      },
      {
        title: 'White Shirt Specialists',
        description: 'White shirts require special care to maintain their brightness and prevent yellowing. Our specialized white shirt treatment keeps your whites looking new.',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
        features: [
          'Optical brightening treatments',
          'Yellowing prevention methods',
          'Collar and cuff whitening',
          'Stain removal without bleaching',
          'UV protection processing'
        ]
      },
      {
        title: 'Express Shirt Service',
        description: 'Need your shirts cleaned urgently? Our express service guarantees same-day turnaround for professionals on tight schedules. Perfect for last-minute meetings and travel.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        features: [
          'Same-day service available',
          '4-hour express option',
          'Early morning and late evening slots',
          'Priority processing guarantee',
          'Emergency service available 24/7'
        ]
      }
    ]
  },
  'elegant-suits': {
    title: 'Elegant Suits Care',
    subtitle: 'Luxury Treatment for Your Finest Formal Wear',
    description: 'Trust your valuable suits to our expert care. We provide premium dry cleaning and pressing services that preserve the quality and appearance of your formal attire.',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
    sections: [
      {
        title: 'Expert Dry Cleaning',
        description: 'Our professional dry cleaning process uses gentle, eco-friendly solvents that effectively clean without compromising fabric integrity. Each suit receives personalized treatment based on fabric type and construction.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        features: [
          'Premium solvent-based cleaning',
          'Fabric structure preservation',
          'Odor elimination treatment',
          'Individual garment processing',
          'Eco-friendly cleaning agents'
        ]
      },
      {
        title: 'Precision Pressing',
        description: 'Master craftsmen ensure every suit is pressed to perfection with attention to lapels, creases, and overall presentation. Using traditional hand-finishing techniques combined with modern technology.',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
        features: [
          'Hand-finished pressing techniques',
          'Sharp crease maintenance',
          'Shoulder and lapel shaping',
          'Professional presentation standard',
          'Steam finishing for perfection'
        ]
      },
      {
        title: 'Fabric Care Excellence',
        description: 'Specialized care for wool, cashmere, silk, and blended fabrics ensures your suits maintain their luxurious feel and appearance. Our experts understand the unique needs of premium materials.',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
        features: [
          'Wool and cashmere specialists',
          'Lining care and repair',
          'Color preservation methods',
          'Texture restoration treatments',
          'Anti-moth protection available'
        ]
      },
      {
        title: 'Premium Storage & Delivery',
        description: 'Your suits are returned on premium hangers with protective coverings, ready to hang in your wardrobe. White-glove service ensures your investment is protected.',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
        features: [
          'Wooden hanger presentation',
          'Breathable garment bags',
          'Tissue paper fold protection',
          'White-glove delivery service',
          'Climate-controlled transport'
        ]
      },
      {
        title: 'Stain Removal Specialists',
        description: 'Complex stain removal for suits requires expertise and precision. Our specialists can handle everything from wine spills to oil stains without damaging the fabric.',
        image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
        features: [
          'Expert stain identification',
          'Pre-treatment for tough stains',
          'Gentle removal techniques',
          'No fabric damage guarantee',
          'Invisible repair options'
        ]
      },
      {
        title: 'Suit Maintenance Program',
        description: 'Our exclusive maintenance program keeps your suits in pristine condition year-round. Perfect for professionals who wear suits daily.',
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80',
        features: [
          'Regular cleaning schedule',
          'Priority service access',
          'Seasonal storage options',
          'Complimentary minor repairs',
          'Dedicated account manager'
        ]
      },
      {
        title: 'Express Suit Service',
        description: 'Need your suit cleaned urgently for an important meeting or event? Our express service delivers impeccable results in record time.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        features: [
          'Same-day service available',
          '24-hour turnaround guaranteed',
          'Emergency cleaning hotline',
          'Weekend and holiday service',
          'Priority processing queue'
        ]
      }
    ]
  },
  'dresses-and-skirts': {
    title: 'Dresses & Skirts Care',
    subtitle: 'Delicate Handling for Your Elegant Attire',
    description: 'From cocktail dresses to evening gowns, our specialized cleaning services ensure your dresses and skirts look stunning for every occasion.',
    heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80',
    sections: [
      {
        title: 'Gentle Cleaning Methods',
        description: 'Our expert team employs gentle cleaning techniques specifically designed for delicate fabrics and intricate designs. Each piece is treated with the utmost care to preserve its beauty.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
        features: [
          'Hand-washing for delicate pieces',
          'Gentle machine cycles available',
          'Embellishment protection',
          'Color-safe cleaning processes',
          'pH-balanced detergents'
        ]
      },
      {
        title: 'Special Occasion Expertise',
        description: 'Wedding dresses, formal gowns, and special occasion wear receive the highest level of care and attention. Our specialists understand the sentimental value of these garments.',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
        features: [
          'Bridal gown specialists',
          'Beadwork and sequin care',
          'Tulle and organza expertise',
          'Preservation packaging available',
          'Wedding dress cleaning & storage'
        ]
      },
      {
        title: 'Fabric-Specific Treatment',
        description: 'Each fabric type receives customized care, from delicate chiffon to structured taffeta. Our knowledge ensures perfect results for every material.',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
        features: [
          'Silk and satin care',
          'Lace preservation techniques',
          'Velvet and brocade treatment',
          'Synthetic blend expertise',
          'Stretch fabric handling'
        ]
      },
      {
        title: 'Perfect Finishing',
        description: 'Professional steaming and pressing ensure your dresses hang beautifully and are ready to wear. We restore the original shape and drape of each garment.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
        features: [
          'Gentle steam finishing',
          'Wrinkle removal without damage',
          'Shape restoration',
          'Premium hanger presentation',
          'Protective garment bags'
        ]
      },
      {
        title: 'Evening Wear Specialists',
        description: 'Cocktail dresses, evening gowns, and formal wear require special expertise. Our team ensures your elegant attire maintains its glamorous appearance.',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
        features: [
          'Formal gown cleaning',
          'Cocktail dress care',
          'Designer piece expertise',
          'Beading and sequin protection',
          'Express service for events'
        ]
      },
      {
        title: 'Stain & Spot Treatment',
        description: 'Expert removal of makeup, food, and beverage stains from delicate dress fabrics. We use specialized techniques that won\'t harm embellishments or delicate materials.',
        image: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80',
        features: [
          'Makeup stain removal',
          'Food and wine stain treatment',
          'Delicate fabric safe methods',
          'No damage to embellishments',
          'Invisible stain repairs'
        ]
      },
      {
        title: 'Designer Dress Care',
        description: 'High-end designer dresses deserve exceptional care. Our specialists are trained in handling luxury brands and understand their specific care requirements.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
        features: [
          'Luxury brand expertise',
          'Hand-finished care',
          'Original label preservation',
          'Custom care instructions',
          'Museum-quality storage options'
        ]
      }
    ]
  },
  'trousers': {
    title: 'Trousers Care',
    subtitle: 'Sharp Creases and Impeccable Finish',
    description: 'Professional cleaning and pressing services for all types of trousers, from casual chinos to formal dress pants.',
    heroImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1200&q=80',
    sections: [
      {
        title: 'Professional Cleaning',
        description: 'Our cleaning process removes dirt, stains, and odors while preserving the fabric quality and color vibrancy. Deep cleaning technology ensures thorough results.',
        image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=800&q=80',
        features: [
          'Deep cleaning technology',
          'Stain pre-treatment',
          'Color preservation',
          'Fabric softening treatment',
          'Odor elimination process'
        ]
      },
      {
        title: 'Perfect Crease Lines',
        description: 'Expert pressing creates sharp, professional crease lines that last longer and look better. Military-precision techniques ensure consistent results.',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
        features: [
          'Military-grade creases',
          'Side seam alignment',
          'Hem pressing perfection',
          'Wrinkle-free finish',
          'Crease permanence treatment'
        ]
      },
      {
        title: 'Material Expertise',
        description: 'From wool dress pants to cotton chinos and synthetic blends, we know how to care for every material. Each fabric type receives specialized treatment.',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
        features: [
          'Wool and worsted care',
          'Cotton and linen treatment',
          'Denim expertise',
          'Synthetic blend handling',
          'Performance fabric care'
        ]
      },
      {
        title: 'Minor Repairs Included',
        description: 'We fix loose hems, replace missing buttons, and perform minor repairs at no extra charge. Keeping your trousers in perfect condition is our priority.',
        image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&q=80',
        features: [
          'Button replacement',
          'Hem repair service',
          'Pocket reinforcement',
          'Zipper maintenance',
          'Loose thread removal'
        ]
      },
      {
        title: 'Chinos & Casual Trousers',
        description: 'Casual trousers require different care than formal pants. We adjust our cleaning and pressing techniques to suit the style and fabric.',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
        features: [
          'Casual press finish',
          'Color retention methods',
          'Soft hand feel preservation',
          'Relaxed crease options',
          'Cotton blend expertise'
        ]
      },
      {
        title: 'Dress Pants Perfection',
        description: 'Formal dress pants demand perfection. Our specialists ensure razor-sharp creases and impeccable presentation for business and formal occasions.',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
        features: [
          'Professional business finish',
          'Sharp front creases',
          'Wool trouser specialists',
          'Anti-shine treatment',
          'Premium presentation'
        ]
      },
      {
        title: 'Trouser Care Packages',
        description: 'Regular trouser wearers benefit from our package deals. Save money and ensure your pants always look their best with our subscription services.',
        image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=800&q=80',
        features: [
          'Monthly package discounts',
          'Priority service access',
          'Complimentary repairs',
          'Flexible pick-up schedules',
          'Dedicated customer support'
        ]
      }
    ]
  },
  'outdoor-clothing': {
    title: 'Outdoor Clothing',
    subtitle: 'Technical Care for Performance Wear',
    description: 'Specialized cleaning for outdoor gear, jackets, and activewear that maintains water resistance and breathability.',
    heroImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80',
    sections: [
      {
        title: 'Technical Fabric Care',
        description: 'Our specialized process maintains the technical properties of outdoor clothing including water resistance and breathability. We understand the science behind performance fabrics.',
        image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800&q=80',
        features: [
          'Gore-tex and waterproof membrane care',
          'DWR coating restoration',
          'Breathability preservation',
          'Insulation protection',
          'Technical fabric expertise'
        ]
      },
      {
        title: 'Down & Insulated Garments',
        description: 'Expert cleaning of down jackets and insulated wear that maintains loft and warmth. Specialized drying techniques prevent clumping and restore original insulation properties.',
        image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
        features: [
          'Down feather care',
          'Synthetic insulation cleaning',
          'Loft restoration techniques',
          'Clumping prevention',
          'Fill power maintenance'
        ]
      },
      {
        title: 'Sportswear & Activewear',
        description: 'Remove sweat stains and odors from activewear while maintaining fabric elasticity and moisture-wicking properties. Perfect for gym clothes and yoga wear.',
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80',
        features: [
          'Odor elimination treatment',
          'Elasticity preservation',
          'Quick-dry maintenance',
          'Anti-microbial cleaning',
          'Moisture-wicking retention'
        ]
      },
      {
        title: 'Waterproofing Services',
        description: 'Professional re-waterproofing services restore your outdoor gear to peak performance. Our DWR treatments ensure maximum protection in harsh weather.',
        image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
        features: [
          'DWR reapplication',
          'Seam sealing services',
          'Water repellency testing',
          'Performance restoration guarantee',
          'Weather protection renewal'
        ]
      },
      {
        title: 'Hiking & Trail Gear',
        description: 'Specialized care for hiking boots, backpacks, and trail gear. We clean and maintain outdoor equipment to extend its lifespan and performance.',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        features: [
          'Backpack cleaning and deodorizing',
          'Trail gear maintenance',
          'Hiking boot care',
          'Strap and zipper treatment',
          'Outdoor equipment restoration'
        ]
      },
      {
        title: 'Ski & Snow Wear',
        description: 'Expert care for ski jackets, snow pants, and winter sports gear. Maintaining warmth and weatherproofing while removing salt stains and odors.',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
        features: [
          'Ski jacket specialist cleaning',
          'Snow pant care',
          'Salt stain removal',
          'Insulation preservation',
          'Waterproofing renewal'
        ]
      },
      {
        title: 'Performance Testing',
        description: 'After cleaning, we test your gear to ensure all technical properties are maintained. Quality assurance for performance outdoor clothing.',
        image: 'https://images.unsplash.com/photo-1527933053326-89d1746b76b9?w=800&q=80',
        features: [
          'Water resistance testing',
          'Breathability verification',
          'Insulation effectiveness check',
          'DWR coating inspection',
          'Performance guarantee certificate'
        ]
      }
    ]
  },
  'home-textiles': {
    title: 'Home Textile Services',
    subtitle: 'Premium Care for Your Bedding & Linens',
    description: 'Professional cleaning for bedding, curtains, and household textiles using specialized equipment and techniques.',
    heroImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
    sections: [
      {
        title: 'Bedding & Duvet Cleaning',
        description: 'Deep cleaning for duvets, comforters, and bedding that removes allergens and restores freshness. Our industrial equipment can handle even king-sized items with care.',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        features: [
          'Large-capacity cleaning equipment',
          'Allergen removal treatment',
          'Feather and down expertise',
          'Fabric softener options',
          'Hypoallergenic cleaning available'
        ]
      },
      {
        title: 'Curtain Care',
        description: 'Professional cleaning and pressing for all types of curtains and drapes, including delicate fabrics. We can handle everything from sheer voiles to heavy velvet drapes.',
        image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80',
        features: [
          'Hanging or re-hanging service',
          'Pleat preservation',
          'Lining care',
          'Sun damage treatment',
          'Blackout curtain specialists'
        ]
      },
      {
        title: 'Table Linens & Napkins',
        description: 'Expert cleaning and pressing of tablecloths, napkins, and decorative linens for special occasions. Perfect for events, weddings, and fine dining.',
        image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80',
        features: [
          'Stain removal expertise',
          'Crease-free finishing',
          'Embroidery protection',
          'Lace and delicate trim care',
          'Event linen packages'
        ]
      },
      {
        title: 'Blankets & Throws',
        description: 'Gentle cleaning for all types of blankets, from fleece throws to wool blankets and quilts. We preserve the softness and warmth of your favorite blankets.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        features: [
          'Wool and cashmere blanket care',
          'Quilt cleaning and repair',
          'Fleece refreshing',
          'Weighted blanket expertise',
          'Electric blanket safe cleaning'
        ]
      },
      {
        title: 'Pillow Cleaning & Care',
        description: 'Specialized cleaning for all types of pillows including down, synthetic, and memory foam. Remove allergens and restore fluffiness for better sleep.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
        features: [
          'Down and feather pillow care',
          'Memory foam cleaning',
          'Allergen removal',
          'Deodorizing treatment',
          'Shape restoration'
        ]
      },
      {
        title: 'Seasonal Storage Solutions',
        description: 'Clean and store your seasonal textiles with our professional storage service. Protect your items from dust, moths, and damage during off-season months.',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        features: [
          'Professional cleaning before storage',
          'Climate-controlled facilities',
          'Moth protection treatment',
          'Breathable storage bags',
          'Seasonal delivery service'
        ]
      },
      {
        title: 'Upholstery & Cushion Cleaning',
        description: 'Expert cleaning for cushion covers, chair pads, and removable upholstery. Refresh your home furnishings with our specialized techniques.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        features: [
          'Cushion cover cleaning',
          'Sofa cushion care',
          'Outdoor cushion specialists',
          'Fabric protection treatment',
          'Color restoration services'
        ]
      }
    ]
  },
  'ironing': {
    title: 'Ironing Services',
    subtitle: 'Professional Pressing for Crisp, Fresh Garments',
    description: 'Expert ironing services for all your garments. Drop off your clean clothes and we\'ll return them perfectly pressed.',
    heroImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=80',
    sections: [
      {
        title: 'Expert Steam Pressing',
        description: 'Professional steam pressing that removes wrinkles and creases without damaging delicate fabrics. Our industrial steam equipment delivers superior results.',
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
        features: [
          'Industrial steam equipment',
          'Temperature-controlled pressing',
          'Crease setting capability',
          'Wrinkle-free guarantee',
          'Fabric-specific techniques'
        ]
      },
      {
        title: 'Shirt Pressing Perfection',
        description: 'Specialized shirt pressing service that delivers crisp collars, smooth fronts, and professional appearance. Perfect for business professionals.',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
        features: [
          'Collar and cuff precision',
          'Button area care',
          'Sleeve crease options',
          'Starch level customization',
          'Professional presentation'
        ]
      },
      {
        title: 'Delicate Fabric Handling',
        description: 'Gentle ironing techniques for silk, linen, and other delicate materials that require special care. Low-temperature pressing preserves fabric integrity.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        features: [
          'Low-temperature pressing',
          'Pressing cloth protection',
          'Silk and satin expertise',
          'Embellishment avoidance',
          'Hand-finishing techniques'
        ]
      },
      {
        title: 'Bulk Ironing Service',
        description: 'Efficient bulk ironing services for large quantities, perfect for events or after vacation laundry. Volume discounts available.',
        image: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=800&q=80',
        features: [
          'Volume discount rates',
          'Quick turnaround available',
          'Sorted and organized',
          'Next-day service option',
          'Event ironing packages'
        ]
      },
      {
        title: 'Household Linen Pressing',
        description: 'Professional ironing for bedsheets, tablecloths, and household linens. Create a luxurious feel in your home with crisp, hotel-quality linens.',
        image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&q=80',
        features: [
          'Bedsheet and pillowcase pressing',
          'Tablecloth finishing',
          'Napkin folding service',
          'Large item capability',
          'Hotel-quality results'
        ]
      },
      {
        title: 'Express Ironing',
        description: 'Need something pressed urgently? Our express ironing service can handle last-minute requests for important meetings or events.',
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
        features: [
          'Same-day service',
          '2-hour express option',
          'Priority processing',
          'Emergency service available',
          'While-you-wait option'
        ]
      },
      {
        title: 'Ironing Subscription Service',
        description: 'Regular ironing needs? Our subscription service offers convenience and savings with scheduled pickups and deliveries.',
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
        features: [
          'Weekly or monthly packages',
          'Discounted subscription rates',
          'Automatic scheduling',
          'Priority customer service',
          'Flexible package options'
        ]
      }
    ]
  },
  'alterations': {
    title: 'Alterations',
    subtitle: 'Expert Tailoring for the Perfect Fit',
    description: 'Professional alteration services from simple hems to complex restructuring. Our skilled tailors ensure your garments fit perfectly.',
    heroImage: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=80',
    sections: [
      {
        title: 'Basic Alterations',
        description: 'Common alterations including hemming, taking in, and letting out garments for a better fit. Fast turnaround and precise workmanship guaranteed.',
        image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&q=80',
        features: [
          'Trouser hemming',
          'Waist adjustments',
          'Sleeve shortening',
          'Side seam modifications',
          'Dress length alterations'
        ]
      },
      {
        title: 'Advanced Tailoring',
        description: 'Complex alterations for suits, jackets, and formal wear requiring expert tailoring skills. Our master tailors bring decades of experience.',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1ba5?w=800&q=80',
        features: [
          'Jacket restructuring',
          'Shoulder adjustments',
          'Lining replacement',
          'Button hole creation',
          'Suit reconstruction'
        ]
      },
      {
        title: 'Repairs & Restorations',
        description: 'Repair services for tears, holes, broken zippers, and other damage to extend garment life. Expert invisible repairs preserve garment appearance.',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
        features: [
          'Zipper replacement',
          'Tear and rip repair',
          'Button replacement',
          'Seam reinforcement',
          'Invisible mending'
        ]
      },
      {
        title: 'Custom Modifications',
        description: 'Transform garments with custom modifications including style changes and embellishments. Create unique pieces from existing garments.',
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
        features: [
          'Style modifications',
          'Custom embroidery',
          'Patch application',
          'Design consultations',
          'Fashion updates'
        ]
      },
      {
        title: 'Wedding & Bridal Alterations',
        description: 'Specialized alterations for wedding dresses and bridal party attire. Multiple fittings ensure perfect results for your special day.',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
        features: [
          'Bridal gown alterations',
          'Bridesmaid dress fitting',
          'Tuxedo adjustments',
          'Multiple fitting sessions',
          'Rush service available'
        ]
      },
      {
        title: 'Leather & Suede Alterations',
        description: 'Expert alterations for leather jackets, suede garments, and leather goods. Specialized equipment and techniques for leather work.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
        features: [
          'Leather jacket alterations',
          'Suede garment modifications',
          'Zipper replacement in leather',
          'Lining repairs',
          'Leather patching'
        ]
      },
      {
        title: 'Designer Garment Specialists',
        description: 'Trusted with high-end designer pieces, our master tailors understand luxury garment construction and preserve brand integrity.',
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&q=80',
        features: [
          'Luxury brand expertise',
          'Original label preservation',
          'Designer construction knowledge',
          'Premium finishing',
          'Consultation service'
        ]
      }
    ]
  },
  'shoe-repair': {
    title: 'Shoe Repair & Care',
    subtitle: 'Expert Cobbler Services',
    description: 'Professional shoe repair and restoration services to extend the life of your favorite footwear. From designer heels to everyday boots.',
    heroImage: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80',
    sections: [
      {
        title: 'Sole Replacement',
        description: 'Complete sole replacement for all types of footwear using quality materials that match original specifications. Restore worn soles to like-new condition.',
        image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&q=80',
        features: [
          'Leather sole replacement',
          'Rubber sole options',
          'Non-slip sole upgrades',
          'Color matching service',
          'Waterproof sole application'
        ]
      },
      {
        title: 'Heel Repairs',
        description: 'Expert heel replacement and repair for stilettos, block heels, and dress shoes. Quick turnaround and quality materials ensure lasting results.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
        features: [
          'Heel cap replacement',
          'Heel height adjustments',
          'Stiletto heel repair',
          'Rubber heel installation',
          'Emergency heel repairs'
        ]
      },
      {
        title: 'Cleaning & Conditioning',
        description: 'Professional shoe cleaning and leather conditioning services to maintain appearance and extend life. Specialized treatments for different materials.',
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
        features: [
          'Deep leather cleaning',
          'Conditioning treatment',
          'Polish and shine service',
          'Color restoration',
          'Odor elimination'
        ]
      },
      {
        title: 'Specialized Repairs',
        description: 'Expert repairs for zippers, buckles, straps, and other shoe components. Preserve your favorite footwear with professional restoration.',
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
        features: [
          'Boot zipper replacement',
          'Stitching and seam repair',
          'Eyelet replacement',
          'Stretching services',
          'Elastic insertion'
        ]
      },
      {
        title: 'Boot Services',
        description: 'Comprehensive boot repair and maintenance including resoling, zipper replacement, and leather restoration. Keep your boots in top condition.',
        image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
        features: [
          'Boot resoling',
          'Zipper replacement',
          'Shaft narrowing',
          'Heel block replacement',
          'Waterproofing treatment'
        ]
      },
      {
        title: 'Designer Shoe Care',
        description: 'Specialized care for luxury and designer footwear. Our experts understand high-end shoe construction and use premium materials.',
        image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80',
        features: [
          'Luxury brand expertise',
          'Premium materials only',
          'Color matching service',
          'Original hardware sourcing',
          'Designer consultation'
        ]
      },
      {
        title: 'Shoe Maintenance Programs',
        description: 'Regular maintenance packages to keep your shoe collection in pristine condition. Preventive care extends shoe life significantly.',
        image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&q=80',
        features: [
          'Seasonal care packages',
          'Monthly maintenance plans',
          'Protective treatments',
          'Storage preparation',
          'Priority service'
        ]
      }
    ]
  }
};
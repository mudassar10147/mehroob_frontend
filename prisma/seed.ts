import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sheetmask.com' },
    update: {},
    create: {
      email: 'admin@sheetmask.com',
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Jane Doe',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  });

  console.log('✅ Created customer user:', customer.email);

  // Create sample products
  const products = [
    {
      name: 'Hydrating Rose Sheet Mask',
      slug: 'hydrating-rose-sheet-mask',
      description:
        'Infused with rose extract and hyaluronic acid, this sheet mask provides intense hydration and leaves skin glowing and refreshed.',
      shortDescription: 'Intense hydration with rose extract',
      price: 12.99,
      discountedPrice: 9.99,
      sku: 'SM-HYDRO-001',
      stock: 100,
      images: [
        'https://images.unsplash.com/photo-1596755389378-c31d21fd1273',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
      ],
      category: 'HYDRATING',
      skinTypes: ['DRY', 'NORMAL', 'COMBINATION'],
      ingredients: ['Rose Extract', 'Hyaluronic Acid', 'Vitamin E', 'Aloe Vera'],
      benefits: [
        'Deep hydration',
        'Reduces fine lines',
        'Brightens complexion',
        'Soothing effect',
      ],
      howToUse:
        'Cleanse face, apply mask for 15-20 minutes, remove and massage remaining essence into skin.',
      featured: true,
      rating: 4.8,
      reviewCount: 245,
    },
    {
      name: 'Brightening Vitamin C Mask',
      slug: 'brightening-vitamin-c-mask',
      description:
        'Packed with Vitamin C and citrus extracts, this mask brightens dull skin and evens out skin tone for a radiant complexion.',
      shortDescription: 'Brighten and even skin tone',
      price: 14.99,
      sku: 'SM-BRIGHT-001',
      stock: 85,
      images: [
        'https://images.unsplash.com/photo-1617897903246-719242758050',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
      ],
      category: 'BRIGHTENING',
      skinTypes: ['NORMAL', 'COMBINATION', 'OILY'],
      ingredients: ['Vitamin C', 'Citrus Extract', 'Niacinamide', 'Licorice Root'],
      benefits: [
        'Brightens skin',
        'Reduces dark spots',
        'Evens skin tone',
        'Antioxidant protection',
      ],
      howToUse:
        'Apply to clean skin, leave on for 15-20 minutes, remove and pat in remaining serum.',
      featured: true,
      rating: 4.7,
      reviewCount: 189,
    },
    {
      name: 'Anti-Aging Collagen Boost',
      slug: 'anti-aging-collagen-boost',
      description:
        'Enriched with collagen and peptides, this mask helps reduce fine lines and wrinkles while improving skin elasticity.',
      shortDescription: 'Reduce wrinkles and boost elasticity',
      price: 16.99,
      discountedPrice: 13.99,
      sku: 'SM-ANTIAGE-001',
      stock: 60,
      images: [
        'https://images.unsplash.com/photo-1570554886111-e80fcca6a029',
        'https://images.unsplash.com/photo-1599305090598-fe179d501227',
      ],
      category: 'ANTI_AGING',
      skinTypes: ['DRY', 'NORMAL', 'SENSITIVE'],
      ingredients: ['Collagen', 'Peptides', 'Retinol', 'Hyaluronic Acid'],
      benefits: [
        'Reduces fine lines',
        'Improves elasticity',
        'Firms skin',
        'Anti-aging properties',
      ],
      howToUse:
        'Use on clean face 2-3 times per week. Leave on for 20 minutes, remove and massage excess serum.',
      featured: true,
      rating: 4.9,
      reviewCount: 312,
    },
    {
      name: 'Purifying Charcoal Mask',
      slug: 'purifying-charcoal-mask',
      description:
        'Activated charcoal and tea tree oil work together to deeply cleanse pores and control excess oil.',
      shortDescription: 'Deep cleanse with charcoal',
      price: 11.99,
      sku: 'SM-PURIFY-001',
      stock: 120,
      images: [
        'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b',
        'https://images.unsplash.com/photo-1556229010-aa49a7b3c64c',
      ],
      category: 'PURIFYING',
      skinTypes: ['OILY', 'COMBINATION'],
      ingredients: ['Activated Charcoal', 'Tea Tree Oil', 'Clay', 'Witch Hazel'],
      benefits: [
        'Deep cleansing',
        'Controls oil',
        'Minimizes pores',
        'Removes impurities',
      ],
      howToUse:
        'Apply to clean face, especially on T-zone. Leave for 15 minutes, remove gently.',
      featured: false,
      rating: 4.6,
      reviewCount: 156,
    },
    {
      name: 'Soothing Aloe & Cucumber',
      slug: 'soothing-aloe-cucumber',
      description:
        'Perfect for sensitive skin, this mask calms irritation and reduces redness with natural aloe and cucumber.',
      shortDescription: 'Calm and soothe sensitive skin',
      price: 13.99,
      sku: 'SM-SOOTH-001',
      stock: 95,
      images: [
        'https://images.unsplash.com/photo-1571875257727-256c39da42af',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03',
      ],
      category: 'SOOTHING',
      skinTypes: ['SENSITIVE', 'DRY', 'NORMAL'],
      ingredients: ['Aloe Vera', 'Cucumber Extract', 'Chamomile', 'Calendula'],
      benefits: [
        'Calms irritation',
        'Reduces redness',
        'Hydrates gently',
        'Anti-inflammatory',
      ],
      howToUse:
        'Apply to clean skin, relax for 15-20 minutes. Remove and let skin absorb remaining essence.',
      featured: false,
      rating: 4.7,
      reviewCount: 203,
    },
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log('✅ Created product:', created.name);
  }

  // Create a sample coupon
  const coupon = await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minOrderValue: 20,
      active: true,
    },
  });

  console.log('✅ Created coupon:', coupon.code);

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


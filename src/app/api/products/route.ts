import { NextRequest, NextResponse } from 'next/server';
import { bestSellingProducts } from '@/data/mockProducts';

/**
 * Temporary Product API Route Handler
 * This will work until the backend API is ready with search functionality
 * Once backend is ready, this file can be removed
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');
    const isActive = searchParams.get('isActive');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    let products = bestSellingProducts;

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    if (minPrice) {
      const min = parseInt(minPrice);
      products = products.filter(p => p.price >= min);
    }
    if (maxPrice) {
      const max = parseInt(maxPrice);
      products = products.filter(p => p.price <= max);
    }

    // Filter by stock
    if (inStock === 'true') {
      // All mock products are in stock
      products = products.filter(p => p.id);
    }

    // Filter by active
    if (isActive === 'true') {
      products = products.filter(p => p.id);
    }

    // Sort products
    if (sortBy) {
      products.sort((a, b) => {
        if (sortBy === 'price') {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return 0;
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Convert mock products to backend format
    const formattedProducts = paginatedProducts.map(product => ({
      _id: product.id,
      name: product.name,
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      sku: `SKU-${product.id}`,
      brand: 'Mediheal',
      brandId: {
        _id: 'brand1',
        name: 'Mediheal',
        slug: 'mediheal'
      },
      category: product.category,
      categoryId: {
        _id: 'cat1',
        name: product.category,
        slug: product.category.toLowerCase()
      },
      price: product.price,
      finalPrice: product.price,
      stock: 100,
      inStock: true,
      isActive: true,
      isFeatured: product.id === '1' || product.id === '2',
      isNewArrival: product.id === '3' || product.id === '4',
      isBestSeller: product.id === '1' || product.id === '2',
      thumbnail: product.image,
      images: [product.image],
      description: product.description,
      averageRating: product.rating,
      totalReviews: product.reviews,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    return NextResponse.json({
      success: true,
      data: {
        products: formattedProducts,
        pagination: {
          current: page,
          pages: Math.ceil(products.length / limit),
          total: products.length,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products', error: String(error) },
      { status: 500 }
    );
  }
}


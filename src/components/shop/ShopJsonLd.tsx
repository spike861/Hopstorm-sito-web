import type { ShopProduct } from '../../types/shop';
import { formatShopAbv, getProductGallery, safeJsonLdStringify } from '../../services/shopApi';

interface ShopJsonLdProps {
  mode: 'catalog' | 'product';
  products?: ShopProduct[];
  product?: ShopProduct | null;
}

function buildProductSchema(product: ShopProduct) {
  const images = getProductGallery(product);
  const additionalProperty: Array<{ '@type': string; name: string; value: string }> = [];
  const formattedAbv = formatShopAbv(product.abv);

  if (formattedAbv) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'ABV', value: formattedAbv });
  }
  if (product.stile) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Stile', value: product.stile });
  }
  if (product.formato) {
    additionalProperty.push({ '@type': 'PropertyValue', name: 'Formato', value: product.formato });
  }
  if (product.allergeni) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Allergeni',
      value: product.allergeni,
    });
  }

  return {
    '@type': 'Product',
    '@id': `https://www.hopstorm.it/shop/${encodeURIComponent(product.id)}#product`,
    sku: product.id,
    name: product.nome,
    description: product.descrizione || product.descrizione_breve || `${product.nome} — Hop Storm`,
    ...(images.length > 0 ? { image: images } : {}),
    brand: {
      '@type': 'Brand',
      name: 'Hop Storm',
    },
    category: product.categoria || 'Birra artigianale',
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
    offers: {
      '@type': 'Offer',
      url: `https://www.hopstorm.it/shop/${encodeURIComponent(product.id)}`,
      priceCurrency: 'EUR',
      price: product.prezzo.toFixed(2),
      availability: product.disponibile
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'HOPSTORM S.R.L.',
      },
    },
  };
}

export default function ShopJsonLd({ mode, products = [], product = null }: ShopJsonLdProps) {
  if (mode === 'product' && product) {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hopstorm.it/' },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.hopstorm.it/shop' },
            {
              '@type': 'ListItem',
              position: 3,
              name: product.nome,
              item: `https://www.hopstorm.it/shop/${encodeURIComponent(product.id)}`,
            },
          ],
        },
        buildProductSchema(product),
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(schema) }}
      />
    );
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hopstorm.it/' },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.hopstorm.it/shop' },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.hopstorm.it/shop#page',
        name: 'Shop Online | Hop Storm',
        description:
          'Acquista online le birre artigianali Hop Storm, pack misti, merchandising e idee regalo con spedizione in tutta Italia.',
        url: 'https://www.hopstorm.it/shop',
        inLanguage: 'it-IT',
      },
      ...products.map(buildProductSchema),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(schema) }}
    />
  );
}

import type { Schema, Struct } from '@strapi/strapi';

export interface ContentFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_content_faq_items';
  info: {
    description: 'A question/answer pair rendered as FAQPage JSON-LD';
    displayName: 'FAQ item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 800;
      }>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentKeyPoint extends Struct.ComponentSchema {
  collectionName: 'components_content_key_points';
  info: {
    description: 'A single extractable takeaway';
    displayName: 'Key point';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
  };
}

export interface ContentSource extends Struct.ComponentSchema {
  collectionName: 'components_content_sources';
  info: {
    description: 'A citation that becomes schema.org citation[]';
    displayName: 'Source';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    publisher: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO + GEO metadata for a page or post';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 170;
        minLength: 50;
      }>;
    metaRobots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'index, follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String & Schema.Attribute.DefaultTo<'article'>;
    structuredData: Schema.Attribute.JSON;
    structuredDataType: Schema.Attribute.Enumeration<
      ['BlogPosting', 'Article', 'NewsArticle']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'BlogPosting'>;
    twitterCard: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'content.faq-item': ContentFaqItem;
      'content.key-point': ContentKeyPoint;
      'content.source': ContentSource;
      'shared.seo': SharedSeo;
    }
  }
}

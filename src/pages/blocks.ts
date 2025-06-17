export enum EBlock {
    Text = 'text',
    Image = 'image',
    Cards = 'cards',
    RefItem = 'refItem'
}

export type TextBlock = {
    type: EBlock.Text
    headline: string
    subheadline?: string
    body: string
    cta: CTA[],
    align: 'left' | 'center' | 'right'
}

export enum ECtaVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Outline = 'outline'
}

export interface CTA {
    text: string,
    link: string,
    variant: ECtaVariant
    icon?: string
}

export type ImageBlock = {
    type: EBlock.Image
    url: string
    alt?: string
    caption?: string
    description?: string
    width?: number
    height?: number
}

export type Card = {
    title: string
    subtitle?: string
    description: string
    link?: string
    image?: string
}

export enum ECardsBlockLayout {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
    Masonry = 'masonry',
    Grid = 'grid'
}

export type CardsBlock = {
    type: EBlock.Cards
    cards: Card[],
    layout: ECardsBlockLayout
    maxColumns?: number
}

export type RefItemBlock = {
    type: EBlock.RefItem
    ref: string; // 'blogs' | 'events' | 'publications' etc
    limit: number;
    order?: 'ASC' | 'DESC';
    refIds?: string[] // eg. specific blogIds
}

export type PageBlock = ImageBlock | CardsBlock | TextBlock | RefItemBlock

export type PageSection = {
    headline: string
    subheadline?: string
    blocks: {
        direction: 'horizontal' | 'vertical'
        items: PageBlock[]
    };
}


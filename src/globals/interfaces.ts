export enum ENavLinkType {
    Internal = 'internal',
    External = 'external'
}

export interface NavLink {
    name: string;
    type: ENavLinkType;
    url: string;
    icon?: string;
    subLinks: NavLink[];
}
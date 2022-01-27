export interface IMetadata {
    name: string;
    description?: string;
}

export interface ISelectedModule {
    type: string;
    module: string;
    key: string;
    metadata: any;
}
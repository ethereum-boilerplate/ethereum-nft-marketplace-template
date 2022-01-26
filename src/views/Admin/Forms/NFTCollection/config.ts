export const formConfig = [
    {
        name: 'Collection Name',
        type: 'text',
        inputWidth: '100%',
        value: '',
        validation: {
            required: true,
        },
    },
    {
        name: 'Image URL',
        type: 'text',
        inputWidth: '100%',
        value: '',
        validation: {
            required: true,
        },
    },
    {
        name: 'Symbol',
        type: 'text',
        inputWidth: '100%',
        value: '',
        validation: {
            required: true,
        },
    },
    {
        name: 'Description',
        type: 'text',
        inputWidth: '100%',
        value: '',
    },
    {
        name: 'Royalty',
        type: 'number',
        inputWidth: '100%',
        value: '',
        validation: {
            required: true,
        },
    },
];

export const stages = {
    default: 'Loading...',
    uploading: 'Uploading Metadata...',
    deploying: 'Deploying Contract...',
    addingModule: 'Adding Module...',
    syncing: 'Syncing Module...',
};

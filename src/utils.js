export const createPageUrl = (pageName) => {
    const name = pageName.toLowerCase();
    if (name === 'home' || name === 'lar') {
        return '/';
    }
    return `/${name}`;
};
export const getProcessString = (rating: number) => {
    switch (rating) {
        case 20:
            return 'very_unfair';
        case 40:
            return 'unfair';
        case 60:
            return 'not_sure';
        case 80:
            return 'fair';
        case 100:
            return 'very_fair';
        default:
            return '';
    }
};

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

export const getProcessFromString = (process?: string) => {
    switch (process) {
        case 'very_unfair':
            return '20';
        case 'unfair':
            return '40';
        case 'not_sure':
            return '60';
        case 'fair':
            return '80';
        case 'very_fair':
            return '100';
        default:
            return '20';
    }
};

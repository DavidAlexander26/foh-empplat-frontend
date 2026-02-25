export const fixNumberCurrencyToString = (value: string | null) => {
    if (!value) {
        return null
    }
    const temporalNumber = Number(value.replace(/,/g, ''))
    if (isNaN(temporalNumber)) {
        return null
    }
    return temporalNumber.toString()
}

export const convertToCurrencyFormat = (value: string) => {
    const cleaned = value.replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    const integer = parts[0] || '';
    const decimal = parts[1];

    const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const display = decimal !== undefined
        ? `${formatted}.${decimal.slice(0, 2)}`
        : formatted;

    return display
}
export const maskCurrency = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    const float = (parseInt(cleaned, 10) / 100).toFixed(2)
    return `R$ ${float.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}
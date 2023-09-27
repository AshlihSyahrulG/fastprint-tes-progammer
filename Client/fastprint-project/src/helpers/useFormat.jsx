export function formatDate(inputDateString, type) {
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    if (type === 'date') {
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    } else if (type === 'year') {
      return `${day}/${month}/${year}`
    } else {
      return `${hours}:${minutes}:${seconds}`
    }
  }
  
  function isDecimalNumber(number) {
    return number % 1 !== 0 || number !== Math.floor(number);
  }
  
  export function formatNumber(number) {
    return number.toLocaleString(
      'id-ID',
      isDecimalNumber(number)
        ? {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        : {}
    );
  }
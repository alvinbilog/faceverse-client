export function formatDate(dateString: string) {
  try {
    if (isNaN(Date.parse(dateString))) {
      console.error('Invalid date string:', dateString);
      return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date
    );
    return formattedDate.replace(',', '');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error formatting date';
  }
}

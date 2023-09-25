import axios from 'axios';

export async function fetchExample() {
  console.log('Fetching Example');
  const response = await axios.get(
    'http://localhost:8000/api/v1/example/get-all'
  );
  const example = response.data;
  return example;
}

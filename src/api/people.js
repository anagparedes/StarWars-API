export async function getPeople () {
const response = await fetch("https://swapi.dev/api/people/");
const data = await response.json();
return data;
}
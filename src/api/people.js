export async function getPeople () {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    if(!response.ok){
      throw new NetworkError();
    }
    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }

}

class NetworkError extends Error{
  constructor(){
    super("Network Error");
  }
}
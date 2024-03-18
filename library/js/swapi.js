/* 
level 0 - Show only the name
level 1 - Add demographics including home world
level 2 - Add vehicles and starships
level 3 - Show all fields
*/

const params = new URLSearchParams(window.location.search);
const level = params.get('level');
const queryProps = [
  'name',
  `homeworld {
    name
  }
  birthYear
  eyeColor
  gender
  hairColor
  height
  mass
  skinColor
  species {
    name
  }`,
  `starshipConnection {
    starships {
      name
    }
  }
  vehicleConnection {
    vehicles {
      name
    }
  }`,
  `filmConnection {
    films {
      title
    }
  }`,
].slice(0, Number(level) + 1).join('\n')

const finalQuery = `query Query($personID: ID) {
  person(personID: $personID) {
    ${queryProps}
  }
}`;

const runQuery = () => {
  fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: finalQuery, variables: { personID: '13' } }),
  })
    .then((r) => r.json())
    .then((data) => console.log('data returned:', data.data));
};

runQuery();

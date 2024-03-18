/* 
level 0 - Show only the name
level 1 - Add demographics including home world
level 2 - Add vehicles and starships
level 3 - Show all fields
*/

let levelQuery;
const params = new URLSearchParams(window.location.search);
const level = params.get('level');
let props = {
  0: 'name',
  1: `homeworld {
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
  2: `starshipConnection {
        starships {
          name
        }
      }
      vehicleConnection {
        vehicles {
          name
        }
      }`,
  3: `filmConnection {
        films {
          title
        }
      }`,
};

if (level === '0') {
  levelQuery = props['0'];
}

if (level === '1') {
  levelQuery = `${props['0']}\n${props['1']}`;
}

if (level === '2') {
  levelQuery = `${props['0']}\n${props['1']}\n${props['2']}`;
}

if (level === '3') {
  levelQuery = `${props['0']}\n${props['1']}\n${props['2']}\n${props['3']}`;
}

const finalQuery = `query Query($personID: ID) {
  person(personID: $personID) {
    ${levelQuery}
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

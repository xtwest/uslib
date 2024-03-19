/* 
level 0 - Show only the name
level 1 - Add demographics including home world
level 2 - Add vehicles and starships
level 3 - Show all fields
*/

const swapiURL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
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
];

const buildQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const level = Number(params.get('level') || 0);

  if (level < 0 || level > 3) return;

  return `query Query($personID: ID) {
    person(personID: $personID) {
      ${queryProps.slice(0, level + 1).join('\n')}
    }
  }`;
};

const runQuery = async () => {
  const query = buildQuery();

  if (!query) return;

  const swData = await fetch(swapiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { personID: '13' },
    }),
  }).then((r) => r.json());

  const {
    data: { person },
  } = swData;

  window.auth.person = person;

  return person;
};

const handleAccountBtns = (client) => {
  const createBtn = document.querySelector('[data-account-create]');
  const loginBtn = document.querySelector('[data-account-login]');
  const logoutBtn = document.querySelector('[data-account-logout]');

  if (!client) return;

  if (createBtn) {
    createBtn.addEventListener('click', async () => {
      await client.loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
        },
      });
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      await client.loginWithRedirect();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await client.logout({
        clientId: 'oyxZtV6dvIpQ0ZSVmaJiwazo2s2u1782',
        logoutParams: {
          returnTo: window.auth.redirect,
        },
      });
    });
  }
};

const toggleAuthUI = (isLoggedIn) => {
  if (isLoggedIn) document.documentElement.classList.add('auth');
  else document.documentElement.classList.remove('auth');
};

const init = async () => {
  let user;
  let swData;

  const url = new URLSearchParams(window.location.search);
  const code = url.get('code');
  const client = await window.auth0.createAuth0Client({
    domain: 'dev-xaeh8ly873zk4166.us.auth0.com',
    clientId: 'oyxZtV6dvIpQ0ZSVmaJiwazo2s2u1782',
    authorizationParams: {
      redirect_uri: window.auth.redirect,
      audience: 'https://dev-xaeh8ly873zk4166.us.auth0.com/api/v2/',
    },
  });

  if (code) {
    await client.handleRedirectCallback();
    window.history.replaceState(
      {},
      document.title,
      window.location.origin + window.location.pathname
    );
  }

  const isLoggedIn = await client.isAuthenticated();

  if (isLoggedIn) {
    accessToken = await client.getTokenSilently();
    user = await client.getUser();
    swData = await window.runQuery();
    console.log('SWAPI:', swData);
  }

  if (isLoggedIn && window.runQuery) {
    swData = await window.runQuery();
  }

  console.log('isLoggedIn', isLoggedIn);
  console.log('user', user);
  console.log('swapi:', swData);

  window.Webflow = window.Webflow || [];
  window.Webflow.push(handleAccountBtns(client));
  window.Webflow.push(toggleAuthUI(isLoggedIn));
};

init();

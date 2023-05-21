import Account from '../entities/Account.js';

export default {
  authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
    const account = await accountsRepository.getByEmail(email);
    const result = await authenticator.compare(password, account.password);
    if (!result) {
      throw new Error('Bad credentials');
    }
    const token = tokenManager.generate({ email: account.email });
    return token;
  },
  verifyToken:   async (token,{accountsRepository, tokenManager}) => {
    const decoded = await tokenManager.decode(token);
    const user = await accountsRepository.getByEmail(decoded.email);

    if (!user) {
        throw new Error('Bad token');
    }
    return user.email;
  },
  registerAccount: async  (firstName, lastName, email, password, {accountsRepository, authenticator}) => {
    password = await authenticator.encrypt(password);
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, {accountsRepository}) => {
    return accountsRepository.get(accountId);
  },
  find: ({accountsRepository})=>{
    return accountsRepository.find();
  },
  findByEmail: (email, {accountsRepository})=>{
    return accountsRepository.getByEmail(email);
  },
  updateAccount: (id, firstName, lastName, email, password, {accountsRepository})=>{
    const account = new Account(id, firstName, lastName, email, password);
    return accountsRepository.merge(account);
   },

  getMovieFavourites: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.movieFavourites;
  },

  getShowFavourites: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.showFavourites;
  },

  getPersonFavourites: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.personFavourites;
  },

  getMustWatch: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.mustWatch;
  },

  addMovieFavourite: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if(!account.movieFavourites.includes(movieId)){
      account.movieFavourites.push(movieId);
      return await accountsRepository.merge(account);
    }
    else {
      return new Error(`Duplicate Movie Favourite ${movieId}`);
    }
  },

  addShowFavourite: async (accountId, showId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if(!account.showFavourites.includes(showId)){
      account.showFavourites.push(showId);
      return await accountsRepository.merge(account);
    }
    else {
      return new Error(`Duplicate Show Favourite ${showId}`);
    }
  },

  addPersonFavourite: async (accountId, personId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if(!account.personFavourites.includes(personId)){
      account.personFavourites.push(personId);
      return await accountsRepository.merge(account);
    }
    else {
      return new Error(`Duplicate Person Favourite ${personId}`);
    }
  },

  addMustWatch: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    if(!account.mustWatch.includes(movieId)){
      account.mustWatch.push(movieId);
      return await accountsRepository.merge(account);
    }
    else {
      return new Error(`Duplicate Must Watch ${movieId}`);
    }
  },
};

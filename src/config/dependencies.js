/* eslint-disable no-undef */
import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository.js';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository.js';
import AccountSchema from '../accounts/validators/index.js';
import Authenticator from '../accounts/security/BCryptAuthenticator.js';
import TokenManager from './../accounts/security/JWTToken.js';


const buildDependencies = () => {
    const dependencies = {
      authenticator: new Authenticator()
    };

  dependencies.accountSchema = AccountSchema;
  dependencies.tokenManager = new TokenManager();
  
  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.accountsRepository = new AccountsRepositoryInMemory();
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    dependencies.accountsRepository = new AccountsRepositoryMongo();
  }
   else if (process.env.DATABASE_DIALECT === "mysql") {
    throw new Error('Add MySQL support');
  }
  return dependencies;
};

export default buildDependencies;

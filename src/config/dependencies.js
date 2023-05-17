/* eslint-disable no-undef */
import AccountsRepositoryInMemory from '../accounts/repositories/InMemoryRepository.js';
import AccountsRepositoryMongo from '../accounts/repositories/MongoAccountRepository.js';
import AccountSchema from '../accounts/validators/index.js';

const buildDependencies = () => {
  const dependencies = {
  };

  dependencies.accountSchema = AccountSchema;

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

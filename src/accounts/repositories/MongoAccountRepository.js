import Account from '../entities/Account.js';
import mongoose from 'mongoose';
import AccountRepository from './Repository.js';

export default class extends AccountRepository {

    constructor() {
        super();
        const accountsSchema = new mongoose.Schema({
            email: {type: String, unique: true, index: true},
            firebaseUid: String,
            movieFavourites: [Number],
            showFavourites: [Number],
            personFavourites: [Number],
            mustWatch: [Number],
        });
        this.model = mongoose.model('Account', accountsSchema);
    }

    async persist(accountEntity) {
        const {email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch  } = accountEntity;
        const result = new this.model({email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch});
        await result.save();
        accountEntity.id=result.id;
        return accountEntity;
    }

    async merge(accountEntity) {
        const {id, email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch} = accountEntity;
        await this.model.findByIdAndUpdate(id, { email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch });
        console.log({id, email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch });
        return accountEntity;
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const result = await this.model.findById(userId);
        const {id, email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch } = result;
        return new Account(id, email, firebaseUid, movieFavourites, showFavourites, personFavourites, mustWatch );
    }

    async getByEmail(userEmail) {
        const result = await this.model.findOne({email: userEmail});
        return new Account(result.id, result.email, result.firebaseUid, result.movieFavourites, result.showFavourites, result.personFavourites, result.mustWatch);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((result) => {
            return new Account(result.id, result.email, result.firebaseUid, result.movieFavourites, result.showFavourites, result.personFavourites, result.mustWatch);
        });
    }
}

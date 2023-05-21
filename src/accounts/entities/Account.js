export default class {
    constructor(id = undefined, email, firebaseUid, movieFavourites = [], showFavourites = [], personFavourites = [], mustWatch = []) {
      this.id = id;
      this.email = email;
      this.firebaseUid = firebaseUid;
      this.movieFavourites = movieFavourites;
      this.showFavourites = showFavourites;
      this.personFavourites = personFavourites;
      this.mustWatch = mustWatch;
    }
  }

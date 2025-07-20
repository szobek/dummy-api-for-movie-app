export class Actor {
    fullName;
    bio;
    sex;
    date_of_birth;
    constructor(name, bio, sex, birthday) { 
        this.fullName = name;
        this.bio = bio;
        this.sex = sex;
        this.date_of_birth = birthday;
    }
}
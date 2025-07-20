export class ListActorsDto {
    id;
    fullName;
    bio;
    sex;
    date_of_birth;

    constructor(id, fullName, bio, sex, date_of_birth) {
        this.id = id
        this.fullName = fullName
        this.bio = bio
        this.sex = sex
        this.date_of_birth = date_of_birth
    }

    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName||"n/a",
            bio: this.bio,
            sex: this.sex,
            date_of_birth: this.date_of_birth
        }
    }
}